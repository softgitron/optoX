package syncengine

import (
	"fmt"
	"io/ioutil"
	"net"
	"os"
	"time"

	"github.com/cenkalti/rpc2"
)

const maximumTries = 5
const reconnectTime = 5 * time.Second

// StartSyncClient starts service that works on
// slave nodes
func (se *Syncengine) StartSyncClient() {
	host := fmt.Sprintf("syncbackend-central.%s.svc.cluster.local", os.Getenv("REGION"))

	var err error
	var connection net.Conn
	for try := 1; try <= maximumTries; try++ {
		err = nil
		connection, err = net.Dial(syncEngineProtocol, host+":"+syncEnginePort)
		if err == nil {
			break
		} else {
			println(err)
			fmt.Printf("Trying again, try: %d/%d", try, maximumTries)
			time.Sleep(reconnectTime)
		}
	}
	if err != nil {
		println("Couldn't establish connection")
		panic(err)
	}

	se.RPCClient = rpc2.NewClient(connection)
	se.RPCClient.Handle("receiveNewFile", se.receiveNewFile)
	go se.RPCClient.Run()
	go se.checkDisconnect()
	se.doInitialSynchronization()
}

func (se *Syncengine) checkDisconnect() {
	for {
		var args GetHealtzArgs
		var reply GetHealtzReply
		err := se.RPCClient.Call("getHealtz", &args, &reply)
		if err != nil || reply != true {
			// Reconnect
			se.RPCClient.Close()
			go se.StartSyncClient()
			break
		}
		time.Sleep(reconnectTime)
	}
}

func (se *Syncengine) doInitialSynchronization() {
	var args GetFileNamesArgs
	var reply GetFileNamesReply
	err := se.RPCClient.Call("getFileNames", &args, &reply)
	if err != nil {
		println("Can't syncronize files")
		panic(err)
	}

	for _, path := range reply {
		value, _ := se.Files.Load(path)
		if value == true {
			continue
		}
		se.syncFile(path)
		se.Files.Store(path, true)
	}
}

// ReceiveNewFileArgs for new file receiving on client
type ReceiveNewFileArgs struct {
	FilePath string
	Data     []byte
}

// ReceiveNewFileReply dummy reply for new file function
type ReceiveNewFileReply interface{}

func (se *Syncengine) receiveNewFile(client *rpc2.Client, args *ReceiveNewFileArgs, reply *ReceiveNewFileReply) error {
	err := ioutil.WriteFile(args.FilePath, args.Data, 0644)
	if err != nil {
		println("Can't write files during sync")
		panic(err)
	}
	se.Files.Store(args.FilePath, true)
	return nil
}

func (se *Syncengine) syncFile(path string) {
	var args GetFileArgs
	var reply GetFileReply
	args.FilePath = path
	for try := 1; try <= maximumTries; try++ {
		se.RPCClient.Call("getFile", &args, &reply)
		if reply.Error == nil {
			break
		}
	}

	if reply.Error != nil {
		println("Can't syncronize files")
		panic(reply.Error)
	}

	err := ioutil.WriteFile(path, reply.Data, 0644)
	if err != nil {
		println("Can't write files while syncing")
		panic(err)
	}
}

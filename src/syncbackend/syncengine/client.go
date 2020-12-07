package syncengine

import (
	"fmt"
	"io/ioutil"
	"net"
	"time"

	"github.com/cenkalti/rpc2"
)

const maximumTries = 10
const reconnectTime = 10 * time.Second

// StartSyncClient starts service that works on
// slave nodes
func (se *Syncengine) StartSyncClient() {
	host := "syncbackend-central"

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

	se.RPCClient = rpc2.NewClient(connection)
	go se.RPCClient.Run()
	se.doInitialSynchronization()
}

func (se *Syncengine) doInitialSynchronization() {
	var args getFileNamesArgs
	var reply getFileNamesReply
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

func (se *Syncengine) syncFile(path string) {
	var args getFileArgs
	var reply getFileReply
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

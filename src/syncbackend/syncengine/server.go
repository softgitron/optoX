package syncengine

import (
	"io/ioutil"
	"net"

	"github.com/cenkalti/rpc2"
)

var syncEngineHost = "0.0.0.0"
var syncEnginePort = "5000"
var syncEngineProtocol = "tcp"

// StartSyncServer starts service that works on
// central nodes and handles file requests
func (se *Syncengine) StartSyncServer() {
	server := rpc2.NewServer()
	server.Handle("getFileNames", se.getFileNames)
	server.Handle("getFile", se.getFile)
	server.Handle("getHealtz", se.getHealtz)

	listener, err := net.Listen(syncEngineProtocol, syncEngineHost+":"+syncEnginePort)
	if err != nil {
		println("Couldn't start sync backend sync service")
		panic(err)
	}

	server.OnConnect(se.onConnect)
	server.OnDisconnect(se.onDisconnect)
	server.Accept(listener)
}

func (se *Syncengine) onConnect(client *rpc2.Client) {
	se.RPCServerClientLock.Lock()
	defer se.RPCServerClientLock.Unlock()
	se.RPCServerClients = append(se.RPCServerClients, client)
}

func (se *Syncengine) onDisconnect(client *rpc2.Client) {
	se.RPCServerClientLock.Lock()
	defer se.RPCServerClientLock.Unlock()
	for index, clientInstance := range se.RPCServerClients {
		if clientInstance == client {
			se.RPCServerClients = append(se.RPCServerClients[:index], se.RPCServerClients[index+1:]...)
			break
		}
	}
}

// GetHealtzArgs ...
type GetHealtzArgs interface{}

// GetHealtzReply ...
type GetHealtzReply bool

func (se *Syncengine) getHealtz(client *rpc2.Client, args *GetHealtzArgs, reply *GetHealtzReply) error {
	*reply = true
	return nil
}

// GetFileNamesArgs ...
type GetFileNamesArgs interface{}

// GetFileNamesReply ...
type GetFileNamesReply []string

func (se *Syncengine) getFileNames(client *rpc2.Client, args interface{}, reply *[]string) error {
	var fileIDs []string
	se.Files.Range(func(key interface{}, value interface{}) bool {
		fileIDs = append(fileIDs, key.(string))
		return true
	})

	*reply = fileIDs
	return nil
}

// GetFileArgs ...
type GetFileArgs struct {
	FilePath string
}

// GetFileReply ...
type GetFileReply struct {
	Data  []byte
	Error error
}

func (se *Syncengine) getFile(client *rpc2.Client, args *GetFileArgs, reply *GetFileReply) error {
	data, err := ioutil.ReadFile(args.FilePath)
	reply.Data = data
	reply.Error = err
	return nil
}

func (se *Syncengine) sendFileToAllClients(filePath string, fileData []byte) error {
	args := ReceiveNewFileArgs{
		FilePath: filePath,
		Data:     fileData,
	}
	var reply ReceiveNewFileReply
	se.RPCServerClientLock.Lock()
	defer se.RPCServerClientLock.Unlock()
	for _, client := range se.RPCServerClients {
		err := client.Call("receiveNewFile", &args, &reply)
		if err != nil {
			println(err)
		}
	}
	return nil
}

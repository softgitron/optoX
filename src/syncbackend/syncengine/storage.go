package syncengine

import (
	"io"
	"io/ioutil"
	"math/rand"
	"mime/multipart"
	"os"
	"path/filepath"
	"strconv"
	"sync"

	"github.com/cenkalti/rpc2"
)

// Syncengine is used for syncronizing files between disk and other nodes
type Syncengine struct {
	Files               sync.Map
	RPCServerClientLock sync.Mutex
	RPCServerClients    []*rpc2.Client
	RPCClient           *rpc2.Client
}

const rootDirectory = "/images/"

// Initialize loads existing file ids to a map
func (se *Syncengine) Initialize() {
	err := se.getFiles(rootDirectory)
	if err != nil {
		println("Couldn't receive file information from the disk.")
		panic(err)
	}
}

func (se *Syncengine) getFiles(root string) error {
	err := filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
		if !info.IsDir() {
			se.Files.Store(path, true)
		}
		return nil
	})
	return err
}

// Store new file with random id
func (se *Syncengine) Store(newFile multipart.File) (string, error) {
	var randomFileID string
	// Generate new file id
	for {
		randomFileID = strconv.Itoa(int(rand.Int31()))
		value, _ := se.Files.Load(rootDirectory + randomFileID)
		if value != true {
			break
		}
	}
	filename := rootDirectory + randomFileID

	file, err := os.OpenFile(filename, os.O_WRONLY|os.O_CREATE, 0666)
	defer file.Close()
	if err != nil {
		return randomFileID, err
	}
	_, err = io.Copy(file, newFile)
	if err == nil {
		se.Files.Store(filename, true)
	}
	return randomFileID, err
}

// Load file with fileID
func (se *Syncengine) Load(fileID string) ([]byte, error) {
	data, err := ioutil.ReadFile(rootDirectory + fileID)
	return data, err
}

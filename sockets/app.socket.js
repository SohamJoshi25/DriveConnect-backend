const SocketController = require('../controllers/controller.socket')

const connectIO = (io) => {

    io.on('connection', (socket) => {  

        SocketController.socketOnConnect(socket) ;
    
        socket.on('file_chunk', SocketController.socketOnFileChunk);
        
        socket.on('disconnect', SocketController.socketOnDisconnect);
        
        socket.on('downloadFiles', SocketController.socketOnDownloadFiles);

    });
    
}

module.exports = connectIO
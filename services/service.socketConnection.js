const {Server} = require('socket.io');

const socketConnection = (server) => {

    const io = new Server(server, {
        maxHttpBufferSize: 1e8, pingTimeout: 60000,
          cors: {
              origin: '*',
              methods: ["GET", "POST"]
          }
    });

    return io;
    
}

module.exports = socketConnection

  
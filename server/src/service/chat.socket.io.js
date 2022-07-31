const socket = require('socket.io')
module.exports = {
    connect: (io)=>{
        io.on('connect', (socket) => {
            console.log('a user connected');
            socket.on('disconnection',()=>console.log('user disconnect'))
          });
    }
}
const socket = require('socket.io')
const jwt = require('./jwtHandler')
module.exports = {
    handler: (io)=>{
        io.on('connection',  (socket) => {
            console.log('user connect');
            socket.on('disconnect',()=>{console.log('user disconect')})
            socket.on('chat message', async(msg) => {
                let token = msg.token
                let user = await jwt.verifyToken(token,process.env.refreshTokenSecret)
                io.emit('chat message', `user ${user.usedID}: ${msg.value}`);
            });
            socket.on('disconnetion', () => console.log('user disconnect'))
        });
    }
}
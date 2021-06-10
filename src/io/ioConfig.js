const socket = require('socket.io')
module.exports = server =>{

    const io = socket(server, {
        allowEIO3: true
    })

 io.on('connection', socket =>{
   console.log("SocketIO - Connection estableshed")
   socket.on('join-room', roomID =>{
       socket.join(roomID)
       socket.to(roomID).emit('user-connected')
     console.log('Joined to the Room ' + roomID)
   })
 })
}   
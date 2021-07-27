const socket = require('socket.io')
module.exports = server =>{

    const io = socket(server, {
        allowEIO3: true
    })

//  io.on('connection', socket =>{
//    console.log("SocketIO - Connection estableshed")
//    socket.on('join-room', (roomID, userId) =>{
//        socket.join(roomID)
//        socket.to(roomID).emit('user-connected', userId)
//        socket.on('disconnect', (roomID, userId) =>{
//        socket.to(roomID).emit('user-disconnected', userId)
//        })
//     //  console.log('Joined to the Room ' + roomID + "with the userId: " + userId)
//    })
   
//  })
// }   

io.on('connection', socket => {
  console.log("SocketIO - Connection estableshed")
  socket.on('join-room', (roomID, userId) => {
    socket.join(roomID)
    socket.to(roomID).emit('user-connected', userId)

    socket.on('disconnect', () => {
      socket.to(roomID).emit('user-disconnected', userId)
    })
  })
})
}
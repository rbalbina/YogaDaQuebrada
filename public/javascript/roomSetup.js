const socket = io()
const videoGrid = document.getElementById('video-grid')
const myVideo = document.createElement('video')
myVideo.muted = true

const myVideoStream = async (myVideo) =>{

    const streamSetup = await navigator.mediaDevices.getUserMedia({
        video: true,
        Audio: true
    })

    addVideoStream(myVideo, streamSetup)
}
   

const addVideoStream = (video, stream) =>{
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () =>{
        video.play()
    })

    videoGrid.append(video)
}

myVideoStream(myVideo)


/**
 * Client IO Config.
 */

 const connectedNewUser = () =>{
    console.log("New user connected")
}

socket.emit('join-room', roomID)
socket.on('user-connected', () =>{
    connectedNewUser()
})

/**
 * PeerJS Config.
 */
var peer = new Peer(undefined, {
    path:'/peerjs',
    host:'/',
    port: '3015'
})

// peer.on('open', () =>{
//     console.log("Peer id: " + peer.id)
// })

var conn = peer.connect('another-peers-id');
// on open will be launch when you successfully connect to PeerServer
conn.on('open', function(){
  // here you have conn.id
  conn.send(conn.id);
});


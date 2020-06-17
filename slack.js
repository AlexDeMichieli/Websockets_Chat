//SERVER

const express = require('express')
const app = express()
const socketio = require('socket.io')
let namespaces = require('./data/namespaces')

// const expressServer = app.listen(9000)
const PORT = process.env.PORT || 9000
const expressServer = app.listen(PORT, '0.0.0.0', "https://sla-ck-replica.herokuapp.com/chat.html", () => {
    console.log('Server is running s on port: ' + PORT)
});

const io = socketio(expressServer)
app.use(express.static(__dirname + '/public'));


//connection main Namespace
io.on('connect', (socket, req)=>{

    //build an array to send back img and endpoint for each Namespace
    let nsData = namespaces.map(ns=>{
        return {
            img: ns.img,
            endpoint: ns.endpoint
        }
    })
    //If we used IO, then when someone connected everyone on the server would get an updated list
    socket.emit('nsList', nsData )
})

//loop through each namespace and user server to listen for a connection
namespaces.forEach(namespace => {
    // console.log(namespace.endpoint)
    io.of(namespace.endpoint).on('connect', (nsSocket)=>{
        
        console.log(`${nsSocket.id} has join ${namespace.endpoint}` )
        //a socket has connected to one of our namespaces, we need to send that to the group
        nsSocket.emit('nsRoomload', namespace.rooms)
        nsSocket.on('joinRoom', (roomToJoin, numberOfUsersCallback)=>{

            //this makes sure that you leave the room before joining another, otherwise messages written would appear in all rooms.
            const roomToLeave = Object.keys(nsSocket.rooms)[1]
            nsSocket.leave(roomToLeave)
            updateUsersinRoom(namespace, roomToLeave)
            nsSocket.join(roomToJoin)

            //pushing history to the client so it can be printed in the chat when someone joins.
            const nsRoom = namespace.rooms.find((room=>{
                return room.roomTitle === roomToJoin
            }));
            nsSocket.emit('history_catch_up', nsRoom.history)
            updateUsersinRoom(namespace, roomToJoin)
        })

        //receiving from client
        nsSocket.on('newMessage_to_server_from_client', (message)=>{

            const fullMsg = {

                text: message,
                time: Date.now(),
                username: message,
                avatar: message.avatar
            }
           
            //use socket.rooms to find in which rooms the socket is connected to
            const roomTitle = Object.keys(nsSocket.rooms)[1]
            //we need to push the chat history to new connections joining the room. 
            //getting the room object for the room.
            const nsRoom = namespace.rooms.find((room=>{
                return (room.roomTitle === roomTitle)
            }));
            //pushing history with object method
            nsRoom.addMessage(fullMsg)
            //if we did NsSocket it will show up to all other clients
            io.of(namespace.endpoint).to(roomTitle).emit('message_to_clients_in_room', fullMsg)

        })
    })
})

function updateUsersinRoom(namespace, roomToJoin ){

     //udating the number of users in all rooms and pushing it to client
     io.of(namespace.endpoint).in(roomToJoin).clients((error, clients)=>{
        io.of(namespace.endpoint).in(roomToJoin).emit('update_members', clients.length)
    })
}
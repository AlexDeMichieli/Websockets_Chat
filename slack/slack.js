//SERVER

const express = require('express')
const app = express()
const socketio = require('socket.io')
let namespaces = require('./data/namespaces')

const expressServer = app.listen(9000)
const io = socketio(expressServer)
app.use(express.static(__dirname + '/public'));



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
        nsSocket.emit('nsRoomload', namespaces[0].rooms)
        nsSocket.on('joinRoom', (roomToJoin, numberOfUsersCallback)=>{
            //roomToJoin == New Articles
            nsSocket.join(roomToJoin)
            //namespace.clients(callback)
            // io.of('/wiki').in(roomToJoin).clients((error,clients)=>{
            //     //callback back to joinRoom
            //     numberOfUsersCallback(clients.length)
            // })
            //pushing history to the client so it can be printed in the chat when someone joins.
            const nsRoom = namespaces[0].rooms.find((room=>{
                return room.roomTitle === roomToJoin
            }));
            nsSocket.emit('history_catch_up', nsRoom.history)
            //udating the number of users in all rooms
            io.of('/wiki').in(roomToJoin).clients((error, clients)=>{
                io.of('/wiki').in(roomToJoin).emit('update_members', clients.length)
            })

        })
        nsSocket.on('newMessage_to_server_from_client', (message)=>{

            const fullMsg = {

                text: message,
                time: Date.now(),
                username: 'superHero',
                avatar: 'https://via.placeholder.com/30'
            }
           
            //use socket.rooms to find in which rooms the socket is connected to
            const roomTitle = Object.keys(nsSocket.rooms)[1]
            //we need to push the chat history to new connections joining the room. 
            //getting the room object for the room.
            const nsRoom = namespaces[0].rooms.find((room=>{
                return (room.roomTitle === roomTitle)
            }));
            //pushing history with object method
            nsRoom.addMessage(fullMsg)
            //if we did NsSocket it will show up to all other clients
            io.of('/wiki').to(roomTitle).emit('message_to_clients_in_room', fullMsg)

        })
    })
})


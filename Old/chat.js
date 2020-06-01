//SERVER

const express = require('express')
const app = express()
const socketio = require('socket.io')

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9000)
const io = socketio(expressServer)

io.on('connect', (socket, req)=>{

    //Test message coming from client
    socket.emit('msg_from_server_to_client', 'welcome to websocket')

    //Test message to client
    socket.on('message_to_server_from_client',(message)=>{
        console.log(message, socket.id)
    })

    socket.on('newMessage_to_server_from_client',(message)=>{
        // console.log(message)
        //io sends to all clients. If we did 'socket.emit' it would not send it to everyone
        io.emit('messageToClients', {text: message.data})
        //same as above, but for one namespace
        // io.of('/').emit('messageToClients', {text: message.data})
    })
})

//'Of' required when using other namespaces
io.of('/custops').on('connect', (socket)=>{
    console.log('connected to Squarespace custops')
    io.of('/custops').emit('welcome_to_custops', "Welcome to custops channer")
})


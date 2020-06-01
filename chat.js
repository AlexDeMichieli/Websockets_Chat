//SERVER

const express = require('express')
const app = express()
const socketio = require('socket.io')

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9000)
const io = socketio(expressServer)

io.on('connect', (socket, req)=>{

    //Test message coming from client
    socket.emit('msg_from_server_to_client', 'welcome to the main namespace')

    //Test message to client
    socket.on('message_to_server_from_client',(message)=>{
        console.log(message, socket.id)
    })
})

//'Of' required when using other namespaces
io.of('/custops').on('connect', (socket)=>{
    console.log('connected to Squarespace custops')
    io.of('/custops').emit('welcome_to_custops', "Welcome to custops channel")
})


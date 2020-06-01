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
    //Non using io because we want to send it to just this client ('/'), not the entire server
    socket.emit('nsList', nsData )
})


//loop through each namespace and user server to listen for a connection

namespaces.map(namespace => {
    io.of(namespace.endpoint).on('connect', (socket)=>{
        console.log(`${namespace.endpoint}`, socket.id)
    })
})


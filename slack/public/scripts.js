//Client Side

const username = prompt("What is your username?")
const socket = io('http://localhost:9000'); 
let nsSocket = ''

//populating DOM with Room Namespaces icons. nsList is sent from Server.
socket.on('nsList', (nsData)=>{

    let namespacesList = document.querySelector('.namespaces')
    namespacesList.innerHTML = ''
    for (let items of nsData){
        namespacesList.innerHTML += `<ul class = 'namespace' ns=${items.endpoint}><img src=${items.img}></img></ul>`
    }
    //adding click listeners
    document.querySelectorAll('.namespace').forEach(elm =>{
        const nameSpace = elm.getAttribute('ns')
            elm.addEventListener('click', (e)=>{
                console.log(e.target)
        })
    })

    //Calling an imported function that populates DOM with room list
    joinNs('/wiki')

    const form = document.querySelector('.message-form')
    //Function when pressing the Submit button
    form.addEventListener('submit', (event)=>{
        event.preventDefault();

        //Grabbing the message and sending it to the server
        const chatMessage = document.querySelector('#user-message')
        socket.emit('newMessage_to_server_from_client', {data: chatMessage.value});
        chatMessage.value = '';
    });

    // socket.on('message_fromClient_to_Server', (msg)=>{
    //     console.log(msg)
    //     document.querySelector('#messages').innerHTML += `<li>${msg.text}</li>`
    // })

})


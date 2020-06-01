const username = prompt("What is your username?")
const socket = io('http://localhost:9000'); 
const socket2 = io('http://localhost:9000/wiki') //Namespace
const socket3 = io('http://localhost:9000/mozilla') //Namespace
const socket4 = io('http://localhost:9000/linux') //Namespace


//JS for Client
const squarespace = io('http://localhost:9000/custops') //Namespace

//Test message from server
socket.on('msg_from_server_to_client', (message)=>{
    console.log(message);
    //In the same function, sending a test message to server
    socket.emit('message_to_server_from_client', {data: 'message to server'});
});

//Function when pressing the Submit button
document.querySelector('#message-form').addEventListener('submit', (event)=>{
event.preventDefault();

//Grabbing the message and sending it to the server
const chatMessage = document.querySelector('#user-message').value
socket.emit('newMessage_to_server_from_client', {data: chatMessage});

});

//Receiving back the message from the server
socket.on('messageToClients', (data)=>{
const message = data.text
document.querySelector("#messages").innerHTML += `<li>${message}</li>`
})

///////////////////////////////
///////Second Namespace/////////
///////////////////////////////

squarespace.on('connect', ()=>{
    console.log("Squarespace", squarespace.id);    
});

squarespace.on('welcome_to_custops', (message)=>{
    console.log(message);    
});



// const socket = io('http://localhost:9000',{
//     query: {
//         username
//     }
// });

// let nsSocket = "";
// // listen for nsList, which is a list of all the namespaces.
// socket.on('nsList',(nsData)=>{
//     console.log("The list of .rooms has arrived!!")
//     // console.log(nsData)
//     let namespacesDiv = document.querySelector('.namespaces');
//     namespacesDiv.innerHTML = "";
//     nsData.forEach((ns)=>{
//         namespacesDiv.innerHTML += `<div class="namespace" ns=${ns.endpoint} ><img src="${ns.img}" /></div>`
//     })

//     // Add a clicklistener for each NS
//     console.log(document.getElementsByClassName('namespace'))
//     Array.from(document.getElementsByClassName('namespace')).forEach((elem)=>{
//         // console.log(elem)
//         elem.addEventListener('click',(e)=>{
//             const nsEndpoint = elem.getAttribute('ns');
//             // console.log(`${nsEndpoint} I should go to now`)
//             joinNs(nsEndpoint)
//         })
//     })
//     joinNs('/wiki');
// })



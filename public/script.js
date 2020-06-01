//JS for Client

const socket = io('http://localhost:9000'); //Namespace
const squarespace = io('http://localhost:9000/custops') //Namespace

//Test message from server
socket.on('msg_from_server_to_client', (message)=>{
    console.log(message);
    //In the same function, sending a test message to server
    socket.emit('message_to_server_from_client', {data: 'message to server'});
});

squarespace.on('welcome_to_custops', (data)=>{
    console.log(data)
})

//Function when pressing the Submit button
document.querySelector('#message-form').addEventListener('submit', (event)=>{
event.preventDefault();

//Grabbing the message and sending it to the server
const chatMessage = document.querySelector('#user-message').value
socket.emit('newMessage_to_server_from_client', {data: chatMessage});

});


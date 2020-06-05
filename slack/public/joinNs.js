//extension of scripts.js
//client side

function joinNs(endpoint){

 //check if this is a socket
 if(nsSocket){
    //clean up after client leaves a room
    nsSocket.close();
    //remove the event listener before gets added again. Can create duplicates in chat when changing Namespaces
    document.querySelector('#user-input').removeEventListener('submit', formSubmission)
    }
    nsSocket = io(`http://localhost:9000${endpoint}`)
    nsSocket.on('nsRoomload', (nsRooms)=> {
    // console.log(nsRooms)
    let roomList = document.querySelector('.room-list')
    roomList.innerHTML = "";
    for (let rooms in nsRooms){
        let glyph = ''
        if(rooms.privateRoom){
            glyph = 'lock'
        }else{
            glyph = 'globe'
        }
        roomList.innerHTML += `<li class = "room" ><span class="glyphicon glyphicon-${glyph}"></span>${nsRooms[rooms].roomTitle}</li>`
    }

    let roomNodes = document.querySelectorAll('.room')
        roomNodes.forEach(item => {
            item.addEventListener('click', (event)=>{
                joinRoom(event.target.innerText)
            })
        })
        //add room automatically. First time at login
        const topRoom = document.querySelector('.room').innerText
        joinRoom(topRoom)
    })

   //Calling the form submission function below
   document.querySelector('.message-form').addEventListener('submit', formSubmission)

    nsSocket.on('message_to_clients_in_room', (message)=>{
        document.querySelector("#messages").innerHTML +=  buildHTML(message)
    })  
}

//function to clean up submission
function formSubmission(event){
    event.preventDefault();
    //Grabbing the message and sending it to the server
    const chatMessage = document.querySelector('#user-message').value
        nsSocket.emit('newMessage_to_server_from_client', {data: chatMessage, user: username});
        chatMessage.value = '';

}
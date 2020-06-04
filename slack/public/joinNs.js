//extension of scripts.js
//client side

function joinNs(endpoint){

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
                    console.log(event.target.innerText)
                })
            })
        //add room automatically. First time at login
        const topRoom = document.querySelector('.room').innerText
        joinRoom(topRoom)
    })

    //Function when pressing the Submit button
    document.querySelector('.message-form').addEventListener('submit', (event)=>{
        event.preventDefault();
    //Grabbing the message and sending it to the server
    const chatMessage = document.querySelector('#user-message').value
        console.log(chatMessage)
        nsSocket.emit('newMessage_to_server_from_client', {data: chatMessage});
    });

    nsSocket.on('message_to_clients_in_room', (message)=>{
        document.querySelector("#messages").innerHTML +=  buildHTML(message)
    })  
    
    function buildHTML(message){
        const convertedDate = new Date(message.time).toLocaleString()
        return  `
        <li>
            <div class="user-image">
                <img src=${message.avatar} />
            </div>
            <div class="user-message">
                <div class="user-name-time">${message.username}<span>${convertedDate}</span></div>
                <div class="message-text">${message.text.data}</div>
            </div>
        </li>
        `
    }
}
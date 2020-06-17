//extension of joinNS
//client side

function joinRoom(roomName){

    //send room name to server.
    nsSocket.emit('joinRoom', roomName, (newNumberOfMembers)=>{
        //updates the total number of rooms after joining
        document.querySelector('.curr-room-num-users').innerHTML = `${newNumberOfMembers}  <span class="glyphicon glyphicon-user"></span>`
    })
    nsSocket.on('history_catch_up', (history)=>{
        const messagesChat = document.querySelector('#messages');
            messagesChat.innerHTML = ''
            history.forEach((message) => {
                console.log(message.text)
                
                messagesChat.innerHTML += buildHTML(message)
            })
            messagesChat.scrollTo(0,messagesChat.scrollHeight)
      })
    nsSocket.on('update_members', (numMembers)=>{
        document.querySelector('.curr-room-num-users').innerHTML = `${numMembers}  <span class="glyphicon glyphicon-user"></span>`
        document.querySelector('.curr-room-text').innerText = `${roomName}`

    })
}


function buildHTML(message){

    const convertedDate = new Date(message.time).toLocaleString()
    return  `
    <li>
        <div class="user-image">
            <img src=${message.avatar} />
        </div>
        <div class="user-message">
            <div class="user-name-time">${message.text.user}<span class ='time'>${convertedDate}</span></div>
            <div class="message-text">${message.text.data}</div>
        </div>
    </li>
    `
}   
//extension of joinNS
//client side

function joinRoom(roomName){

    //send room name to server.
    nsSocket.emit('joinRoom', roomName, (newNumberOfMembers)=>{
        //updates the total number of rooms after joining
        document.querySelector('.curr-room-num-users').innerHTML = `${newNumberOfMembers}  <span class="glyphicon glyphicon-user"></span>`
    })
}
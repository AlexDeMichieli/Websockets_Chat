function joinNs(endpoint){

    const nsSocket = io(`http://localhost:9000${endpoint}`)
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
        console.log(topRoom)

    })
}
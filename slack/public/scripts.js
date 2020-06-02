//Client Side

const username = prompt("What is your username?")
const socket = io('http://localhost:9000'); 

//populating DOM with Room logos
socket.on('nsList', (nsData)=>{

    let namespacesList = document.querySelector('.namespaces')
    
    for (let items of nsData){

        namespacesList.innerHTML += `<ul class = 'namespace' ns=${items.endpoint}><img src=${items.img}></img></ul>`
    }

    document.querySelectorAll('.namespace').forEach(elm =>{
        const nameSpace = elm.getAttribute('ns')
            elm.addEventListener('click', (e)=>{
        })
    })

    //populating DOM with room list
    const nsSocket = io('http://localhost:9000/wiki')
    nsSocket.on('nsRoomload', (nsRooms)=> {
        // console.log(nsRooms)
        let roomList = document.querySelector('.room-list')

        for (let rooms in roomList){
            roomList.innerHTML += `<li onclick="joinRoom(1,2)"><span class="glyphicon glyphicon-lock"></span>Main Room</li>`
        }

    })

})


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



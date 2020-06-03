//Client Side

const username = prompt("What is your username?")
const socket = io('http://localhost:9000'); 

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


    //Function when pressing the Submit button
    document.querySelector('.message-form').addEventListener('submit', (event)=>{
        event.preventDefault();

        //Grabbing the message and sending it to the server
        const chatMessage = document.querySelector('#user-message').value
        socket.emit('newMessage_to_server_from_client', {data: chatMessage});
    });

    // socket.on('message_fromClient_to_Server', (msg)=>{
    //     console.log(msg)
    //     document.querySelector('#messages').innerHTML += `<li>${msg.text}</li>`
    // })

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



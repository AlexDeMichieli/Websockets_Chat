const username = prompt("What is your username?")
const socket = io('http://localhost:9000'); 
// const socket2 = io('http://localhost:9000/wiki') //Namespace
// const socket3 = io('http://localhost:9000/mozilla') //Namespace
// const socket4 = io('http://localhost:9000/linux') //Namespace


//Test message from server
socket.on('msg_from_server_to_client', (message)=>{
    console.log(message);
    //In the same function, sending a test message to server
    socket.emit('message_to_server_from_client', {data: 'message to server'});
});

socket.on('nsList', (nsData)=>{
    console.log('list of Namespaces', nsData)

    let namespacesList = document.querySelector('.namespaces')
    
    for (let items of nsData){
        console.log(items.img)
        namespacesList.innerHTML += `<div class = 'namespace'><img src=${items.img}/></div>`
    }

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



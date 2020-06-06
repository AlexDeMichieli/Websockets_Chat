//Client Side

const username = prompt("What is your username?")
let avatar = `https://api.adorable.io/avatars/40/${username}`
const socket = io('http://localhost:9000'); 
let nsSocket = ''

//populating DOM with Room Namespaces icons. nsList is sent from Server.
socket.on('nsList', (nsData)=>{

    let namespacesList = document.querySelector('.namespaces')
    namespacesList.innerHTML = ''
    for (let items of nsData){
        namespacesList.innerHTML += `<ul class = 'namespace' ns=${items.endpoint}><img src=${items.img}></img></ul>`
    }
    //adding click listeners
    document.querySelectorAll('.namespace').forEach(elm =>{
            elm.addEventListener('click', (e)=>{
                const nsEndpoint = elm.getAttribute('ns')
                joinNs(nsEndpoint)
        })
    })

    //Calling an imported function that populates DOM with room list
    joinNs('/funRoom')

    const form = document.querySelector('.message-form')
    
    //Function to clean up message bar
    form.addEventListener('submit', (event)=>{
        event.preventDefault();
        const chatMessage = document.querySelector('#user-message')
        chatMessage.value = '';
    });
})
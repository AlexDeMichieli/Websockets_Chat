// Bring in the room class
const Namespace =  require('../classes/Namespace');
const Room =  require('../classes/Room');

// Set up the namespaces using the imported objects
let namespaces = [];
let funRoom = new Namespace(0,'funRoom','https://toppng.com/public/uploads/preview/cat-funny-icon-07-fun-cat-icon-11553408427ydneysteu4.png','/funRoom');
let myshows = new Namespace(1,'shows','https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSaQtTxs1lzOu9xyC-oIA5dZ1CclTJ_aBnYL6xj6cUA96ZpIDYm&usqp=CAU','/shows');
let mygames = new Namespace(2,'games','https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR-YFYTc5TeQ8D_TEYoKhBSTyWUlf_6TgDHM8clrLHnoOSw0CCR&usqp=CAU','/games');

// Make the main room and add it to rooms. 
funRoom.addRoom(new Room(0,'Cool Trends','funRoom'));
funRoom.addRoom(new Room(1,'80s Vibes', 'funRoom'));
funRoom.addRoom(new Room(2,'Other','funRoom'));

myshows.addRoom(new Room(0,'Theater','shows'));
myshows.addRoom(new Room(1,'Concerts','shows'));
myshows.addRoom(new Room(2,'Cool Shows','shows'));
myshows.addRoom(new Room(3,'Exhibitions','shows'));

mygames.addRoom(new Room(0,'PlayStation','games'));
mygames.addRoom(new Room(1,'XBox','games'));
mygames.addRoom(new Room(2,'Nintendo','games'));
mygames.addRoom(new Room(3,'PC','games'));

namespaces.push(funRoom,myshows,mygames);


module.exports = namespaces;
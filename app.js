// /**
//  * @author Joyce Hong
//  * @email soja0524@gmail.com
//  * @create date 2019-09-02 20:51:10
//  * @modify date 2019-09-02 20:51:10
//  * @desc socket.io server !
//  */

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const databaseName = 'matchiniRahmaKhitem';
const socketio = require('socket.io')

const app = express()
mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose
.connect("mongodb://mongo:8edAyVsYPuFcDWoMZtwj@containers-us-west-186.railway.app:7075")  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });
// parse application/x-www-form-urlencoded
// { extended: true } : support nested object
// Returns middleware that ONLY parses url-encoded bodies and 
// This object will contain key-value pairs, where the value can be a 
// string or array(when extended is false), or any type (when extended is true)
//app.use(bodyParser.urlencoded({ extended: true }));

// //This return middleware that only parses json and only looks at requests where the Content-type
// //header matched the type option. 
// //When you use req.body -> this is using body-parser cause it is going to parse 
// // the request body to the form we want
app.use(bodyParser.json());



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port = process.env.PORT || 3000;

var server = app.listen(port, () => {
    console.log(`Server running at http://:${port}`);
});

const MessageRoute = require('./router/routere.js')
app.use('/Message', MessageRoute)
// //Chat Server

// var io = require('socket.io')(server);
// io.on('connection',function(socket) {

//     //The moment one of your client connected to socket.io server it will obtain socket id
//     //Let's print this out.
//     console.log(`Connection : SocketId = ${socket.id}`)
//     //Since we are going to use userName through whole socket connection, Let's make it global.   
//     var userName = '';
    
//     socket.on('subscribe', function(data) {
//         console.log('subscribe trigged')
//        // const room_data = JSON.parse(data)
//         userName = data.userName;
//         const roomName = data.roomName;
    
//         socket.join(`${roomName}`)
//         console.log(`Username : ${userName} joined Room Name : ${roomName}`)

//         // io.to(`${roomName}`).emit('newUserToChatRoom',userName);
//         io.emit('newUserToChatRoom',userName);

//     })

//     socket.on('unsubscribe',function(data) {
//         console.log('unsubscribe trigged')
//         const room_data = JSON.parse(data)
//         const userName = room_data.userName;
//         const roomName = room_data.roomName;
    
//         console.log(`Username : ${userName} leaved Room Name : ${roomName}`)
//         socket.broadcast.to(`${roomName}`).emit('userLeftChatRoom',userName)
//         socket.leave(`${roomName}`)
//     })

//     socket.on('newMessage',function(data) {
//         console.log('newMessage triggered')

//        // const messageData = JSON.parse(data)
//         const messageContent = data.messageContent
//         const roomName = data.roomName
//         const chatData = {
//             userName : userName,
//             messageContent : messageContent,
//             roomName : roomName
//         }
//         console.log(`[Room Number ${roomName}] ${userName} : ${messageContent}`)
//         // Just pass the data that has been passed from the writer socket
//         socket.broadcast.to(`${roomName}`).emit('updateChat',JSON.stringify(chatData)) // Need to be parsed into Kotlin object in Kotlin
//     })

//     // socket.on('typing',function(roomNumber){ //Only roomNumber is needed here
//     //     console.log('typing triggered')
//     //     socket.broadcast.to(`${roomNumber}`).emit('typing')
//     // })

//     // socket.on('stopTyping',function(roomNumber){ //Only roomNumber is needed here
//     //     console.log('stopTyping triggered')
//     //     socket.broadcast.to(`${roomNumber}`).emit('stopTyping')
//     // })

//     socket.on('disconnect', function () {
//         console.log("One of sockets disconnected from our server.")
//     });
// })

// module.exports = server; //Exporting for test
/**
 * @author Joyce Hong
 * @email soja0524@gmail.com
 * @create date 2019-09-02 20:51:10
 * @modify date 2019-09-02 20:51:10
 * @desc socket.io server !
 */

 
 
 
 

 
 //Chat Server
 
 var io = require('socket.io')(server);
 
 io.on('connection',function(socket) {
 
   
     console.log(`Connection : SocketId = ${socket.id}`)
     //Since we are going to use userName through whole socket connection, Let's make it global.   
     var userName = '';
     
     socket.on('subscribe', function(data) {
         console.log('subscribe trigged')
         console.log(data);
        //  const room_data = data
         userName = data.userName;
         const roomName = data.roomName;
     
         socket.join(`${roomName}`)
         console.log(`Username : ${userName} joined Room Name : ${roomName}`)
         io.to(`${roomName}`).emit('newUserToChatRoom',userName);
 
     })
 
     socket.on('unsubscribe',function(data) {
         console.log('unsubscribe trigged')
         const room_data = data
         const userName = room_data.userName;
         const roomName = room_data.roomName;
     
         console.log(`Username : ${userName} leaved Room Name : ${roomName}`)
         socket.broadcast.to(`${roomName}`).emit('userLeftChatRoom',userName)
         socket.leave(`${roomName}`)
     })
 
     socket.on('newMessage',function(data) {
         console.log('newMessage triggered')
             console.log(data)
        // const messageData = data
         const messageContent = data.messageContent
         const roomName = data.roomName
 const userName = data.userName
         console.log(`[Room Number ${roomName}] ${userName} : ${messageContent}`)
         // Just pass the data that has been passed from the writer socket
 
         const chatData = {
             userName : userName,
             messageContent : messageContent,
             roomName : roomName
         }
         socket.broadcast.to(`${roomName}`).emit('updateChat',chatData) // Need to be parsed into Kotlin object in Kotlin
     })
 
     // socket.on('typing',function(roomNumber){ //Only roomNumber is needed here
     //     console.log('typing triggered')
     //     socket.broadcast.to(`${roomNumber}`).emit('typing')
     // })
 
     // socket.on('stopTyping',function(roomNumber){ //Only roomNumber is needed here
     //     console.log('stopTyping triggered')
     //     socket.broadcast.to(`${roomNumber}`).emit('stopTyping')
     // })
 
     socket.on('disconnect', function () {
         console.log("One of sockets disconnected from our server.")
     });
 })
 
 module.exports = server; //Exporting for test
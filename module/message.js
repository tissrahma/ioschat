const mongoose = require('mongoose')
const Schema = mongoose.Schema
const MessageSchema = new Schema({
    UserM1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    UserM2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    messageUser1: [Map],
   
    RommeName: {
        type: String,
        ref: 'Matche'
      },
    
})
const Message = mongoose.model('Message', MessageSchema)
module.exports = Message
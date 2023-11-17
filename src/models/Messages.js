const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessagesMailSchema =  new Schema ({
    name:{
        type: String,
    },
    email:{
        type:String,
    },
    message:{
        type: String,
    }
})

module.exports = mongoose.model('MessagesMail' , MessagesMailSchema)
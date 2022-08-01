const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    roomID :{
        type:String,
        required:true
    },
    userIDList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
})
module.exports = mongoose.model('Room',roomSchema)
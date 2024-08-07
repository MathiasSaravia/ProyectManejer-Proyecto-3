const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var ProjectSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    dataExpire:{
        type:Date,
        default:Date.now
    },
    client:{
        type:String,
        required:true,
        trim:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    client:{
        type:String,
        required:true,
        trim:true
    },
    collaborators:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }]
},
{timestamps:true});

//Export the model
module.exports = mongoose.model('Project', ProjectSchema);
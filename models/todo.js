const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        min:20,
    },
    description:{
        type:String,
        required:true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
});

module.exports =Blog = mongoose.model('Todo',todoSchema);
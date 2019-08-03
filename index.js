const express = require("express");
const MongoClient = require("mongodb");
const mongoose = require('mongoose');
const bpdyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const url = 'mongodb://localhost:27017/todoList';
const todoRoute = require('./src/todo');
const dbName = 'TodoList';
const app = express();
app.use(cors());
app.use(helmet());
app.use(bpdyParser.urlencoded({extended:false}));
mongoose.connect(url,{useNewUrlParser:true})
    .then(result=>{
        console.log("Data base is connected");
    })
    .catch(err=>{
        console.log("error is  " +  err)
    });

mongoose.set('useCreateIndex', true);
app.use('/todo', todoRoute);
app.get('/', (req,res) => {
    res.json({
        message:"hello world"
    });
});

app.listen(4000 ,() =>{
    console.log("the server is running at port 4000");
})
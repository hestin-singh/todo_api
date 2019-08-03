const express = require('express');
const router = express.Router();
const Todo = require("../models/todo");

router.get('/',async (req,res) => {
   try{
    const todo = await  Todo.find({}).sort({createdAt: -1});
     res.json(todo);
   } catch {
       res.json({"message": "Error while fething data"})
   }
   
})

router.post('/', (req ,res) => {
    const todo = new Todo({
        title:'Homeeork',
        description:"sdgsgdsgsg"
    })
    todo.save();
    res.send("Dggs")
})
 
router.patch('/:todoId',(req,res)=>{
    const id= req.params.todoId;
    const updateTodo ={};
    console.log(req.body)

    Todo.findById({_id:id})
    .then(todo=>{
        if(!todo){
            res.status(404).json({
                message:"page not found",
            })
        }
        else{
             Todo.updateOne({_id:id},{$set: {title:req.body.title,description: req.body.description}})
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json(result)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
        }
    })
})


router.delete('/:todoId', (req,res) => {
    Todo.findById({_id:req.params.todoId})
        .then(todo=>{
            if(!todo){
                res.status(404).json({
                    message:"page not found",
                })
            }
            else{
                Todo.deleteOne({_id:req.params.todoId})
                .then(result=>{
                    res.status(200).json(result);
                })
                .catch(err=>{
                    res.status(500).json({
                        error: err
                    })
                })
            }
        })
})

module.exports = router;
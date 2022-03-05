const express = require("express");
const taskDataBase = require('./mongoDB');
const app = express();

app.use(express.json());

const port = process.env.PORT || 3000
app.listen(port);

//create read updated delete
app.post('/add', addTask);
app.post('/delete', deleteTask);

async function addTask(req,res){
    await taskDataBase.create(req.body);
    res.json({
        Message: "Task Added successfully"
    })
}

async function deleteTask(req,res){

    let taskToBeDeleted = await taskDataBase.findOne({ Task: req.body.Task });
    if(taskToBeDeleted){
        await taskDataBase.deleteOne(taskToBeDeleted['_id']);
    }

    res.json({
        message:"Task has been removed"
    })
}
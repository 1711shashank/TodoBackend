const express = require("express");
const { all } = require("express/lib/application");
const taskDataBase = require('./mongoDB');
const app = express();

app.use(express.json());

const port = process.env.PORT || 3000
app.listen(port);

//create read updated delete
app.post('/create', createTask);
app.get('/read', readTask);
app.post('/update', updateTask);
app.post('/delete', deleteTask);


async function createTask(req, res) {
    await taskDataBase.create(req.body);
    res.json({
        Message: "Task Added successfully"
    })
}

async function readTask(req, res) {
    let allTask = await taskDataBase.find();
    res.send(allTask);
}

async function updateTask(req, res) {
    let oldTask = req.body.old;
    let newTask = req.body.new;

    let taskToBeUpdated = await taskDataBase.findOne({ Task: oldTask });
    if (taskToBeUpdated) {
        taskToBeUpdated['Task'] = newTask;
        taskToBeUpdated.save();
    }

    res.json({
        message: "Task has been updated"
    })
    
}

async function deleteTask(req, res) {

    let taskToBeDeleted = await taskDataBase.findOne({ Task: req.body.Task });
    if (taskToBeDeleted) {
        await taskDataBase.deleteOne(taskToBeDeleted['_id']);
    }

    res.json({
        message: "Task has been removed"
    })
}
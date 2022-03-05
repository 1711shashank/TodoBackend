const mongoose = require('mongoose');
const db_link = "mongodb+srv://todo:rM9JhSYufDrMrxxS@cluster0.o7xsn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(db_link)
    .then(()=>{
        console.log("db connected");
    }).catch((err)=>{
        console.log(err);
    })

// database stracture
const taskSchema = mongoose.Schema([{
    Task:{
        type: String,
    }
}])

const taskDataBase = mongoose.model("userModal", taskSchema);
module.exports = taskDataBase;
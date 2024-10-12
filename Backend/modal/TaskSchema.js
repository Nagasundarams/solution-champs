const mongoose=require('mongoose');
const TaskSchema=mongoose.Schema({
    name:{
        type:String,
        required: [true, 'A task must have a name']
    },
    EstimatedHrs:{
        type:Number,
        required: [true, 'A task must have a timeline'],
    },
    Status:{
        type:String

    }
})

const Task=mongoose.model("task",TaskSchema);



module.exports=Task;
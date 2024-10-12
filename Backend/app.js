const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const TaskController=require('./Controller/TaskController')

const app=express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://snagasundaram3:123@cluster0.kvexk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{console.log("DB connection success")}).catch((err)=>{console.log(err);
});






app.patch('/:id',TaskController.updatetask).delete('/:id',TaskController.deletetask);
app.post('/',TaskController.Posttask).get('/',TaskController.getalltask);

app.listen(3001,()=>{
    console.log(`running on 3001`);
    
});
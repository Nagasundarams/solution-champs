const Task=require('../modal/TaskSchema');

exports.getalltask = async (req, res) => {
    try {
        
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 10;
        const skip = (page - 1) * limit;

        
        let tasks = await Task.aggregate([
            { $match: {} },
            { $skip: skip },
            { $limit: limit }
        ]);

        
        const numOfTasks = await Task.countDocuments();

        
        if (skip >= numOfTasks) {
            return res.status(404).json({
                status: "Failed",
                message: "No more tasks available"
            });
        }

        
        res.status(200).json({
            tasks,
            totalPages: Math.ceil(numOfTasks / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        });
    }
};


exports.Posttask=async (req,res)=>{
    
    try{ 
        const newtask=await Task.create(req.body);
 
     res.status(201).json({
         status:"success",
         data:{
             tasks:newtask
         }
 
     })}
     catch(err){
        console.log(err);
        
         res.status(400).json({
             status:"Failed",
             message:"Invalid Input"
 
         })
     }
 }

 exports.updatetask= async(req,res)=>{

    try{
     const tasks=await Task.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
     });
     res.status(200).json({
         status:"success",
         data:{
             tasks
         }
     })}
     catch{
         res.status(404).json({
             status:"Failed",
             message:"Not Found"
         })
     }
 }

exports.deletetask=async(req,res)=>{
    try{const tasks=await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
        status:"success",
        data:null,
    })}
    catch{
        res.status(404).json({
            status:"failed",
            message:"not found"
        })
    }
   
}
const mongoose=require('mongoose')
const taskSchema= mongoose.Schema()


const tasks=mongoose.model('tasks',{
    description:{
        type:String,
        required:true,
        trim:true,
        
    }, completion:{
        type:Boolean,
        default:'false'
    }
})



module.exports=tasks
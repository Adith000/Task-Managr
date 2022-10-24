const mongoose=require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
})




// const works=new tasks({
// description:'cleaning',
// completion:true

// })


// works.save().then((result)=>{
// console.log(result)
// }).catch((error)=>{
// console.log(error)
// })
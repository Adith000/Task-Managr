const express=require('express')
require('./DB/mongoose.js')
const userRouter=require('./routers/user')
const taskRouter=require('./routers/task')
const bcrypt=require('bcrypt')

const app=express()
const port = process.env.PORT || 3000

// app.use((req,res,next)=>{
// if(req.method==='GET'){
//     res.send('GET requests are diabled').status(404) 
// }else{
//     next()
// }
// })

app.use((req,res,next)=>{
  
        res.send('The server is in maintainance mode. Pleace try again later').status(500)
    
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port,()=>{
console.log('Server is up and running on port '+port)
 
}) 



const jwt=require('jsonwebtoken')

const myFunction=async()=>{
const token=jwt.sign({_id:'abc1234'},'thisiaanodecourse',{expiresIn:'7 days'})
console.log(token)


const data=jwt.verify(token,'thisiaanodecourse')
console.log(data)
}

myFunction()
const express=require('express')
const tasks=require('../models/tasks.js')
const router= new express.Router()


router.post('/tasks',async (req,res)=>{
    const task=new tasks(req.body)
try{
await task.save()
res.send(task).status(201)
}catch(e){
res.send(e).status(401)
}

})

router.get('/tasks', async (req,res)=>{

try{
const task= await tasks.find({})
res.send(task).status(201)
} catch(e){
res.send(e).status(501)
}


})


router.get('/tasks/:id',async (req,res)=>{
    const id= req.params.id

    try{
const task= await tasks.findById(id)
if(!task) {
    return res.status(404).send('Unable to find a user with that particular id')
 }
res.send(task).status(201)
}catch(e){
res.send(e).status(500) 
}    
})


router.patch('/tasks/:id',async (req,res)=>{
const updates=Object.keys(req.body)
 const allowedOperations=['description','completion']
const isValidOperation=updates.every((updates)=> allowedOperations.includes(updates))

if(!isValidOperation) {
return res.send('Invalid Syntax').status(404)
}

try{
const task=await tasks.findById(req.params.id)
updates.forEach((update)=>task[update]=req.body[update])
await task.save()

res.send(task).status(201)
}catch(e){
    res.send(e).status(404)
}

})

router.delete('/tasks/:id',async (req,res)=>{
   
    try{
const task= await tasks.findByIdAndDelete(req.params.id)
if(!task){
    return  res.send('The id is non existing').status(500)
}
res.send(task).status(201)
    }catch(e){
res.send(e).status(500)
    }
})
module.exports=router
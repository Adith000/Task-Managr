const express=require('express')
const { append } = require('express/lib/response')
const User=require('../models/user')
const router= new express.Router()
const bodyParser= require('body-parser')
const { update } = require('../models/user')

router.use(bodyParser.json())


router.post('/user', async (req,res) => {
    const user= new User(req.body)
 
    try{
        await user.save()
        const token=await user.generateAuthToken()
      
        res.status(201).send(user,token)
    }catch(e){
res.status(404).send(e)
    }
 
})



router.post('/users/login',async (req,res)=>{


    try{
const user=await User.findByCredentials(req.body.email , req.body.password)
const token=await user.generateAuthToken()
res.send({user,token}).status(201)
    }catch(e){
        res.send().status(400)
    }
})

router.get('/users',async (req,res)=>{
    try{
const user=await User.find({})
res.send(user).status(201)
    }catch(e){
res.send(e).status(400)
    }


})
router.get('/users/:id',async (req,res)=>{
    
    try{
const user= await User.findById(req.params.id)
if(!user) {
        return res.status(404).send('error')
     }
res.send(user).status(201)
    }catch(e){
res.send(e).status(500)
    }

})



router.patch('/users/:id',async(req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdates=['name','age','password','email']
    const isValidoperation=updates.every((updates)=>{
 return allowedUpdates.includes(updates)
    })
 
    if(!isValidoperation){
        res.send({error:'can not add these type of data'}).status(404)
    }
    try{
const user=await User.findById(req.params.id)
updates.forEach((update)=> user[update]=req.body[update])
await user.save()

        
if(!user){
    return res.status(404).send('unable to find the user')
}

res.send(user).status(201)
    }catch(e){
        res.send(e).status(400)
    }
})


router.delete('/users/:id',async (req,res)=>{
    try{
const user = await User.findByIdAndDelete(req.params.id)
if(!user){
    return res.status(404).send('This file is non existing. Try chainging the id')
}
res.send(user).status(201)
    }catch(e){
res.send(e).status(404)
    }
})

module.exports=router
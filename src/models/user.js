const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcrypt')
const res = require('express/lib/response')
const jwt=require('jsonwebtoken')
const userSchema= new mongoose.Schema({
    name:{
type:String,
required:true,
trim:true
    },
    email:{ 
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('The provided email is invalid')
            }
        }
    },
    age:{
type:Number,
default:0,
validate(value){
     if(value<0){
        throw new Error('No negative values are allowed')
     }
}

    },
    password:{
        required:true,
        type:String,
        unique:true,
        minLength:7,
        trim:true,
      
        validate(value){
            if((value.toLowerCase().includes('password'))){
                throw new Error('your password can not be password')
            }
            
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})
userSchema.methods.generateAuthToken=async function(){
    const user =this
const token=jwt.sign({_id:user._id.toString()},'thisiaanodecourse',{expiresIn:'30 days'})

user.tokens=user.tokens.concat({token}) 
await user.save()

return token
}

userSchema.statics.findByCredentials= async (email,password)=>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error('unable to find a userr with the given email')
    }

    const isMatch=await bcrypt.hash(password,user.password)
  if(!isMatch){
      throw new Error('Unable to find a user bu the given password')
  }
return user
}

userSchema.pre('save',async function(next){
const user=this

if(user.isModified('password')){
    user.password=await bcrypt.hash(user.password,8)
}

next()
})


const User = mongoose.model('User',userSchema)

module.exports= User
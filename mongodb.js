//CRUD Operations create read upadte delete

// const mongodb=require('mongodb')
// const MongoClient=mongodb.MongoClient       //these three lines are destructured
// const ObjectID=mongodb.ObjectId


const {MongoClient,ObjectId}=require('mongodb')

connectionURL='mongodb://127.0.0.1:27017'
const databaseName='task-manager'  //random value can give any output

// const id =new ObjectId()
// console.log(id)
// console.log(id.getTimestamp())


MongoClient.connect(connectionURL,{useNewUrlParser:true },(error,client)=>{
if(error){
    return console.log('Unable to connect to datasbase')
}   
const db= client.db(databaseName)

// db.collection('users').deleteMany({
//     age:17
// }).then((result)=>{
//     console.log('Succesfully deleted',result)
// }).catch((error)=>{
//     console.log('Statement can not be deleted',error)
// })

db.collection('tasks').deleteOne({
    _id: new ObjectId("6270bc3af72851981e41160f")
}).then((result)=>{
console.log(result)
}).catch((error)=>{
console.log(error)
})
})

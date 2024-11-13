const express=require('express')
const mongoose=require('mongoose')
const app=express()
app.use(express.json())
const port=6002
//application lvl mware
app.use(function(req,res,next){
    console.log(`${req.method} -${req.url} -${req.Date()} - ${req.ips}`)
    next()
})

mongoose.connect('mongodb://127.0.0.1:27017/feb2023')
    .then(()=>{
        console.log('connected to db')
    })
    .catch((e)=>{
        console.log(e.message)
    })
//create a Schema
//task manager
const Schema=mongoose.Schema
const taskSchema=new Schema({
    title:{
        type:String,
        //server side validations required:true
        //required:true
        // if we want to set msg
        required:[true,'title is mandatory']

    },
    description:{
        type:String
    },
    completed:{
        type:Boolean
    },
    dueDate:{
        type:Date
    },
    createdDate:{
        type:Date,
        // to set created dat eto be default now mongoose provide Date.now
        default:Date.now
    }

})
//creating model -helps talk backend to db
const Task=mongoose.model('Task',taskSchema)
app.get('/api/tasks',(req,res)=>{
    Task.find()
        .then((tasks)=>{
            res.json(tasks)
        })
        .catch((e)=>{
            res.json(e)
        })
    

})
//creating task
app.post('/api/tasks',(req,res)=>{
    const body=req.body
    const task=new Task(body)
    task.save()
        .then((task)=>{
            res.json(task)
        })
        .catch((err)=>{
            res.json(err.message)
        })
})
//fnd task based on id mongoose provide findById()
app.get('/api/tasks/:id',(req,res)=>{
    const id=req.params.id
    Task.findById(id)
        .then((task)=>{
            res.json(task)
        })
        .catch((err)=>{
            res.json(err.message)
        })
})
// update task mongoose provide findByIdAndUpdate()
app.put('/api/tasks/:id',(req,res)=>{
    const id=req.params.id
    const body=req.body
    // to get updated record we have to pass 3rd arg new:true , by default validations dont work on finByIdAndUpdate so we have to write runValidators
    Task.findByIdAndUpdate(id,body,{new : true , runValidators:true})
        .then((task)=>{
            res.json(task)
        })
        .catch((err)=>{
            res.json(err.message)
        })
})
//delete a record
app.delete('/api/tasks/:id',(req,res)=>{
    const id=req.params.id
    Task.findByIdAndDelete(id)
        .then((task)=>{
            res.json(task)
        })
        .catch((err)=>{
            res.json(err.message)

        })
})

app.get('/',(req,res)=>{
    res.send('welcome to website')
        
})
app.listen(port,()=>{
    console.log('server running on port',port)
})
const express=require('express')
const app=express()
const mongoose=require('mongoose')
app.use(express.json())
const port=6003
//connecting mongodb
mongoose.connect('mongodb://127.0.0.1:27017/feb20233')
    .then(()=>{
        console.log('connected to db')
    })
    .catch((err)=>{
        console.log(err)
    })
const Schema=mongoose.Schema()
const taskSchema=({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    createdDate:{
        type:Date,
        default:Date.now

    },
    dueDate:{
        type:Date
    },
    completed:{
        type:Boolean
    }

})
//creating model
const Task=mongoose.model('Task',taskSchema)
//get all tasks
app.get('/api/tasks',(req,res)=>{
    Task.find()
        .then((tasks)=>{
            res.json(tasks)
        })
        .catch((err)=>{
            res.json(err)
        })
})
//creating tasks
app.post('/api/tasks',(req,res)=>{
    const body=req.body
    const task=new Task(body)
    task.save()
        .then((task)=>{
            res.json(task)
        })
        .catch((err)=>{
            res.json(err)
        })
})
//update
app.put('/api/tasks/:id',(req,res)=>{
    const id=req.params.id
    const body=req.body
    Task.findByIdAndUpdate(id,body,{new:true,runValidators:true})
        .then((task)=>{
            res.json(task)
        })
        .catch((err)=>{
            res.json(err)
        })
})
//delete
app.delete('/api/tasks/:id',(req,res)=>{
    const id=req.params.id
    Task.findByIdAndDelete(id)
        .then((task)=>{
            res.json(task)
        })
        .catch((err)=>{
            res.json(err)
        })
})

app.get('/',(req,res)=>{
    res.json('app is running')
})

app.listen(port,()=>{
    console.log('server runnning on port',port)
})

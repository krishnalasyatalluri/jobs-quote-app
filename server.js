const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const app=express()
app.use(cors())
app.use(express.json())
const port=5010
mongoose.connect('mongodb://127.0.0.1/expense-app-fullstack')
    .then(()=>{
        console.log('connected to db')
    })
    .catch(()=>{
        console.log('error connecting to db')

    })
const {Schema}=mongoose
const categorySchema=new Schema({
    name:{
        type:String,
        required:true
    }
},{timestamps:true})
const expenseSchema=new Schema({
    title:{
        type:String,
        required:true 
    },
    notes:{
        type:String

    },
    expenseDate:{
        type:Date,
        required:true,
        default:true

    },
    amount:{
        type:Number,
        min:1,
        required:true 

    },
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        required:true
    }

})
const Expense=mongoose.model('Expense',expenseSchema)
app.post('/api/expenses',(req,res)=>{
    const body=req.body 
    Expense.create(body)
        .then((exp)=>{
            res.json(exp)
        })
        .catch((err)=>{
            res.json(err)
        })
})
const Category=mongoose.model('Category',categorySchema)
// //creating a record
// const c1=new Category({name:'biryani'})
// c1.save()
//     .then((category)=>{
//         console.log(category)
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
//creating a record
app.post('/api/categories',(req,res)=>{
    const body=req.body
    const category=new Category(body)
    category.save()
        .then((category)=>{
            res.json(category)
        })//when record sucessfully added to db
        .catch((err)=>{
            res.status(404).json()
        })//when validations fail
})
// find a record based on id
// Category.findById("64f3163cce9b93ca64706877")
//     .then((category)=>{
//         console.log(category)
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
// find all records
app.get('/api/categories',(req,res)=>{
    Category.find()
        .then((categories)=>{
            res.json(categories)
        })
        .catch((err)=>{
            res.json(err)
        })
})
app.listen(port,()=>{
    console.log('server is running',port)
})
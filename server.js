const express=require('express')
const cors=require('cors')
const port=5008
const app=express()
app.use(cors())
app.use(express.json())
// const employees=require('./employees.json')
// const projects=require('./projects.json')
app.get('/api/employees',(req,res)=>{
    const data=require('./employees.json')
    res.json(data)
    
})
app.get('/api/projects/:id',(req,res)=>{
    const id=req.params.id
    const projects=require("./projects.json")
    const result=projects.filter((ele)=>{
        return ele.employee_id==id
    })
    res.json(result)
})
app.listen(port,()=>{
    console.log('server running on port',port)
})
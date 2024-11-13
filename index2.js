const express=require('express')
const cors=require('cors')
const app=express()
app.use(cors())
app.use(express.json())
const port=5008
//get request
app.get('/',(req,res)=>{
    res.send('welcome')
})
app.post('/api/stats',(req,res)=>{
    const body=req.body
    const vowel='aeiouAEIOU'
    const result={
        id:Number(new Date()),
        lowercase:body.input,
        uppercase:body.input.toUpperCase(),
        ascii_Code:body.input.charCodeAt(),
        isVowel:vowel.includes(body.input)

    }
    res.json(result)
})
app.post('/api/frequency',(req,res)=>{
    const body=req.body
    
})

app.listen(port,()=>{
    console.log('server is running on port',port)
})
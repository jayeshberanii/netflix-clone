const express=require('express')
const app=express()
const cors=require('cors')
const dotenv=require('dotenv')
dotenv.config()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
require('./DBConn/conn')

app.use('/api/user',require('./routes/userRoutes'))

app.listen(process.env.PORT,()=>{
    console.log(`server is successfully running on http://localhost:${process.env.PORT}`);
})  
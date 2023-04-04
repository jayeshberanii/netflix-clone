const mongoose=require('mongoose')

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(res=>console.log("database connected"))
.catch(err=>console.log(err.message))

const express=require('express')
const app=express()
const {config}=require('dotenv');
const {default: mongoose} =require('mongoose')
const router=require('./Router/Route')
const cors=require('cors')
const multer = require('multer');
const path = require('path');
const fs = require('fs');


config({ path:'../config/config.env'})






app.use(express.json())

app.use(cors())



  mongoose.connect(`mongodb+srv://RahulChaudhary:${process.env.MONGO_DB}.mongodb.net/JsFoods?retryWrites=true&w=majority`)
   .then(()=>{
    console.log("MongoDB is connected")
   
})
.catch((err)=>console.log(err.message))



app.use("/",router)


app.listen(process.env.PORT || 9000 , function (){
    console.log(`app is listen on ${process.env.PORT} PORT`)
})



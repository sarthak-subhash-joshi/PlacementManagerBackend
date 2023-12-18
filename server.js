require('dotenv').config()

const express = require('express')
const workoutRoutes=require('./Routes/Workouts')
const mongoose=require('mongoose');

const app=express()

// // Routes
// app.get('/',(req,res)=>{
//     res.json({msg:"Hello Sarthak Joshi"})
// })

app.use(express.json())

app.use('/api',workoutRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
    console.log("Connected to DB and Listening on port",process.env.PORT)
})
})
.catch((error)=>{
    console.log(error)
})



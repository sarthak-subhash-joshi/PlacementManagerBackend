require('dotenv').config()

const express = require('express')
const studentRecordRoutes=require('./Routes/studentRecordRoutes')
const placementRecordRoutes=require('./Routes/placementRecordRoutes')

const mongoose=require('mongoose');
const cors = require('cors');

const app=express()

app.use(cors());

app.use(express.json())

app.use('/api/student_record/',studentRecordRoutes)
app.use('/api/placement_record/',placementRecordRoutes)

var BulkDataUploadsRoute=require('./Routes/BulkDataUploadsRoutes')
app.use('/',BulkDataUploadsRoute)


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
    console.log("Connected to DB and Listening on port",process.env.PORT)
})
})
.catch((error)=>{
    console.log(error)
})



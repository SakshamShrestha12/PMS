require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')

const PatientRoutes=require('./routes/Patients')
const userRoutes=require('./routes/User')
const IPDRoutes=require('./routes/ipdRegister')
const OPDRoutes=require('./routes/OpdRegister')
const departmentRoutes = require('./routes/departments')
const doctorRoutes = require('./routes/doctors')



const app=express()

//middleware
app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/Patients',PatientRoutes)
app.use('/api/user',userRoutes)
app.use("/api/opd", OPDRoutes);
app.use("/api/ipd", IPDRoutes);
app.use("/api/departments", departmentRoutes)
app.use("/api/doctors", doctorRoutes)

//Connection to DB
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
app.listen(process.env.PORT,()=>{
console.log("Connected to DB & listening to port", process.env.PORT)
})
})
.catch((error)=>{
    console.log(error)
})
//Listen to the port

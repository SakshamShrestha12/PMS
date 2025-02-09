const mongoose=require('mongoose')

const Schema=mongoose.Schema

const patientSchema=new Schema({
    Patient_name: {
        type: String,
        required: true
    },
    Gender: {
        type: String,
        required: true
    },
    DOB: {
        type: Date,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Contact_details:{
        type: Number,
        required: true
    },
    consultant:{
        type: String,
        required: true
    },
    Insurance_details:{
        type:Number,
        required: false

    }
},
    {timestamps: true})

    module.exports=mongoose.model('Patient',patientSchema)
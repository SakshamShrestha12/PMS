const express=require('express')
const Patient=require('../models/PatientsModel')

const router=express.Router()


//Get all Workouts from OPD
router.get('/',(req,res)=>{
    res.json({msg: "Get all Patients from OPD"})
})
router.get('/:id',(req,res)=>{
    res.json({msg: "Get a single Patient from OPD"})
})
//post a single Patient
router.post('/',async (req,res)=>{
    const{Patient_name,Gender,DOB,Address,Conact_details,Insurance_details}=req.body
    try{ 
        const patient = await Patient.create({Patient_name,Gender,DOB,Address,Conact_details,Insurance_details})
        res.status(200).json(patient)

    }catch(error){
        re.status(400).json({error: error.message})

    }
})
//Delete a Patient
router.delete('/:id',(req,res)=>{
    res.json({msg: "Delete single Patient from OPD"})
})
router.patch('/:id',(req,res)=>{
    res.json({msg: "Update Patient from OPD"})
})

module.exports = router
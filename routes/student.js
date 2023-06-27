const express=require('express');
const router=express.Router();
const Students=require("../models/student")
router.post('/register', async(req,res)=>{
    const{name,section,branch,studentNo,registrationNo,phoneNo,email}=req.body;
    if(!registrationNo||!studentNo){
        res.status(400).json({msg:"fill all the credentials!"})
    }
    const createStudent=await Students.create({
        name,
        section,
        branch,
        studentNo,
        registrationNo,
        phoneNo,
        email
    })
    res.status(201).json({msg:"New student details added successfully",createStudent})
})
router.get('/',async(req,res)=>{
    const allStudents=await Students.find({})
    res.status(201).json({allStudents})
})
router.get('/find/:studentNo',async(req,res)=>{
const student=  await Students.findOne({studentNo:req.body.studentNo})
if(!student) {
    res.status(401).json({msg:"Student dosen't exist"})
}
res.status(201).json({student})  
})
module.exports=router;
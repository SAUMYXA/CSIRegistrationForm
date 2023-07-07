const nodemailer=require('nodemailer');
const asyncHandler=require('express-async-handler');
const Students=require("../models/student")
const registerStudent=asyncHandler(async(req,res)=>{
    const{name,section,branch,studentNo,registrationNo,phoneNo,email,gender,hostler}=req.body;
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
        email,
        gender,
        hostler
    })
    res.status(201).json({msg:"New student details added successfully",createStudent})
})
const  getStudents= asyncHandler(async(req,res)=>{
    const allStudents=await Students.find({})
    res.status(201).json({allStudents})
})
const findStudent=asyncHandler(async(req,res)=>{
    const student=  await Students.findOne({studentNo:req.body.studentNo})
    if(!student) {
        res.status(401).json({msg:"Student dosen't exist"})
    }
    res.status(201).json({student})  
    })
const sendMail=asyncHandler(async(req,res)=>{
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'brandy.bradtke95@ethereal.email',
            pass: 'XaX1YtcxNWhN1r781H'
        }
    });
      let info=await transporter.sendMail({
        from: '"Saumya Srivastava" <brandy.bradtke95@ethereal.email>', 
    to: "saumya.srivastava957@gmail.com", 
    subject: "Hello ✔", 
    text: "Hello world?", 
    html: "<b>Hello world?</b>",
      })
      console.log("Message sent: %s",info.messageId);
res.json(info)
})
    module.exports={registerStudent,getStudents,findStudent,sendMail}
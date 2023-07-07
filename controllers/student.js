const nodemailer=require('nodemailer');
const asyncHandler=require('express-async-handler');
const Students=require("../models/student")
require('dotenv').config();
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
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    const email=req.body.email;
      let info=await transporter.sendMail({
        from: '"Saumya Srivastava" <saumya2113061@akgec.ac.in>', 
    to: email, 
    subject: "Hello ✔", 
    text: "Hello world?", 
    html: "<b>Hello world?</b>",
      })
      console.log("Message sent: %s",info.messageId);
res.json(info)
})
    module.exports={registerStudent,getStudents,findStudent,sendMail}
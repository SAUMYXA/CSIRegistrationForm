const nodemailer=require('nodemailer');
const asyncHandler=require('express-async-handler');
const Students=require("../models/student")
require('dotenv').config();
const request=require('request')

let createStudent;
const registerStudent=asyncHandler(async(req,res)=>{
    const{name,section,branch,studentNo,registrationNo,phoneNo,email,gender,hostler}=req.body;
    // if(!registrationNo||!studentNo){
    //     res.status(400).json({msg:"fill all the credentials!"})
    // }
    // if(
    //     req.body.captcha===undefined||
    //     req.body.captcha===''||
    //     req.body.captcha===null
    // ){
    //     return res.json({"success":false,"msg":"Please select captcha"});
    // }const secretkey=process.env.SECRET_KEY
    // const verifyurl='https://google.com/recaptcha/api/siteverify?secret=${secretkey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}'
    // request(verifyurl,(err,response,body)=>{
    //     body=JSON.parse(body)

    //     if(body.success!==undefined &&!body.success){
    //         return res.json({"success":false,"msg":"Failed captcha verification"});  
    //     }
    //     return res.json({"success":true,"msg":"Captcha passed"});
    // })
    const userAvailable=await Students.findOne({email})
    if(userAvailable){
        res.status(400).json({msg:"you have already registered. Check your email"})
    }
    createStudent=await Students.create({
        name,
        section,
        branch,
        studentNo,
        registrationNo,
        phoneNo,
        email,
        gender,
        hostler,
        is_verified:0
    })
    sendMail(req.body.email,createStudent._id);
    res.status(201).json({msg:"New student details added successfully. Kindly check your mail",createStudent})
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
let email=req.body.email;
let id=Students._id;
const verificationLink = `http://localhost:5000/verify/${studentId}`;
      let info=await transporter.sendMail({
        from: '"Saumya Srivastava" <saumya2113061@akgec.ac.in>', 
    to: email, 
    subject: "For verification Mail", 
    text: "Hello world?", 
    // html: '<p>Hello,please click here to <a href="http://localhost:5000/verify?id='+id+'">Verify</a> your mail.</p>'
    html: `<p>Hello, please click <a href="${verificationLink}">here</a> to verify your email.</p>`
      })
      console.log("Message sent: %s",info.messageId);
res.json(info)
})
const verifyMail=asyncHandler(async(req,res)=>{
  const updatedInfo=await Students.updateOne({_id:req.query.id},{$set:{is_verified:1}})
  console.log(updatedInfo);
  res.redirect("https://csiakgec.in/")
})

    module.exports={registerStudent,getStudents,findStudent,sendMail,verifyMail}
const express=require("express");
const dotenv=require("dotenv").config();
const connectDB=require("./config/connectionDB")
const app=express();
connectDB();
const port=process.env.PORT||5000;
app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
})
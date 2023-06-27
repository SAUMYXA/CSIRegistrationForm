const mongoose=require("mongoose");
const connectDB= async()=>{
    try{
        const connection= await mongoose.connect(process.env.CONNECTION_STRING);
console.log("successfully connected to the mongoDB database at,",connect.connection.host,connect.connection.name)
    }catch(err){
     console.log(err)
     process.exit(1)
    }
}
module.exports=connectDB;
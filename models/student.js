const mongoose=require('mongoose');
const StudentSchema=mongoose.Schema({
    name:{
        type:String,
        required:true, 
    },
    section:{
        type:String,
        required:true,
        enum:[1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19]
    },
    branch:{
        type:String,
        required:true,
    },
    studentNo:{
        type:Number,
        required:true,
    },
    registrationNo:{
        type:Number,
        required:true,
    },
    phoneNo:{
        type:Number,
        required:true,
        min:10,
        max:10,
    },
    email:{
        type:String,
        required:true
    }

},
{
    timestamps:true
})

module.exports=mongoose.model("Students",StudentSchema)
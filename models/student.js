const mongoose=require('mongoose');;
const StudentSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    class:{
        type:String,
        required:true,
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
    },

},
{
    timestamps:true
})

module.exports=mongoose.model("Students",StudentSchema)
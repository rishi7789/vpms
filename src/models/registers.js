const mongoose=require("mongoose")

//schemas are structure/model of aur database collection
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    

})

//we are creating a new collection/model
const Register=new mongoose.model("Register",userSchema)

module.exports=Register;
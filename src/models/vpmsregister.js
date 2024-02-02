const mongoose=require("mongoose")

//schemas are structure/model of aur database collection
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    contact:{
        type:Number,
        required:true,
    },
    // vehicletype:{
    //     type:String,
    //     possibleValues: ['selectvehicle','twowheeler','fourwheeler'],
    //     required:true,

    // },
    vehiclenumber:{
        type:Number,
        required:true,
    },
    entrytime:{
        type:Date,
        required:true,
    },
    
})

//we are creating a new collection/model
const Vpmsregister=new mongoose.model("Vpmsregister",userSchema)

module.exports=Vpmsregister;
const express=require("express")
const app=express();
const path=require("path")
const hbs=require("hbs")
const bcrypt = require('bcrypt');
// const bodyparser=require("body-parser");
require("./database/connectdb")
const Register=require("./models/registers")
const Vpmsregister=require("./models/vpmsregister")

const port=process.env.PORT || 3000;

const static_path=path.join(__dirname,"../images")
const view_path=path.join(__dirname,"../views")
app.use(express.static(static_path))
app.set("view engine","hbs");
app.set("views",view_path)

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=>{
    res.render("login")
})
app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.get("/login",(req,res)=>{
    res.render("login")
})

//create new user in db
app.post("/signup",async(req,res)=>{
    try{
      const adduserRecord= new Register({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
      }) 

      //to encrypt the password for security
      const hashedPassword = await bcrypt.hash(adduserRecord.password, 10);
      adduserRecord.password=hashedPassword

    const insertUser= await adduserRecord.save(); 
    res.status(201).render("login")
    }catch(err){
       res.status(400).send(err)
    }
})

//login check
app.post("/login",async(req,res)=>{
    try{
    const email=req.body.email;
    const password=req.body.password;

  const dbEmail = await Register.findOne({email:email}) //{database email:user filled email} email match
  
  if(dbEmail.password === password){
    res.status(201).render("home")
  }

    }catch(err){
       res.status(400).send("Invalid login details")
    }
})

//vpms part routing
app.post("/",async(req,res)=>{
  try{
    const addRecord= new Vpmsregister({
      name:req.body.names,
     contact:req.body.contacts,
    //  vehicletype:req.body.vehicletypes,
     vehiclenumber:req.body.vehiclenumbers,
     entrytime:req.body.entrytimes
    }) 
  const insert= await addRecord.save(); 
  res.status(201).render("home")
  }catch(err){
     res.status(400).send(err)
  }
})


app.listen(port,()=>{
    console.log(`server is running at ${port}`);
})


const Vendor = require('../models/Vendor')
const  jwt = require('jsonwebtoken')
const  bcrypt = require('bcryptjs')
const dotEnv = require('dotenv')

dotEnv.config();

const secretKey = process.env.whatIsYourName

const vendorRegister = async(req,res)=>{
    const {username, email,password} = req.body
try{
    //checking email from user
    //we are using the email of user from Vendor.js and checking 
    // whether it is present or not in database
    const vendorEmail= await Vendor.findOne({email});
    if(vendorEmail){//if it is present
        return res.status(400).json("Email already taken");
    }
    const hashedPassword = await bcrypt.hash(password,10);

    //creating instance and by using this we will store it in database
    const newVendor = new Vendor ({
        username,
        email,
        password:hashedPassword

    });
    await newVendor.save();

    res.status(201).json({message:"vendor registered successfully"})
    console.log("registered")

}catch(error){
    console.log(error);
    res.status(500).json({error:"Internal server error"})
   

}
}

//vendorLogin
//checking vendor email and password correct or not 
const vendorLogin = async(req,res)=>{ //entering email andpassword
    const {email,password} = req.body
    try{
        const vendor = await Vendor.findOne({email});
        if(!vendor){
            console.log("vendor not found")
            return res.status(401).json({error:"Inavalid email "});
        }

        const isPasswordvalid = await bcrypt.compare(password,vendor.password);
        if(!isPasswordvalid){
            console.log("Password mismatched")
            return res.status(401).json({error: "Invalid email or password"});
        }

        //generating token

        const token = jwt.sign({vendorId: vendor._id},secretKey,{expiresIn:"720h"});

        console.log(email,"This is token:",token);
        res.status(200).json({success:"Login Succesfull",token});


    }catch(error){
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }
}
 //GETTING ALLVENDORS
const getAllvendors= async(req,res)=>{
    try {
        const vendors = await Vendor.find().populate('firm');
        res.json({vendors})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }
}

// GETTING VENDOR BYID
// and if we want firm records we can also right code here
//write populate('firm') to fetch firm records by vendors

const getVendorById = async (req, res) => {
    const vendorId = req.params.id;
    try {
        const vendor = await Vendor.findById(vendorId).populate('firm'); // Fix here
        if (!vendor) {
            return res.status(404).json({ error: "Vendor not found" });
        }
        res.status(200).json({ vendor });
    } catch (error) {
        console.error("Error in getVendorById:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
 };
 




module.exports = {vendorRegister , vendorLogin, getAllvendors, getVendorById}
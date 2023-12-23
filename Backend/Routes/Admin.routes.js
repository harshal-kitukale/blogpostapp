const express=require("express");
const User = require("../Models/user.model");
const adminRouter=express()


adminRouter.get("/allusers",async(req,res)=>{
    try {
        const users= await User(find({},{passowrd:0}))
        if(!users){
            res.status(200).json({msg:"No User Found"})

        }else{
            res.status(200).json(users)

        }

    } catch (error) {
    res.status(500).json({ message: "Server error" });
        
    }
})

module.exports=adminRouter
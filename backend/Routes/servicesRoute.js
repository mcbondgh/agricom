const express=require('express')
const loginRouter=express.Router()
const passport=require('passport')
require('../Services/local-strategy')

loginRouter.post("/agricom/auth/login",passport.authenticate('local'),(req,res)=>{
    const user=req.user;
   // hashPassword("")
    res.status(200).send({msg:"login successfully"})
})
module.exports=loginRouter

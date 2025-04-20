const express=require('express')
const loginRouter=express.Router()
const passport=require('passport')
require('../services/local-strategy')
const EmployeeController=require('../Controllers/EmployeeController')
const employeeController=new EmployeeController()
loginRouter.post("/agricom/auth/login",passport.authenticate('local'),(req,res)=>{
    const user=req.user;
    employeeController.getEmployee(user.EMPLOYEE_ID).then((userDetails)=>{
        req.session.authenticated=true
        req.session.user=userDetails
        res.json({ authenticated: true,
            user:{
           firstname: userDetails[0][0].first_name,
           lastname: userDetails[0][0].last_name,
           email: user.USER_NAME,
           fullname: userDetails[0][0].first_name+ " " + userDetails[0][0].last_name
         }, 
         });
    })
    //hashPassword(user)
})
loginRouter.get("/agricom/auth/me",(req,res)=>{
 try{
  if(req.session.authenticated){
    return res.status(200).json({success:true,user: req.session.user,authenticated:true})
  }else{
    return res.status(200).json({success:false,user: null,authenticated:false})
  }
 }catch(error){
    console.error("Error checking authentication",error)
    return res.status(500).json({success:false,message:"Server Error while checking authentication."})
 }
})
module.exports=loginRouter
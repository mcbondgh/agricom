const express=require('express')
const validateEmployeeDateInput=require('../MiddleWares/EmployeeMiddleware')
const employeeRouter=express.Router()
employeeRouter.post("/agricomfarms/agrocom/registeremployee",validateEmployeeDateInput,(req,res)=>{
    res.send({msg:`created`})
})
module.exports=employeeRouter
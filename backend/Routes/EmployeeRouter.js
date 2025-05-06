const express=require('express')
const validateEmployeeDateInput=require('../MiddleWares/EmployeeMiddleware')
const EmployeeController=require('../Controllers/EmployeeController')
const employeeRouter=express.Router()
employeeRouter.post("/agricomfarms/agrocom/registeremployee",validateEmployeeDateInput,(req,res)=>{
    res.send({msg:`created`})
})
const employeesobject=new EmployeeController()
employeeRouter.get("/agricomfarms/agrocom/getallemployee",(req,res)=>{
employeesobject.getAllEmployees().then((employee)=>{
res.send(employee)
})
})
module.exports=employeeRouter
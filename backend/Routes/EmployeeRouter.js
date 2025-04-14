const express=require('express')
const {validateEmployeeDateInput,updateEmployeeMiddleWare,delete_employeeMiddleware}=require('../MiddleWares/EmployeeMiddleware')
const EmployeeController=require('../Controllers/EmployeeController')
const employeeRouter=express.Router()
employeeRouter.post("/agricomfarms/agrocom/registeremployee",validateEmployeeDateInput,(req,res)=>{
    res.send({msg:`created`})
})
employeeRouter.post("/agricomfarms/agrocom/update_employee/:employeeId",updateEmployeeMiddleWare,(req,res)=>{
res.send({msg:"employee updated"})
})
const employeesobject=new EmployeeController()
employeeRouter.get("/agricomfarms/agrocom/getallemployee",(req,res)=>{
employeesobject.getAllEmployees().then((employee)=>{
res.send(employee)
})
})
employeeRouter.get("/agricomfarms/agrocom/delete_employee/:employeeId",delete_employeeMiddleware,(req,res)=>{
    res.send({msg:"employee deleted"})
})
module.exports=employeeRouter
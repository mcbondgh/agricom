const express=require('express')
<<<<<<< HEAD
const {validateEmployeeDateInput,updateEmployeeMiddleWare,delete_employeeMiddleware}=require('../MiddleWares/EmployeeMiddleware')
=======
const validateEmployeeDateInput=require('../MiddleWares/EmployeeMiddleware')
>>>>>>> eb3524e93a46e0b4a04dd443f6651375b98d003a
const EmployeeController=require('../Controllers/EmployeeController')
const employeeRouter=express.Router()
employeeRouter.post("/agricomfarms/agrocom/registeremployee",validateEmployeeDateInput,(req,res)=>{
    res.send({msg:`created`})
})
<<<<<<< HEAD
employeeRouter.post("/agricomfarms/agrocom/update_employee/:employeeId",updateEmployeeMiddleWare,(req,res)=>{
res.send({msg:"employee updated"})
})
=======
>>>>>>> eb3524e93a46e0b4a04dd443f6651375b98d003a
const employeesobject=new EmployeeController()
employeeRouter.get("/agricomfarms/agrocom/getallemployee",(req,res)=>{
employeesobject.getAllEmployees().then((employee)=>{
res.send(employee)
})
})
<<<<<<< HEAD
employeeRouter.get("/agricomfarms/agrocom/delete_employee/:employeeId",delete_employeeMiddleware,(req,res)=>{
    res.send({msg:"employee deleted"})
})
=======
>>>>>>> eb3524e93a46e0b4a04dd443f6651375b98d003a
module.exports=employeeRouter
const Joi=require('joi')
const moment=require('moment')
const DbConfig=require('../configs/DbConfig')
const EmployeeDataDto=require('../Dto/EmployeeDataDto')
const EmployeeController=require('../Controllers/EmployeeController')
const employeeShema=Joi.object({
    EMPLOYEE_id:Joi.number().integer().required(), 
    first_name:Joi.string().required(), 
    last_name:Joi.string().required(),
    other_name:Joi.string(), 
    email_address:Joi.string().email().required(), 
    digital_address:Joi.string().required(), 
    gender:Joi.string().required(), 
    mobile_numbe:Joi.string().required(), 
    location:Joi.string().required(), 
    salary:Joi.number().required(),
    date_of_employment:Joi.string().required(),
    comments:Joi.string()
})
const db=new DbConfig()
const employeeController=new EmployeeController()
async function validateEmployeeDateInput(req,res,next) {
    const employeeId=req.body.EMPLOYEE_id
    try{
        const connection=await db.getConnection()
        const [existEmployee]=await connection.execute('select EMPLOYEE_id from employees where EMPLOYEE_id=?',[employeeId])
        if(existEmployee.length>0){
            return res.send({msg:`Employee with id ${employeeId} already exist`})
        }else{
            const {error}=employeeShema.validate(req.body)
            if(error){
                return res.send({msg:error.details[0].message})
            }else{ 
                const employmentdate=moment(req.body.date_of_employment,"YYYY-MM-DD")
              employeeController.saveEmployeeDetails(new EmployeeDataDto(req.body.EMPLOYEE_id,req.body.first_name,req.body.last_name,
                req.body.other_name,req.body.email_address,req.body.digital_address,req.body.gender,req.body.mobile_numbe,
                req.body.location,new Date(employmentdate),new Date(Date.now()),req.body.salary,true,req.body.comments
              ))
                next()
            }
        }
        connection.end()
    }catch(err){
        console.log(err)
    }
    
}
async function updateEmployeeMiddleWare(req,res,next) {
   try{
    const employeeId=req.params.employeeId
    const connection=await db.getConnection()
    const [existEmployee]=await connection.execute(`select*from employees where EMPLOYEE_id=?`,[employeeId])
   if(existEmployee.length>0){
    const employeesobject=new EmployeeDataDto()
    const email_addressValue=req.body.email_address
    const email_address=email_addressValue!==undefined?email_addressValue:'N/A'
    const digital_addressValue=req.body.digital_address
    const digital_address=digital_addressValue!==undefined?digital_addressValue:'N/A'
    const mobile_numbeValue=req.body.mobile_numbe
    const mobile_numbe=mobile_numbeValue!==undefined?mobile_numbeValue:'N/A'
    const locationValue=req.body.location
    const location=locationValue!==undefined?locationValue:'N/A'
    const salaryValue=req.body.salary
    const salary=salaryValue!==undefined?salaryValue:'N/A'
    const commentsValue=req.body.comments
    const comments=commentsValue!==undefined?commentsValue:'N/A'
    const ageValue=req.body.age
    const age=ageValue!==undefined?ageValue:'N/A'
    employeesobject.setAge(age)
    employeesobject.setComments(comments)
    employeesobject.setMobile_numb(mobile_numbe)
    employeesobject.setDigital_address(digital_address)
    employeesobject.setLocation(location)
    employeesobject.setSalary(salary)
    employeesobject.setEmail_address(email_address)
    employeesobject.setEmployee_id(employeeId)
    employeeController.updateEmployeeDetails(employeesobject)
    next()
   }else{
    res.send({msg:"Employee Does not exist create employee before update"})
   }
    
   }catch(err){
    console.log(err)
   }
}
async function delete_employeeMiddleware(req,res,next) {
    const employeeId=req.params.employeeId
    const connection=await db.getConnection()
    const [existEmployee]=await connection.execute(`select*from employees where EMPLOYEE_id=? and IS_DELETED=?`,[employeeId,false])
    if(existEmployee.length>0){
     employeeController.delete_employee(employeeId)
     next()
    }else{
        res.send({msg:`Employee with Id ${employeeId} is not registered`})
    }
}
module.exports={validateEmployeeDateInput,updateEmployeeMiddleWare,delete_employeeMiddleware}
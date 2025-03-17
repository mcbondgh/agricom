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
            console.log(existEmployee)
            return res.send({msg:`Employee with id ${employeeId} already exist`})
        }else{
            const {error}=employeeShema.validate(req.body)
            if(error){
                return res.send({msg:error.details[0].message})
            }else{
                console.log("the num "+req.body.mobile_numbe)
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
module.exports=validateEmployeeDateInput
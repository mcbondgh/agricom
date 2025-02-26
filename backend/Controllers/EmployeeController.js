const DbConfig=require('../configs/DbConfig')
const db=new DbConfig()
class EmployeeController{
    constructor(){

    }
   
   async saveEmployeeDetails(employeeDataDto){
    try{
        console.log(employeeDataDto)
    const otherNameValue = employeeDataDto.getOther_name();
const other_name = otherNameValue !== undefined ? otherNameValue : null;
const commentsValue = employeeDataDto.getComments();
const comments = commentsValue !== undefined ? commentsValue : null;
    console.log("employee details "+employeeDataDto.getEmployee_id(),employeeDataDto.getFirst_name(),employeeDataDto.getLast_name())
    const connection=await db.getConnection()
    await connection.execute(`INSERT INTO EMPLOYEES(EMPLOYEE_id, 
        first_name,last_name,other_name,email_address, digital_address,gender,
        mobile_numbe,location,date_of_employment,date_created,
        status,is_deleted,salary,comments)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[employeeDataDto.getEmployee_id(),employeeDataDto.getFirst_name(),employeeDataDto.getLast_name(),
            other_name,employeeDataDto.getEmail_address(),employeeDataDto.getDigital_address(),
            employeeDataDto.getGender(),employeeDataDto.getMobile_numb(),employeeDataDto.getLocation(),employeeDataDto.getDate_of_employment(),
            employeeDataDto.getDate_created(),employeeDataDto.getStatus(),false,employeeDataDto.getSalary(),comments
        ])
    }catch(err){
      throw err
    }
    
    }
}
module.exports=EmployeeController
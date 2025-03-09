const DbConfig=require('../configs/DbConfig')
const EmployeeDataDto=require('../Dto/EmployeeDataDto')
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
    
     async getAllEmployees() {
       
        const allEmployees=[]
        try{
         const connection=await db.getConnection()
         const [allEmployess]=await connection.execute("SELECT * FROM EMPLOYEES")
         allEmployess.forEach((employee)=>{
            const employeeDataDto=new EmployeeDataDto()
            employeeDataDto.setEmployee_id(employee.EMPLOYEE_id)
            employeeDataDto.setFirst_name(employee.first_name)
            employeeDataDto.setLast_name(employee.last_name)
            employeeDataDto.setEmail_address(employee.email_address)
            employeeDataDto.setDigital_address(employee.digital_address)
            employeeDataDto.setGender(employee.gender)
            employeeDataDto.setMobile_numb(employee.mobile_numbe)
            employeeDataDto.setLocation(employee.location)
            employeeDataDto.setDate_of_employment(employee.date_of_employment)
            employeeDataDto.setDate_created(employee.date_created)
            employeeDataDto.setSalary(employee.salary)
             allEmployees.push(employeeDataDto)
         })
         connection.end()
        }catch(err){
            throw err
        }
       
        return allEmployees
    }
    async updateEmployeeDetails(employeeObject) {
            const connection=await db.getConnection()
            if(employeeObject.getAge()!==null){
              await connection.execute(`update employees set age=? where EMPLOYEE_id=?`,[employeeObject.getAge(),employeeObject.getEmployee_id()])
            }
            if(employeeObject.getComments()!==null){
              await connection.execute(`update employees set comments=? where EMPLOYEE_id=?`,[employeeObject.getComments(),employeeObject.getEmployee_id()])
            }
            if(employeeObject.getEmail_address()!==null){
              await connection.execute(`update employees set email_address=? where EMPLOYEE_id=?`,[employeeObject.getEmail_address(),employeeObject.getEmployee_id()])
            }
            if(employeeObject.getDigital_address()!==null){
              await connection.execute(`update employees set digital_address=? where EMPLOYEE_id=?`,[employeeObject.getDigital_address(),employeeObject.getEmployee_id()])
            }
            if(employeeObject.getMobile_numb()!==null){
              await connection.execute(`update employees set mobile_numbe=? where EMPLOYEE_id=?`,[employeeObject.getMobile_numb(),employeeObject.getEmployee_id()])
            }
            if(employeeObject.getLocation()!==null){
              await connection.execute(`update employees set location=? where EMPLOYEE_id=?`,[employeeObject.getLocation(),employeeObject.getEmployee_id()])
            }
            if(employeeObject.getSalary()!==null){
              await connection.execute(`update employees set salary=? where FARMER_ID=?`,[employeeObject.getSalary(),employeeObject.getEmployee_id()])
            }

    }
    async delete_employee(employeeId) {
      const connection=await db.getConnection()
      await connection.execute("update employees set IS_DELETED=? where EMPLOYEE_id=?",[true,employeeId])
    }
}
module.exports=EmployeeController
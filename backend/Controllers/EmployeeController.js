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
              await connection.execute(`update employees set age=?,comments=?,email_address=?,digital_address=?,
                mobile_numbe=?,location=?,salary=? where EMPLOYEE_id=?`,
                [employeeObject.getAge(),employeeObject.getComments(),employeeObject.getEmail_address(),
                  employeeObject.getDigital_address(),employeeObject.getMobile_numb(),employeeObject.getLocation(),
                  employeeObject.getSalary(),employeeObject.getEmployee_id()])

    }
    async delete_employee(employeeId) {
      const connection=await db.getConnection()
      await connection.execute("update employees set IS_DELETED=?,date_deleted=? where EMPLOYEE_id=?",[true,new Date(Date.now()),employeeId])
    }
    async getEmployee(employeeId){
      const connection=await db.getConnection()
      const user=await connection.execute("select*from employees where EMPLOYEE_id=?",[employeeId])
      return user
    }
}
module.exports=EmployeeController

class EmployeeDataDto{
    EMPLOYEE_id
    first_name
    last_name 
    other_name
    email_address 
    digital_address
    gender
    mobile_numbe
    location
    date_of_employment 
    date_created 
    status
    is_deleted 
    date_modified
    date_deleted
    salary 
    comments
    status
    age
    constructor(EMPLOYEE_id,first_name,last_name,other_name,email_address,digital_address,gender,mobile_numbe,
        location,date_of_employment,date_created,salary,status,comments){
            this.EMPLOYEE_id=EMPLOYEE_id
            this.first_name=first_name
            this.last_name=last_name 
            this.other_name=other_name
            this.email_address=email_address 
            this.digital_address=digital_address
            this.gender=gender
            this.mobile_numbe=mobile_numbe
            this.location=location
            this.date_of_employment=date_of_employment
            this.date_created=date_created 
            this.salary=salary
            this.status=status
            this.comments=comments

    }
    getAge(){
        this.age=age
    }
    setAge(age){
        this.age=age
    }
    getComments(){
        return this.comments
    }
    setComments(comments){
        this.comments=comments
    }
    getEmployee_id(){
        return this.EMPLOYEE_id
    }
    setEmployee_id(EMPLOYEE_id){
        this.EMPLOYEE_id=EMPLOYEE_id
    }
    getFirst_name(){
        return this.first_name
    }
    setFirst_name(first_name){
        this.first_name=first_name
    }
    getLast_name(){
        return this.last_name
    }
    setLast_name(last_name){
        this.last_name=last_name
    }
    getOther_name(){
        return this.other_name
    }
    setOther_name(other_name){
        this.other_named=other_name
    }
    getEmail_address(){
        return this.email_address
    }
    setEmail_address(email_address){
        this.email_address=email_address
    }
    getDigital_address(){
        return this.digital_address
    }
    setDigital_address(digital_address){
        this.digital_address=digital_address
    }
    getGender(){
        return this.gender
    }
    setGender(gender){
        this.gender=gender
    }
    getMobile_numb(){
        return this.mobile_numbe
    }
    setMobile_numb(mobile_numb){
        this.mobile_numbe=mobile_numb
    }
    getLocation(){
        return this.location
    }
    setLocation(location){
        this.location=location
    }
    getDate_of_employment(){
        return this.date_of_employment
    }
    setDate_of_employment(date_of_employment){
        this.date_of_employment=date_of_employment
    }
    getDate_created(){
        return this.date_created
    }
    setDate_created(date_created){
        this.Date_created=date_created
    }
    getSalary(){
        return this.salary
    }
    setSalary(salary){
        this.salary=salary
    }
    getStatus(){
        return this.status
    }
    setStatus(status){
        this.status=status
    }
}
module.exports=EmployeeDataDto
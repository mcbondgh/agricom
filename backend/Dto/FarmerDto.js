class FarmersDto {
    farmer_Id
<<<<<<< HEAD
    first_name
=======
>>>>>>> eb3524e93a46e0b4a04dd443f6651375b98d003a
    surname
    lastname
    gender
    age
<<<<<<< HEAD
    contact_details
=======
    contract_details
>>>>>>> eb3524e93a46e0b4a04dd443f6651375b98d003a
    residential_address
    farming_experience
    educational_level
    farm_gps_cordinate
    login_id
    is_active
    is_deleted
    date_created
    farm_association_memb
<<<<<<< HEAD
    constructor(farmer_Id,first_name, surname, lastname, gender, age,
        contact_details, residential_address,
        farming_experience, educational_level, farm_gps_cordinate, login_id, is_active, is_deleted, date_created, farm_association_memb) {
        this.farmer_Id = farmer_Id
        this.first_name=first_name
=======
    constructor(farmer_Id, surname, lastname, gender, age,
        contract_details, residential_address,
        farming_experience, educational_level, farm_gps_cordinate, login_id, is_active, is_deleted, date_created, farm_association_memb) {
        this.farmer_Id = farmer_Id
>>>>>>> eb3524e93a46e0b4a04dd443f6651375b98d003a
        this.surname = surname
        this.lastname = lastname
        this.gender = gender
        this.age = age
<<<<<<< HEAD
        this.contact_details = contact_details
=======
        this.contract_details = contract_details
>>>>>>> eb3524e93a46e0b4a04dd443f6651375b98d003a
        this.educational_level = educational_level
        this.farm_gps_cordinate = farm_gps_cordinate
        this.farming_experience = farming_experience
        this.residential_address = residential_address
        this.login_id = login_id
        this.is_active = is_active
        this.is_deleted = is_deleted
        this.date_created = date_created
        this.farm_association_memb=farm_association_memb
    }
    getFarmerId() {
        return this.farmer_Id
    }
<<<<<<< HEAD
    getFirstName(){
        return this.first_name
    }
    setFirstName(first_name){
        this.first_name=first_name
    }
=======
>>>>>>> eb3524e93a46e0b4a04dd443f6651375b98d003a
    setFrmerID(farmerId) {
        this.farmer_Id = farmerId
    }
    getSurname() {
        return this.surname
    }
    setSurname(surname) {
        this.surname = surname
    }
    getLastname() {
        return this.lastname
    }
    setLastname(lastname) {
        this.lastname = lastname
    }
    getGender() {
        return this.gender
    }
    setGender(gender) {
        this.gender = gender
    }
    getAge() {
        return this.age
    }
    setAge(age) {
        this.age = age
    }
<<<<<<< HEAD
    getcontact_details() {
        return this.contact_details
    }
    setcontact_details(contact_details) {
        this.contact_details = contact_details
=======
    getContract_details() {
        return this.contract_details
    }
    setContract_details(contract_details) {
        this.contract_details = contract_details
>>>>>>> eb3524e93a46e0b4a04dd443f6651375b98d003a
    }
    getEducational_level() {
        return this.educational_level
    }
    setEducational_level(educational_level) {
        this.educational_level = educational_level
    }
    getFarm_gps_cordinate() {
        return this.farm_gps_cordinate
    }
    setFarm_gps_cordinate(farm_gps_cordinate) {
<<<<<<< HEAD
        this.farm_gps_cordinate = farm_gps_cordinate
=======
        this.ffarm_gps_cordinate = farm_gps_cordinate
>>>>>>> eb3524e93a46e0b4a04dd443f6651375b98d003a
    }
    getFarming_experience() {
        return this.farming_experience
    }
    setFarming_experience(farming_experience) {
        this.farming_experience = farming_experience
    }
    getResidential_address() {
        return this.residential_address
    }
    setResidential_address(residential_address) {
        this.residential_address = residential_address
    }
    getLogin_id() {
        return this.login_id
    }
    setLogin_id(login_id) {
        this.login_id = login_id
    }
    getIs_active() {
        return this.is_active
    }
    setIs_active(is_active) {
        this.is_active = is_active
    }
    getIs_deleted() {
        return this.is_deleted
    }
    setIs_deleted(is_deleted) {
        this.is_deleted = is_deleted
    }
    getDate_created() {
        return this.date_created
    }
    setDate_created(date_created) {
        this.date_created = date_created
    }
    getFarm_association_memb() {
        return this.farm_association_memb
    }
    setFarm_association_memb(farm_association_memb) {
        this.farm_association_memb = farm_association_memb
    }

}
module.exports = FarmersDto
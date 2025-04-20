class FarmersDto {
    farmer_Id
    first_name
    surname
    lastname
    gender
    age
    contact_details
    residential_address
    farming_experience
    education_level
    farm_gps_coordinates
    login_id
    is_active
    is_deleted
    date_created
    farm_association_memb
    farm_location
    farming_practice
    harvest_dates
    mechanization
    revenue
    soil_type
    market_prices
    yield_per_acre
    land_size
    crop_type
    farm_id
    constructor(farmer_Id,first_name, surname, lastname, gender, age,
        contact_details, residential_address,
        farming_experience, education_level, farm_gps_coordinates, login_id, is_active, is_deleted, date_created, farm_association_memb) {
        this.farmer_Id = farmer_Id
        this.first_name=first_name
        this.surname = surname
        this.lastname = lastname
        this.gender = gender
        this.age = age
        this.contact_details = contact_details
        this.education_level = education_level
        this.farm_gps_coordinates = farm_gps_coordinates
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
    getFirstName(){
        return this.first_name
    }
    setFirstName(first_name){
        this.first_name=first_name
    }
    setFrmerID(farmerId) {
        this.farmer_Id = farmerId
    }
    getSurname() {
        return this.surname
    }
    setFarmLocation(farm_location) {
        this.farm_location = farm_location
    }
    getFarmLocation() {
        return this.farm_location
    }
    setFarm_id(farm_id) {
        this.farm_id = farm_id
    }
    getFarm_id() {
        return this.farm_id
    }
    setRevenue(revenue) {
        this.revenue = revenue
    }
    getRevenue() {
        return this.revenue
    }
    setYield_per_acre(yield_per_acre) {
        this.yield_per_acre = yield_per_acre
    }
    getYield_per_acre() {
        return this.yield_per_acre
    }
    setSoil_type(soil_type) {
        this.soil_type = soil_type
    }
    getSoil_type() {
        return this.soil_type
    }
    setMechanization(mechanization) {
        this.mechanization = mechanization
    }
    getMechanizations() {
        return this.mechanization
    }
    setHarvest_dates(harvest_dates) {
        this.harvest_dates = harvest_dates
    }
    getHarvest_dates() {
        return this.harvest_dates
    }
    setCrop_type(crop_type) {
        this.crop_type = crop_type
    }
    getCrop_type() {
        return this.crop_type
    }
    setLand_size(land_size) {
        this.land_size = land_size
    }
    getLand_size() {
        return this.land_size
    }
    setMarket_prices(market_prices) {
        this.market_prices = market_prices
    }
    getMarket_prices() {
        return this.market_prices
    }
    getFarming_practice() {
        return this.farming_practice
    }
    setFarming_practice(farming_practice) {
        this.farming_practice = farming_practice
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
    getcontact_details() {
        return this.contact_details
    }
    setcontact_details(contact_details) {
        this.contact_details = contact_details
    }
    getEducation_level() {
        return this.education_level
    }
    setEducation_level(education_level) {
        this.education_level = education_level
    }
    getFarm_gps_coordinates() {
        return this.farm_gps_coordinates
    }
    setFarm_gps_coordinates(farm_gps_coordinates) {
        this.farm_gps_coordinates = farm_gps_coordinates
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
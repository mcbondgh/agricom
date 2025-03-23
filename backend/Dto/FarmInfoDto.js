class FarmInfoDto{
    farm_id
    land_size
    farm_location
    crop_type 
    soil_type
    farming_practice
    mechanization
    farmer_id
    constructor(farm_id,land_size,farm_location,crop_type,soil_type,farming_practice,mechanization,farmer_id){
        this.farm_id=farm_id
        this.land_size=land_size
        this.farm_location=farm_location
        this.crop_type=crop_type
        this.soil_type=soil_type
        this.farming_practice=farming_practice
        this.mechanization=mechanization
        this.farmer_id=farmer_id
    }
    getFarm_id(){
        return this.farm_id
    }
    setFarm_id(farm_id){
        this.farm_id=farm_id
    }
    getLand_size(){
        return this.land_size
    }
    setLand_size(land_size){
        this.land_size=land_size
    }
    getFarm_location(){
        return this.farm_location
    }
    setFarm_location(farm_location){
        this.farm_location=farm_location
    }
    getCrop_type(){
        return this.crop_type
    }
    setCrop_type(crop_type){
        this.crop_type=crop_type
    }
    getSoil_type(){
        return this.soil_type
    }
    setSoil_type(soil_type){
        this.soil_type=soil_type
    }
    getFarming_practice(){
        return this.farming_practice
    }
    setFarming_practice(farming_practice){
        this.farming_practice=farming_practice
    }
    getMechanization(){
        return this.mechanization
    }
    setMechanization(mechanization){
        this.mechanization=mechanization
    }
    getFarmer_id(){
        return this.farmer_id
    }
    setMechanization(farmer_id){
        this.farmer_id=farmer_id
    }
}
module.exports=FarmInfoDto
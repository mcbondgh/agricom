const DbConfig=require('../configs/DbConfig')
const FarmersDto=require('../Dto/FarmerDto')
const db=new DbConfig()
class FarmerController{
    constructor(){

    }
    
    async saveFarmerInformation(farmerDto){
     try{
      const connection=await db.getConnection()
      await connection.execute(`INSERT INTO FARMER(FARMER_ID,SURNAME,LAST_NAME,
        GENDER,AGE,CONTACT_DETAILS
        ,RESIDENTIAL_ADDRESS,FARMING_EXPERIENCE,EDUCATION_LEVEL,FARM_GPS_CORDINATES,
        FARM_ASSOCIATION_MEMB,LOGIN_ID,IS_ACTIVE,IS_DELETED,DATE_CREATED)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
       [farmerDto.getFarmerId(),farmerDto.getSurname(),farmerDto.getLastname(),farmerDto.getGender(),
        farmerDto. getAge(),farmerDto.getContract_details(),farmerDto.getResidential_address(),farmerDto.getFarming_experience(),
        farmerDto.getEducational_level(),farmerDto.getFarm_gps_cordinate(),farmerDto.getFarm_association_memb(),farmerDto. getLogin_id(),
        farmerDto.getIs_active(),farmerDto.getIs_deleted(),farmerDto.getDate_created()
       ])
    
      connection.end()
     }catch(err){
      throw new Error(err) 
     }
  
    }
    async getAllFarmers(){
      const allFarmers=[]
      const connection=await db.getConnection()
      const [farmers]=await connection.execute("select*from farmer")
      farmers.forEach((farmer)=>{
      const farmersDto=new FarmersDto()
      farmersDto.setFrmerID(farmer.FARMER_ID)
      farmersDto.setSurname(farmer.SURNAME)
      farmersDto.setGender(farmer.GENDER)
      farmersDto.setLastname(farmer.LAST_NAME)
      farmersDto.setAge(farmer.AGE)
      farmersDto.setContract_details(farmer.CONTACT_DETAILS)
      farmersDto.setResidential_address(farmer.RESIDENTIAL_ADDRESS)
      farmersDto.setFarming_experience(farmer.FARMING_EXPERIENCE)
      farmersDto.setEducational_level(farmer.EDUCATION_LEVEL)
      farmersDto.setFarm_gps_cordinate(farmer.FARM_GPS_CORDINATES)
      farmersDto.setFarm_association_memb(farmer.FARM_ASSOCIATION_MEMB)
      farmersDto.setDate_created(farmer.DATE_CREATED)
      allFarmers.push(farmersDto)
      })
      return allFarmers
    }
    async updateFarmer(farmerUpdate){
      const connection=await db.getConnection()
        await connection.execute(`update farmer set AGE=?,RESIDENTIAL_ADDRESS=?,
          CONTACT_DETAILS=?,FARMING_EXPERIENCE=?,EDUCATION_LEVEL=?,FARM_GPS_CORDINATES=?,FARM_ASSOCIATION_MEMB=? where FARMER_ID=?` 
          ,[farmerUpdate.getAge(),farmerUpdate.getResidential_address(),farmerUpdate.getContract_details()
            ,farmerUpdate.getFarming_experience(),farmerUpdate.getEducational_level(),
            farmerUpdate.getFarm_gps_cordinate(),farmerUpdate.getFarm_association_memb(),farmerUpdate.getFarmerId()])
     
    }
    async deleteFamer(farmerId){
     const connection=await db.getConnection()
     await connection.execute("update farmer set IS_DELETED=? where FARMER_ID=?",[true,farmerId])
    }
}
module.exports=FarmerController
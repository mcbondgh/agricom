const DbConfig=require('../configs/DbConfig')
const FarmersDto=require('../Dto/FarmerDto')
const db=new DbConfig()
class FarmerController{
    constructor(){

    }
    
    async saveFarmerInformation(farmerDto){
     try{
      const connection=await db.getConnection()
      await connection.execute(`INSERT INTO FARMER(FARMER_ID,firstName,SURNAME,LAST_NAME,
        GENDER,AGE,CONTACT_DETAILS
        ,RESIDENTIAL_ADDRESS,FARMING_EXPERIENCE,EDUCATION_LEVEL,FARM_GPS_CORDINATES,
        FARM_ASSOCIATION_MEMB,LOGIN_ID,IS_ACTIVE,IS_DELETED,DATE_CREATED)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
       [farmerDto.getFarmerId(),farmerDto.getFirstName(),farmerDto.getSurname(),farmerDto.getLastname(),farmerDto.getGender(),
        farmerDto. getAge(),farmerDto.getcontact_details(),farmerDto.getResidential_address(),farmerDto.getFarming_experience(),
        farmerDto.getEducational_level(),farmerDto.getFarm_gps_cordinate(),farmerDto.getFarm_association_memb(),farmerDto. getLogin_id(),
        farmerDto.getIs_active(),farmerDto.getIs_deleted(),farmerDto.getDate_created()
       ])
     }catch(err){
      throw new Error(err) 
     }
  
    }
    async saveFarmInformation(farmInfoDto){
      try{
         const connection=await db.getConnection()
         await connection.execute(`INSERT INTO farm(FARM_ID, LAND_SIZE, FARM_LOCATION, CROP_TYPE, SOIL_TYPE, 
          FARMING_PRACTICE, MECHANIZATION, FARMER_ID)VALUES(?,?,?,?,?,?,?,?)`,
          [farmInfoDto.getFarm_id(),farmInfoDto.getLand_size(),farmInfoDto.getFarm_location(),farmInfoDto.getCrop_type(),
            farmInfoDto.getSoil_type(),farmInfoDto.getFarming_practice(),farmInfoDto.getMechanization(),farmInfoDto.getFarmer_id()
          ])
      }catch(err){
        throw new Error(err)
      }
    }
    async saveYieldInfo(yieldInfo){
     try{
        const connection=await db.getConnection()
        await connection.execute(`INSERT INTO yield(YIELD_ID,HARVEST_DATE,YIELD_PER_ACRE,MARKET_PRICES,REVENUE,FARM_ID)VALUES(?,?,?,?,?,?)`,
          [yieldInfo.getYield_id(),yieldInfo.getHarvest_date(),yieldInfo.getYield_per_acre(),yieldInfo.getMarket_prices(),
            yieldInfo.getRevenue(),yieldInfo.getFarm_id()]
        )
     }catch(err){
      throw new Error(err)
     }
    }
    async getAllFarmers(){
      const allFarmers=[]
      const connection=await db.getConnection()
      const [farmers]=await connection.execute("select*from farmer where IS_DELETED=?",[false])
      const [farm]=await connection.execute("select*from farm")
      const [yields]=await connection.execute("select*from yield")
      for(let i=0;i<farmers.length;i++){
        for(let j=0;j<farm.length;j++){
          if(farmers[i].FARMER_ID===farm[j].FARMER_ID){
            for(let y=0;y<yields.length;y++){
              if(farm[j].FARM_ID===yields[y].FARM_ID){
                const farmersDto=new FarmersDto()
                farmersDto.setFrmerID(farmers[i].FARMER_ID)
                farmersDto.setSurname(farmers[i].SURNAME)
                farmersDto.setGender(farmers[i].GENDER)
                farmersDto.setLastname(farmers[i].LAST_NAME)
                farmersDto.setFirstName(farmers[i].firstName)
                farmersDto.setAge(farmers[i].AGE)
                farmersDto.setcontact_details(farmers[i].CONTACT_DETAILS)
                farmersDto.setResidential_address(farmers[i].RESIDENTIAL_ADDRESS)
                farmersDto.setFarming_experience(farmers[i].FARMING_EXPERIENCE)
                farmersDto.setEducation_level(farmers[i].EDUCATION_LEVEL)
                farmersDto.setFarm_gps_coordinates(farmers[i].FARM_GPS_CORDINATES)
                farmersDto.setFarm_association_memb(farmers[i].FARM_ASSOCIATION_MEMB)
                farmersDto.setDate_created(farmers[i].DATE_CREATED)
                farmersDto.setFarmLocation(farm[j].FARM_LOCATION)
                farmersDto.setFarming_practice(farm[j].FARMING_PRACTICE)
                farmersDto.setCrop_type(farm[j].CROP_TYPE)
                farmersDto.setHarvest_dates(yields[y].HARVEST_DATE)
                farmersDto.setLand_size(farm[j].LAND_SIZE)
                farmersDto.setMarket_prices(yields[y].MARKET_PRICES)
                farmersDto.setRevenue(yields[y].REVENUE)
                farmersDto.setMechanization(farm[j].MECHANIZATION)
                farmersDto.setSoil_type(farm[j].SOIL_TYPE)
                farmersDto.setYield_per_acre(yields[y].YIELD_PER_ACRE)
                farmersDto.setIs_active(farmers[i].IS_ACTIVE)
                allFarmers.push(farmersDto)
                break
              }
            }
           break 
          }
        }
      
      }
      return allFarmers
    }
    async updateFarmer(farmerUpdate){
      const connection=await db.getConnection()
        await connection.execute(`update farmer set AGE=?,RESIDENTIAL_ADDRESS=?,
          CONTACT_DETAILS=?,FARMING_EXPERIENCE=?,EDUCATION_LEVEL=?,FARM_GPS_CORDINATES=?,FARM_ASSOCIATION_MEMB=? where FARMER_ID=?` 
          ,[farmerUpdate.getAge(),farmerUpdate.getResidential_address(),farmerUpdate.getcontact_details()
            ,farmerUpdate.getFarming_experience(),farmerUpdate.getEducation_level(),
            farmerUpdate.getFarm_gps_coordinates(),farmerUpdate.getFarm_association_memb(),farmerUpdate.getFarmerId()])
          await connection.execute(`update farm set LAND_SIZE=?,FARM_LOCATION=?,CROP_TYPE=?,SOIL_TYPE=?,
            FARMING_PRACTICE=?,MECHANIZATION=? where FARMER_ID=?`,[farmerUpdate.getLand_size(),farmerUpdate.getFarmLocation(),
              farmerUpdate.getCrop_type(),farmerUpdate.getSoil_type(),farmerUpdate.getFarming_practice(),farmerUpdate.getMechanizations(),farmerUpdate.getFarmerId()
            ])
            await connection.execute(`update yield set HARVEST_DATE=?,YIELD_PER_ACRE=?,MARKET_PRICES=?,REVENUE=? where FARM_ID=?`,
              [farmerUpdate.getHarvest_dates() ,farmerUpdate.getYield_per_acre(),farmerUpdate.getMarket_prices(),farmerUpdate.getRevenue(),farmerUpdate.getFarm_id()]
            )
    }
    async deleteFamer(farmerId){
     const connection=await db.getConnection()
     await connection.execute("update farmer set IS_DELETED=? where FARMER_ID=?",[true,farmerId])
    }
}
module.exports=FarmerController
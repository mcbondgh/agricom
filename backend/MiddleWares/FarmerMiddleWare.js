 const Joi=require('joi')
 const DbConfig=require('../configs/DbConfig')
 const FarmerController=require('../Controllers/FarmerController')
 const FarmersDto=require('../Dto/FarmerDto')
 const FarmInfoDto=require('../Dto/FarmInfoDto')
 const YieldInfo=require('../Dto/YieldInfo')
 const crypto=require('crypto')
 const session=require('express-session')
 // joi schema to validate inputes
 const farmerSchema=Joi.object({
    surname:Joi.string().required(),
    last_name:Joi.string(),
    gender:Joi.string().required(),
    age:Joi.number().integer().required(),
    contact_details:Joi.string().required(),
    residential_address:Joi.string().required(),
    farming_experience:Joi.string().required(),
    education_level:Joi.string().required(),
    farm_gps_coordinates:Joi.string().required(),
    farm_association_memb:Joi.string().required(),
    first_name:Joi.string().required(),
    land_size:Joi.string().required(),
    farm_location:Joi.string().required(),
    crop_type:Joi.string().required(),
    soil_type:Joi.string().required(),
    farming_practice:Joi.string().required(),
    mechanization:Joi.string().required(),
    harvest_dates:Joi.string().required(),
    yield_per_acre:Joi.string().required(),
    market_prices:Joi.string().required(),
    revenue:Joi.string().required(),
 })
 // creating data base object
 const db=new DbConfig()
 // creating FarmerController object
 const farmerController=new FarmerController()
 async function validateFarmInfo(req,res,next) {
    const farm_id=crypto.randomInt(0,100000)
    const farmer_id=req.session.farmer_id
    farmerController.saveFarmInformation(new FarmInfoDto(farm_id,req.body.land_size,req.body.farm_location,req.body.crop_type,
        req.body.soil_type,req.body.farming_practice,req.body.mechanization,farmer_id
    ))
    req.session.farm_id=farm_id
    next()
 }
 async function validateYieldInfo(req,res,next) {
    const yield_id=crypto.randomInt(0,100000)
    const farm_id=req.session.farm_id
    farmerController.saveYieldInfo(new YieldInfo(yield_id,req.body.harvest_dates,req.body.yield_per_acre,
        req.body.market_prices,req.body.revenue,farm_id))
        next()
 }
 async function validateFarmerInput(req,res,next) {
    const contact=req.body.contact_details
 try{
    const connection=await db.getConnection()
    // checking to see if this farmer already exist
    const [existFarmer]=await connection.execute('select * from farmer where contact_details=? && IS_DELETED=?',[contact,true])
    if(existFarmer.length>0){
        console.log({msg:`Farmer with id ${contact} already exist`})
        return res.send({msg:`Farmer with id ${contact} already exist`})
    }else{
        const {error}=farmerSchema.validate(req.body)
        if(error){
            console.log({msg:error.details[0].message})
            return res.send({msg:error.details[0].message})
        }else{
            console.log(req.body.contact_details)
            const lastnameValue =req.body.last_name;
         const lastname = lastnameValue !== undefined ? lastnameValue : null;
            const farmer_id=crypto.randomInt(0,1000)
            // calling controller method to save farmer details into the database
            farmerController.saveFarmerInformation(new FarmersDto(farmer_id,req.body.first_name,req.body.surname,lastname,
                req.body.gender,req.body.age,req.body.contact_details,
                req.body.residential_address,req.body.farming_experience,req.body.education_level,req.body.farm_gps_coordinates,1,
                true,false,new Date(Date.now()),req.body.farm_association_memb))
                req.session.farmer_id=farmer_id
            next()
        }
    }
    connection.end()
 }catch(err){
console.log(err)
 }
 
 }
 async function updateMiddleware(req,res,next) {
   try{
     const farmer_Id=req.params.farmer_Id
     const connection=await db.getConnection()
     const [existFarmer]=await connection.execute('select farmer_id from farmer where farmer_id=?',[farmer_Id])
     if(existFarmer.length>0){
      const farmerObject=new FarmersDto()
      const ageValue=req.body.age
      const age=ageValue!==undefined?ageValue:'N/A'
      const contact_detailsVlue=req.body.contact_details
      const contact_details=contact_detailsVlue!==undefined?contact_detailsVlue:'N/A'
      const farming_experienceValue=req.body.farming_experience
      const farming_experience=farming_experienceValue!==undefined?farming_experienceValue:'N/A'
      const educational_levelValue=req.body.educational_level
      const educational_level=educational_levelValue!==undefined?educational_levelValue:'N/A'
      const farm_gps_cordinateValue=req.body.farm_gps_cordinate
      const farm_gps_cordinate=farm_gps_cordinateValue!==undefined?farm_gps_cordinateValue:'N/A'
      const farm_association_membValue=req.body.farm_association_memb
      const farm_association_memb=farm_association_membValue!==undefined?farm_association_membValue:'N/A'
      const residential_addressValue=req.body.residential_address
      const residential_address=residential_addressValue!==undefined?residential_addressValue:'N/A'
      farmerObject.setAge(age)
      farmerObject.setcontact_details(contact_details)
      farmerObject.setFarming_experience(farming_experience)
      farmerObject.setEducational_level(educational_level)
      farmerObject.setFarm_gps_cordinate(farm_gps_cordinate)
      farmerObject.setFarm_association_memb(farm_association_memb)
      farmerObject.setResidential_address(residential_address)
      farmerObject.setFrmerID(farmer_Id)
     farmerController.updateFarmer(farmerObject)
      next()
     }else{
        return res.send({msg:"This farmer already exist"})
     }
     connection.end()
   }catch(err){
    console.log(err)
   }
 }
 async function deleteFarmerMiddleware(req,res,next) {
    const farmerIdValue=req.params.farmerId
    const connection=await db.getConnection()
    const [existFarmer]=await connection.execute("select*from farmer where farmer_id=? and IS_DELETED=?",[farmerIdValue,false])
    if(existFarmer.length>0){
        farmerController.deleteFamer(farmerIdValue)
        next()
    }else{
     res.send({msg:`farmer with id ${farmerIdValue} is not registered`})
    }
    
   
 }
 module.exports={validateFarmerInput,updateMiddleware,deleteFarmerMiddleware,validateFarmInfo,validateYieldInfo}
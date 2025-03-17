 const Joi=require('joi')
 const DbConfig=require('../configs/DbConfig')
 const FarmerController=require('../Controllers/FarmerController')
 const FarmersDto=require('../Dto/FarmerDto')
 // joi schema to validate inputes
 const farmerSchema=Joi.object({
    farmer_Id:Joi.number().integer().required(),
    surname:Joi.string().required(),
    lastname:Joi.string().required(),
    gender:Joi.string().required(),
    age:Joi.number().integer().required(),
    contract_details:Joi.string().required(),
    residential_address:Joi.string().required(),
    farming_experience:Joi.string().required(),
    educational_level:Joi.string().required(),
    farm_gps_cordinate:Joi.string().required(),
    farm_association_memb:Joi.string().required()
 })
 // creating data base object
 const db=new DbConfig()
 // creating FarmerController object
 const farmerController=new FarmerController()
 async function validateFarmerInput(req,res,next) {
    const farmer_id=req.body.farmer_Id
 try{
    const connection=await db.getConnection()
    // checking to see if this farmer already exist
    const [existFarmer]=await connection.execute('select farmer_id from farmer where farmer_id=?',[farmer_id])
    if(existFarmer.length>0){
        return res.send({msg:`Farmer with id ${farmer_id} already exist`})
    }else{
        const {error}=farmerSchema.validate(req.body)
        if(error){
            return res.send({msg:error.details[0].message})
        }else{
            // calling controller method to save farmer details into the database
            farmerController.saveFarmerInformation(new FarmersDto(req.body.farmer_Id,req.body.surname,req.body.lastname,
                req.body.gender,req.body.age,req.body.contract_details,
                req.body.residential_address,req.body.farming_experience,req.body.educational_level,req.body.farm_gps_cordinate,1,
                true,false,new Date(Date.now()),req.body.farm_association_memb))
            next()
        }
    }
    connection.end()
 }catch(err){
console.log(err)
 }
 
 }
 module.exports=validateFarmerInput
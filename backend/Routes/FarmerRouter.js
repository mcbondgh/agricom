const express=require('express')
const {updateMiddleware,validateFarmerInput,deleteFarmerMiddleware,validateFarmInfo,validateYieldInfo}=require('../MiddleWares/FarmerMiddleWare')
const FarmerController=require('../Controllers/FarmerController')
const farmerRouter=express.Router()
farmerRouter.post("/agricom/farmers/register",validateFarmerInput,validateFarmInfo,validateYieldInfo,(req,res)=>{
    console.log({msg:"created"})
    res.status(200).json({success:true,
        message:req.body.surname+" "+req.body.first_name+" registered successfully",
        farmer:{
             surname:req.body.surname,
                last_name:req.body.last_name,
                gender:req.body.last_name,
                age:req.body.last_name,
                contact_details:req.body.last_name,
                residential_address:req.body.last_name,
                farming_experience:req.body.last_name,
                education_level:req.body.last_name,
                farm_gps_coordinates:req.body.last_name,
                farm_association_memb:req.body.last_name,
                first_name:req.body.last_name
        }
    })
})
farmerRouter.put("/agricom/farmers/:farmer_Id",updateMiddleware,(req,res)=>{ 
    res.send({msg:"farmer updated"})
})
farmerRouter.get("/agricom/farmers",(req,res)=>{
    const farmerController=new FarmerController()
    farmerController.getAllFarmers().then((farmers)=>{
        res.status(200).json(farmers)
    })
    })
farmerRouter.delete("/agricom/farmers/:farmerId",deleteFarmerMiddleware,(req,res)=>{ 
    res.json({success:true,message:"Farmer soft deleted"})
})
module.exports=farmerRouter
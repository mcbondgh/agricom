const express=require('express')
<<<<<<< HEAD
const {updateMiddleware,validateFarmerInput,deleteFarmerMiddleware,validateFarmInfo,validateYieldInfo}=require('../MiddleWares/FarmerMiddleWare')
const FarmerController=require('../Controllers/FarmerController')
const farmerRouter=express.Router()
farmerRouter.post("/agricomfarms/agrocom/registerfarmer",validateFarmerInput,validateFarmInfo,validateYieldInfo,(req,res)=>{
    console.log({msg:"created"})
    res.send({msg:`created`})
})
farmerRouter.post("/agricomfarms/agrocom/updatefarmers/:farmer_Id",updateMiddleware,(req,res)=>{ 
    res.send({msg:"farmer updated"})
})
farmerRouter.get("/agricomfarms/agrocom/getallfarmers",(req,res)=>{
    const farmerController=new FarmerController()
    farmerController.getAllFarmers().then((allFarmers)=>{
        res.send(allFarmers)
    })
    })
farmerRouter.get("/agricomfarms/agrocom/deletefarmer/:farmerId",deleteFarmerMiddleware,(req,res)=>{ 
    res.send({msg:"farmer deleted"})
})
=======
const validateFarmerInput=require('../MiddleWares/FarmerMiddleWare')
const farmerRouter=express.Router()
farmerRouter.post("/agricomfarms/agrocom/registerfarmer",validateFarmerInput,(req,res)=>{
    res.send({msg:`created`})
})
>>>>>>> eb3524e93a46e0b4a04dd443f6651375b98d003a
module.exports=farmerRouter
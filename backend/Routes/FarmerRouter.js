const express=require('express')
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
module.exports=farmerRouter
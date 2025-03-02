const express=require('express')
const validateFarmerInput=require('../MiddleWares/FarmerMiddleWare')
const FarmerController=require('../Controllers/FarmerController')
const farmerRouter=express.Router()
farmerRouter.post("/agricomfarms/agrocom/registerfarmer",validateFarmerInput,(req,res)=>{
    res.send({msg:`created`})
})
farmerRouter.get("/agricomfarms/agrocom/getallfarmers",(req,res)=>{
const farmerController=new FarmerController()
farmerController.getAllFarmers().then((allFarmers)=>{
    res.send(allFarmers)
})

})
module.exports=farmerRouter
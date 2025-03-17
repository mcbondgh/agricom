const express=require('express')
const validateFarmerInput=require('../MiddleWares/FarmerMiddleWare')
const farmerRouter=express.Router()
farmerRouter.post("/agricomfarms/agrocom/registerfarmer",validateFarmerInput,(req,res)=>{
    res.send({msg:`created`})
})
module.exports=farmerRouter
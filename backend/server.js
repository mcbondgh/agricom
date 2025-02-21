require('dotenv').config();
let cors = require('cors');

// initialze the express app
const express = require('express');
const farmerRouter = require('./Routes/FarmerRouter');
const app = express();
app.use(cors());
app.use(express.json())
app.use(farmerRouter)
const PORT_NUMBER = process.env.SERVER_PORT;

//set the port on which application will listen
app.listen(200,(req,res)=>{
    console.log(`${PORT_NUMBER}`)
});
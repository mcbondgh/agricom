require('dotenv').config();
let cors = require('cors');
const session=require('express-session')

// initialze the express app
const express = require('express');
const farmerRouter = require('./Routes/FarmerRouter');
const employeeRouter=require('../backend/Routes/EmployeeRouter')
const app = express();
app.use(session({
    secret:"ibm",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:60000*60
    }
}))
app.use(cors());
app.use(express.json())
app.use(employeeRouter)
app.use(farmerRouter)
const PORT_NUMBER = process.env.SERVER_PORT;

//set the port on which application will listen
app.listen(200,(req,res)=>{
    console.log(`${PORT_NUMBER}`)
});
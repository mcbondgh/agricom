require('dotenv').config();
let cors = require('cors');
const session=require('express-session')

// initialze the express app
const express = require('express');
const passport=require('passport')
const farmerRouter = require('./Routes/FarmerRouter');
const employeeRouter=require('../backend/Routes/EmployeeRouter')
const loginRouter=require("./Routes/servicesRoute")
const app = express();
app.use(session({
    secret:"ibm",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:60000*25
    }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000",
    credentials: true
}))
app.use(employeeRouter)
app.use(farmerRouter)
app.use(loginRouter)
const PORT_NUMBER = process.env.SERVER_PORT;

//set the port on which application will listen
app.listen(3001,(req,res)=>{
    console.log(`${PORT_NUMBER}`)
});
require('dotenv').config();
let cors = require('cors');
<<<<<<< HEAD
const session=require('express-session')

// initialze the express app
const express = require('express');
const passport=require('passport')
const farmerRouter = require('./Routes/FarmerRouter');
const employeeRouter=require('../backend/Routes/EmployeeRouter')
const loginRouter=require("./Routes/servicesRoute");
const { hashPassword } = require('./Services/local-strategy');
const app = express();
app.use(session({
    secret:"ibm",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:60000*60
    }
}))
app.use(passport.initialize())
app.use(passport.session())
=======

// initialze the express app
const express = require('express');
const farmerRouter = require('./Routes/FarmerRouter');
const employeeRouter=require('../backend/Routes/EmployeeRouter')
const app = express();
>>>>>>> eb3524e93a46e0b4a04dd443f6651375b98d003a
app.use(cors());
app.use(express.json())
app.use(employeeRouter)
app.use(farmerRouter)
<<<<<<< HEAD
app.use(loginRouter)

app.post("/logout",(req,res)=>{
    if(req.user){
        req.logout((err)=>{
            if(err){
                res.send(err)
            }else{
                res.send("Logout successfully")
            }
        }
    )
    }else{
        res.send("user not login")
    }
})
=======
>>>>>>> eb3524e93a46e0b4a04dd443f6651375b98d003a
const PORT_NUMBER = process.env.SERVER_PORT;

//set the port on which application will listen
app.listen(200,(req,res)=>{
    console.log(`${PORT_NUMBER}`)
});
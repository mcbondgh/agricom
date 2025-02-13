require('dotenv').config();
let cors = require('cors');

// initialze the express app
const express = require('express');
const app = express();
app.use(cors());
const PORT_NUMBER = process.env.SERVER_PORT;

//set the port on which application will listen
app.listen(PORT_NUMBER);
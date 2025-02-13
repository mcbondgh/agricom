require('dotenv').config();

/*
    A connection object that retuns the connection to the database 
*/

class DbConfig {
    constructor() {
        this.mysql = require('mysql');
    }

    getConnection() {
        return this.mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
    }
}
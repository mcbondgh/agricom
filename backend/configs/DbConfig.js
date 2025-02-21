require('dotenv').config();

/*
    A connection object that retuns the connection to the database 
*/

class DbConfig {
    constructor() {
        this.mysql = require('mysql2/promise');
    }

    getConnection() {
        return this.mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "Zingaro1#",
            database: "agricom_db"
        });
    }
}
module.exports=DbConfig
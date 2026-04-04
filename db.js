const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "ecommerce_db"
});

db.connect((err)  => {
    if(err){
        console.error("Database connection fail!" + err.message);
        return;
    }
    console.log("Connect to Mysql");
});

module.exports(db);
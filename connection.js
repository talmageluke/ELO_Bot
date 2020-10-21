var mysql = require('mysql');
//imports host specifics
const config = require('./config.json');
var con;


//creates sql connection
con = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.pass,
    database: "elo_db",
    port: 3306
});

con.connect(error => {

    if (error) {
        throw error
    }
    console.log("Connected!")

}
);
//exports sql connection
module.exports = con;

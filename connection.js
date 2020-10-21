var mysql = require('mysql');
const config = require('./config.json');
var con;



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

module.exports = con;

var mysql = require('mysql');
require('dotenv').config()
var con;


if (process.env.JAWSDB_URL) {
    con = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    con = mysql.createConnection({
        host: "localhost",
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: "elo_db",
        port: 3306
    });
}
con.connect(error => {

    if (error) {
        throw error
    }
    console.log("Connected!")

}
);

module.exports = con;

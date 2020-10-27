//const con = require("../connection")
//const config = require('../config.json');
//
//
//
//
//module.exports = {
//    name: 'seed',
//    description: 'Seed',
//    aliases: ['seeds'],
//
//    execute(message, args) {
//
//        con.query("CREATE TABLE scores(id VARCHAR(30), redScore INT, blueScore INT, PRIMARY KEY (id), FOREIGN KEY(id) REFERENCES players(id));", (error, data) => {
//            if (error) console.log("lmao")
//
//        })
//        con.query("INSERT INTO scores SET ?", { id: '410652831435980811', redScore: 5, blueScore: 4 })
//        con.query("INSERT INTO scores SET ?", { id: '209772533346598912', redScore: 5, blueScore: 4 })
//        con.query("INSERT INTO scores SET ?", { id: '604544380262547475', redScore: 5, blueScore: 4 })
//
//
//    },
//};
const con = require("../connection")
const config = require('../config.json');




module.exports = {
    name: 'restart',
    description: 'Starts the lobby!',
    aliases: ['s'],

    execute(message, args) {
        con.query("DROP TABLE lobby;", (error, results) => {
            if (error) {
                message.channel.send("There does not seem to be a lobby open!")
            }
            else {
                message.channel.send("Lobby closed! Type " + config.prefix + "start to start another one!")
            }
        })
        con.query("DROP TABLE redTeam;", (error, data) => {

        })
        con.query("DROP TABLE blueTeam;", (error, data) => {

        })
        con.query("CREATE TABLE lobby(tag VARCHAR(30), username VARCHAR(30), elo INT, PRIMARY KEY (tag), FOREIGN KEY(tag) REFERENCES players(tag));", (error, result) => {
            if (error) {
                message.channel.send("There is already an open lobby!")
            }
            else
                message.channel.send("Lobby created! Type " + config.prefix + "join to join!")
            con.query("INSERT INTO lobby SET ?", {

                username: "Duck",
                tag: 'Duck#4590',
                elo: 69420,
            }, function (error, response) {
                if (error) {
                    throw error
                }
            })
            con.query("INSERT INTO lobby SET ?", {

                username: "Mallard",
                tag: 'Mallard#4374',
                elo: 3,
            }, function (error, response) {
                if (error) {
                    throw error
                }
            })
            con.query("INSERT INTO lobby SET ?", {

                username: "B",
                tag: 'Nathan95#5384',
                elo: 8374,
            }, function (error, response) {
                if (error) {
                    throw error
                }
            })
            con.query("INSERT INTO lobby SET ?", {

                username: "Teriyaki",
                tag: 'Teriyaki#0363',
                elo: 2534,
            }, function (error, response) {
                if (error) {
                    throw error
                }
            })
            con.query("INSERT INTO lobby SET ?", {

                username: "nuggetfiend",
                tag: 'nuggetfiend#5276',
                elo: 1134,
            }, function (error, response) {
                if (error) {
                    throw error
                }
            })

        })
    },
};
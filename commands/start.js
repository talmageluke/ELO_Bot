const con = require("../connection")
const config = require('../config.json');




module.exports = {
    name: 'start',
    description: 'Starts the lobby!',
    aliases: ['s'],

    execute(message, args) {
        con.query("CREATE TABLE lobby(id VARCHAR(30), username VARCHAR(30), elo INT, team VARCHAR(30); PRIMARY KEY (id), FOREIGN KEY(id) REFERENCES players(id));", (error, result) => {
            if (error) {
                message.channel.send("There is already an open lobby!")
            }
            else
                message.channel.send("Lobby created! Type " + config.prefix + "join to join!")
            con.query("INSERT INTO lobby SET ?", {

                username: "Duck",
                id: 'Duck#4590',
                elo: 69420,
            }, function (error, response) {
                if (error) {
                    throw error
                }
            })
            con.query("INSERT INTO lobby SET ?", {

                username: "Mallard",
                id: 'Mallard#4374',
                elo: 3,
            }, function (error, response) {
                if (error) {
                    throw error
                }
            })
            con.query("INSERT INTO lobby SET ?", {

                username: "B",
                id: 'Nathan95#5384',
                elo: 8374,
            }, function (error, response) {
                if (error) {
                    throw error
                }
            })
            con.query("INSERT INTO lobby SET ?", {

                username: "Teriyaki",
                id: 'Teriyaki#0363',
                elo: 2534,
            }, function (error, response) {
                if (error) {
                    throw error
                }
            })
            con.query("INSERT INTO lobby SET ?", {

                username: "nuggetfiend",
                id: 'nuggetfiend#5276',
                elo: 1134,
            }, function (error, response) {
                if (error) {
                    throw error
                }
            })

        })
    },
};
const con = require("../connection")
const config = require('../config.json');




module.exports = {
    name: 'restart',
    description: 'Starts the lobby!',
    aliases: ['s'],

    execute(message, args) {
        con.query("DROP TABLE turnToPick", (error, data) => {
            if (error) {
                console.log("Not a real error")
            }

        })
        con.query("DROP TABLE scores", (error, data) => {
            if (error) {
                console.log("Not a real error")
            }

        })
        con.query("DROP TABLE lobby;", (error, results) => {
            if (error) {
                message.channel.send("There does not seem to be a lobby open!")
            }
            else {
                message.channel.send("Lobby closed! Type " + config.prefix + "start to start another one!")
            }
        })
        con.query("CREATE TABLE lobby(id VARCHAR(30), username VARCHAR(30), elo INT, team VARCHAR(30), PRIMARY KEY (id), FOREIGN KEY(id) REFERENCES players(id));", (error, result) => {
            if (error) {
                message.channel.send("There is already an open lobby!")
            }
            else
                message.channel.send("Lobby created! Type " + config.prefix + "join to join!")
            con.query("INSERT INTO lobby SET ?", {

                username: "Duck",
                id: "410652831435980811",
                elo: 6942,
                team: ''
            }, function (error, response) {
                if (error) {
                    throw error
                }
            })
            con.query("INSERT INTO lobby SET ?", {

                username: "Mallard",
                id: "209772533346598912",
                elo: 3,
                team: ''
            }, function (error, response) {
                if (error) {
                    throw error
                }
            })
            con.query("INSERT INTO lobby SET ?", {

                username: "BucketG",
                id: "604544380262547475",
                elo: 9998,
                team: ''
            }, function (error, response) {
                if (error) {
                    throw error
                }
            })
            con.query("INSERT INTO lobby SET ?", {

                username: "Teriyaki",
                id: "163328848233103360",
                elo: 2534,
                team: ''
            }, function (error, response) {
                if (error) {
                    throw error
                }
            })
            con.query("INSERT INTO lobby SET ?", {

                username: "nuggetfiend",
                id: "679496562107482122",
                elo: 1134,
                team: ''
            }, function (error, response) {
                if (error) {
                    throw error
                }
            })

        })
    },
};
const con = require("../connection")
const config = require('../config.json');




module.exports = {
    name: 'seed',
    description: 'Seed',
    aliases: ['seeds'],

    execute(message, args) {

        con.query("INSERT INTO lobby SET ?", {

            username: "Duck",
            id: "410652831435980811",
            elo: 69420,
        }, function (error, response) {
            if (error) {
                throw error
            }
        })
        con.query("INSERT INTO lobby SET ?", {

            username: "Mallard",
            id: "209772533346598912",
            elo: 3,
        }, function (error, response) {
            if (error) {
                throw error
            }
        })
        con.query("INSERT INTO lobby SET ?", {

            username: "B",
            id: "343138886924632065",
            elo: 8374,
        }, function (error, response) {
            if (error) {
                throw error
            }
        })
        con.query("INSERT INTO lobby SET ?", {

            username: "Teriyaki",
            id: "163328848233103360",
            elo: 2534,
        }, function (error, response) {
            if (error) {
                throw error
            }
        })
        con.query("INSERT INTO lobby SET ?", {

            username: "nuggetfiend",
            id: "679496562107482122",
            elo: 1134,
        }, function (error, response) {
            if (error) {
                throw error
            }
        })

    },
};
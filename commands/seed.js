const con = require("../connection")
const config = require('../config.json');




module.exports = {
    name: 'seed',
    description: 'Seed',
    aliases: ['seeds'],

    execute(message, args) {

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

    },
};
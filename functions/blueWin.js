const con = require("../connection")
const Discord = require('discord.js');
const eloUpdate = require("./eloUpdate");




let blueWin = (message) => {
    let redElo = 0
    let blueElo = 0
    con.query("SELECT * FROM lobby WHERE team = 'red'", (error, data) => {

        for (var i = 0; i < data.length; i++) {
            redElo = data[i].elo + redElo
        }
        con.query("SELECT * FROM lobby WHERE team = 'blue'", (error, bData) => {
            for (var i = 0; i < bData.length; i++) {
                blueElo = bData[i].elo + blueElo
            }

            let difference = eloUpdate(redElo, blueElo)
        })
    })




}

module.exports = blueWin

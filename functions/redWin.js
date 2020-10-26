const con = require("../connection")
const Discord = require('discord.js');
const eloUpdate = require("./eloUpdate");




let redWin = () => {
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

            let difference = eloUpdate(blueElo, redElo)
            console.log(difference)
            for (var i = 0; i < data.length; i++) {
                newElo = data[i].elo + difference

                con.query("UPDATE players SET elo = ? WHERE id = ?", [newElo, data[i].id], (error, data) => {
                    if (error) throw error
                })
                console.log(data[i].elo + " winner " + newElo)

            }
            for (var i = 0; i < data.length; i++) {
                newElo = bData[i].elo - difference
                con.query("UPDATE players SET elo = ? WHERE id = ?", [newElo, bData[i].id], (error, data) => {
                    if (error) throw error

                })
                console.log(bData[i].elo + " loser " + newElo)

            }

        })
    })




}

module.exports = redWin


const con = require("../connection")
const Discord = require('discord.js');
const eloUpdate = require("./eloUpdate");
const config = require('../config.json')





let blueWin = () => {
    teamSize = config.size / 2
    let redElo = 0
    let blueElo = 0
    con.query("SELECT * FROM lobby", (error, data) => {
        con.query("SELECT * FROM lobby WHERE team = 'red'", (error, rData) => {
            con.query("SELECT * FROM lobby WHERE team ='blue'", (error, bData) => {
                con.query("SELECT * FROM scores", (error, scores) => {
                    //calculates elo totals and then figures out elo update
                    for (var i = 0; i < rData.length; i++) {
                        redElo = rData[i].elo + redElo
                        blueElo = bData[i].elo + blueElo
                        console.log("red elo = " + redElo + " blue elo = " + blueElo)
                    }
                    redElo = redElo / teamSize
                    blueElo = blueElo / teamSize
                    eloDiff = eloUpdate(redElo, blueElo)
                    console.log(eloDiff)

                    // for loop to update players 
                    for (let i = 0; i < rData.length; i++) {
                        //this updates red team as winners
                        con.query("SELECT * FROM players WHERE id = ?", rData[i].id, (error, pData) => {
                            let newLosses = pData[0].losses + 1
                            let newGames = pData[0].totalGames + 1
                            let newElo = pData[0].elo - eloDiff

                            con.query("UPDATE players SET ? WHERE id =?", [{ losses: newLosses, totalGames: newGames, elo: newElo }, pData[0].id])
                        })
                        //this updates blue team as losers
                        con.query("SELECT * FROM players WHERE id = ?", bData[i].id, (error, pData) => {
                            let newWins = pData[0].wins + 1
                            let newGames = pData[0].totalGames + 1
                            let newElo = pData[0].elo - eloDiff

                            con.query("UPDATE players SET ? WHERE id =?", [{ losses: newWins, totalGames: newGames, elo: newElo }, pData[0].id])
                        })

                    }




                })
                con.query('DROP TABLE lobby')
                con.query('DROP TABLE scores')


            })
        })
    })





}

module.exports = blueWin





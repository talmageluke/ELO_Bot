const con = require("../connection")
const Discord = require('discord.js');
const eloUpdate = require("./eloUpdate");




let redWin = () => {
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
                    eloDiff = eloUpdate(blueElo, redElo)
                    console.log(eloDiff)

                    // for loop to update players 
                    for (let i = 0; i < rData.length; i++) {
                        //this updates red team as winners
                        con.query("SELECT * FROM players WHERE id = ?", rData[i].id, (error, pData) => {
                            let newWins = pData[0].wins + 1
                            let newGames = pData[0].totalGames + 1
                            let newElo = pData[0].elo + eloDiff

                            con.query("UPDATE players SET ? WHERE id =?", [{ wins: newWins, totalGames: newGames, elo: newElo }, pData[0].id])
                        })
                        //this updates blue team as losers
                        con.query("SELECT * FROM players WHERE id = ?", bData[i].id, (error, pData) => {
                            let newlosses = pData[0].losses + 1
                            let newGames = pData[0].totalGames + 1
                            let newElo = pData[0].elo - eloDiff

                            con.query("UPDATE players SET ? WHERE id =?", [{ losses: newlosses, totalGames: newGames, elo: newElo }, pData[0].id])
                        })

                    }




                })
                con.query('DROP TABLE lobby')
                con.query('DROP TABLE scores')


            })
        })
    })





}

module.exports = redWin









    //for (var i = 0; i < data.length; i++) {
    //    redElo = data[i].elo + redElo
    //}
    //con.query("SELECT * FROM lobby WHERE team = 'blue'", (error, bData) => {
    //    for (var i = 0; i < bData.length; i++) {
    //        blueElo = bData[i].elo + blueElo
    //    }
//
    //    let difference = eloUpdate(blueElo, redElo)
    //    console.log(difference)
    //    for (var n = 0; n < data.length; n++) {
    //        newElo = data[n].elo + difference
    //        con.query("SELECT * FROM players WHERE id =?", data[n].id, (error, pData) => {
    //            console.log(pData[n])
//
    //            con.query("UPDATE players SET ? WHERE id = ?", [{ elo: newElo, wins: pData[n].wins + 1, totalGames: pData[n].totalGames + 1 }, data[n].id], (error, data) => {
    //                if (error) throw error
    //            })
    //            console.log(data[n].elo + " winner " + newElo)
    //        })
    //    }
    //    for (var n = 0; n < bData.length; n++) {
    //        newElo = bData[n].elo - difference
    //        con.query("UPDATE players SET elo = ? WHERE id = ?", [newElo, bData[n].id], (error, data) => {
    //            if (error) throw error
    //        })
    //        console.log(bData[n].elo + " loser " + newElo)
//
    //    }
//
    //}
const con = require("../connection")


module.exports = {
    name: 'register',
    description: 'Registers user to play! Must be used before joining a lobby.',
    execute(message, args) {
        //searches db for user
        con.query("SELECT * FROM players WHERE id = ?", message.author.id, function (error, results) {

            if (results.length == 0) {
                //if user is not found in the db it will add them here
                con.query("INSERT INTO players SET ?", { username: message.author.username, id: message.author.id, elo: 1000, wins: 0, losses: 0, totalGames: 0 }, function (error, response) {
                    if (error) {
                        throw error
                    }
                    //this creates the separate table for their own head to heads comparisons
                    con.query(
                        "CREATE TABLE ??(id VARCHAR(30) NOT NULL, opponent VARCHAR(30)NOT NULL, winsWith INT, lossesWith INT, winsAgainst INT, lossesAgainst INT, PRIMARY KEY(id));", message.author.id,
                        function (error, response) {
                            if (error) throw error
                        })
                    //sens a message to the current channel
                    message.channel.send("Registered succefully!")
                })
            }
            else {
                message.channel.send("You are already registered!")
            }
        })
    },

};
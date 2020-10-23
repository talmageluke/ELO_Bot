const con = require("../connection")
PrettyTable = require('prettytable');


module.exports = {
    name: 'leaderboard',
    description: 'prints out the leaderboard',
    execute(message, args) {

        let rows = []
        //sql connection to pull all players
        con.query("SELECT * from players", function (error, results) {
            console.log(results)
            //pushes sql results into an array
            for (var i = 0; i < results.length; i++) {
                let player = [results[i].username, results[i].elo, results[i].wins, results[i].losses, results[i].totalGames]
                rows.push(player)
            }
            //creates a table and orders it by ELO
            leaderTable = new PrettyTable()
            var headers = ["Name", "ELO", "Wins", "Losses", "Total Games"]
            leaderTable.create(headers, rows)
            leaderTable.sortTable("ELO", reverse = true)
            var tableContent = leaderTable.toString();
            //sends leaderboard to current channel inside of a codeblock
            message.channel.send("```" + tableContent + "```")
        })


    },
};
const con = require("../connection")
PrettyTable = require('prettytable');


module.exports = {
    name: 'leaderboard',
    aliases: ['leaders'],

    description: 'prints out the leaderboard',
    execute(message, args) {

        let rows = []
        //sql connection to pull all players
        con.query("SELECT * from players ORDER BY elo DESC", function (error, results) {
            //pushes sql results into an array
            for (var i = 0; i < results.length; i++) {
                let player = [i + 1, results[i].username, results[i].elo, results[i].wins, results[i].losses, results[i].totalGames]
                rows.push(player)
            }
            //creates a table and orders it by ELO
            leaderTable = new PrettyTable()
            var headers = ["Rank", "Name", "ELO", "Wins", "Losses", "Total Games"]
            leaderTable.create(headers, rows)
            leaderTable.sortTable("ELO", reverse = true)
            var tableContent = leaderTable.toString();
            //sends leaderboard to current channel inside of a codeblock
            message.channel.send("```" + tableContent + "```")
        })


    },
};
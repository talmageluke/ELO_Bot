const con = require("../connection")
const config = require('../config.json');


let lobbycheck = (message) => {

    let rows = []
    con.query("SELECT * FROM lobby", (error, results) => {
        if (error) {
            message.channel.send("There does not seem to be a lobby open. Type " + config.prefix + "start to start the lobby!")
        }
        else {
            for (var i = 0; i < results.length; i++) {
                let player = [results[i].username, results[i].elo]
                rows.push(player);

            }
            lobbyTable = new PrettyTable()
            var headers = ["Name", "ELO"]
            lobbyTable.create(headers, rows)
            lobbyTable.sortTable("ELO", reverse = true)
            var tableContent = lobbyTable.toString();
            //sends leaderboard to current channel inside of a codeblock
            message.channel.send("Here is the current lobby! ```" + tableContent + "``` Type " + config.prefix + "join to join!")
        }
    })
}

module.exports = lobbycheck
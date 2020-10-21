const Discord = require("discord.js");
const PrettyTable = require("prettytable");
const client = new Discord.Client();
const config = require('./config.json');
const con = require("./connection")


client.once("ready", () => {
    console.log("I am ready!");
});

//listens for messages in all channels
client.on("message", (message) => {
    //looking for messages with the correct prefix
    if (message.content.startsWith(config.prefix)) {
        // cuts off the prefix 
        let command = message.content.substring(1)

        let currentUser = message.author
        let currentChannel = message.channel
        //commands
        switch (command) {
            case "register":
                addUser(currentUser, currentChannel)
                break;
            case "profile":
                profile(currentUser, currentChannel)
                break;
            case "leaderboard":
                leaderboard(currentChannel)
                break;
            default:
                currentChannel.send("This is not a command")
        }
    }
});

//this function adds a new user to the Mysql db if he is not already in there, also creates a separate table for head to head comparisons
function addUser(currentUser, currentChannel) {
    //searches db for user
    con.query("SELECT * FROM players WHERE id = ?", currentUser.id, function (error, results) {

        if (results.length == 0) {
            //if user is not found in the db it will add them here
            con.query("INSERT INTO players SET ?", { userName: currentUser.username, id: currentUser.id, elo: 1000, wins: 0, losses: 0, totalGames: 0 }, function (error, response) {
                if (error) {
                    throw error
                }
                //this creates the separate table for their own head to heads comparisons
                con.query("CREATE TABLE ??(opponent INT NOT NULL, winsWith INT, lossesWith INT, winsAgainst INT, lossesAgainst INT, PRIMARY KEY(opponent));", currentUser.username, function (error, response) {
                    if (error) throw error
                })
                //sens a message to the current channel
                currentChannel.send("Registered succefully!")
            })
        }
        else {
            currentChannel.send("You are already registered!")
        }
    })
}
//this pulls up the users profile if it exists, it tells the user to register if they do not exist in the db yet
function profile(currentUser, currentChannel) {
    con.query("SELECT * FROM players WHERE id = ?", currentUser.id, function (error, results) {
        if (results.length == 0) {

            currentChannel.send("You are not registered. Please enter " + config.prefix + "register to register!")
        }
        else {
            currentChannel.send("You are currently registered. Your username is " + results[0].userName + " and your ELO is " + results[0].elo)
        }
    }
    )
}
//dispalys the leaderboard
function leaderboard(currentChannel) {
    let rows = []

    //sql connection to pull all players
    con.query("SELECT * from players", function (error, results) {
        //pushes sql results into an array
        for (var i = 0; i < results.length; i++) {
            let player = [results[i].userName, results[i].elo, results[i].wins, results[i].losses, results[i].totalGames]
            rows.push(player)
        }
        //creates a table and orders it by ELO
        leaderTable = new PrettyTable()
        var headers = ["Name", "ELO", "Wins", "Losses", "Total Games"]
        leaderTable.create(headers, rows)
        leaderTable.sortTable("ELO", reverse = true)
        var tableContent = leaderTable.toString();
        //sends leaderboard to current channel inside of a codeblock
        currentChannel.send("```" + tableContent + "```")

    })


}

//bot token
client.login(config.token);
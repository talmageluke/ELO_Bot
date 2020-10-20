const Discord = require("discord.js");
const PrettyTable = require("prettytable");
const client = new Discord.Client();
require('dotenv').config()
const con = require("./connection")


client.on("ready", () => {
    console.log("I am ready!");
});

client.on("message", (message) => {
    if (message.content.startsWith(process.env.command)) {
        let command = message.content.substring(1)
        // message.channel.send(message.author.id);
        // message.channel.send(message.author.username);
        // message.channel.send(message.author.tag);
        let currentUser = message.author
        let currentChannel = message.channel
        if (command.length > 0)
            message.channel.send(command);
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


function addUser(currentUser, currentChannel) {
    con.query("INSERT INTO players SET ?", { userName: currentUser.username, id: currentUser.id, elo: 1000, wins: 0, losses: 0, totalGames: 0 }, function (error, response) {
        if (error) {
            throw error
        }
        console.log("added succesfully!")
        currentChannel.send("added succefully!")
    })
}
function profile(currentUser, currentChannel) {
    con.query("SELECT * FROM players WHERE id = ?", currentUser.id, function (error, results) {
        if (results.length == 0) {

            currentChannel.send("You are not registered. Please enter " + process.env.command + "register to register!")
        }
        else {
            currentChannel.send("You are currently registered. Your username is " + results[0].userName + " and your ELO is " + results[0].elo)
        }
    }
    )
}
function leaderboard(currentChannel) {
    let leaders = []
    let rows = []


    con.query("SELECT * from players", function (error, results) {
        console.log(results.length)
        for (var i = 0; i < results.length; i++) {
            console.log('hello')
            let player = [results[i].userName, results[i].elo, results[i].wins, results[i].losses, results[i].totalGames]
            console.log(player)
            rows.push(player)
        }
        leaderTable = new PrettyTable()
        var headers = ["Name", "ELO", "Wins", "Losses", "Total Games"]


        leaderTable.create(headers, rows)
        leaderTable.sortTable("ELO", reverse = true)

        leaderTable.print();
        var tableContent = leaderTable.toString();
        currentChannel.send("'''" + tableContent + "'''")

    })


}
//SELECT * from players ORDER BY elo ASC

client.login(process.env.token);
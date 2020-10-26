const con = require("../connection")
const config = require('../config.json');
const redWin = require('../functions/redWin')

const Discord = require('discord.js');

let report = config.size / 2 + 1

let scoreReport = (message, args) => {

    con.query("CREATE TABLE scores(id VARCHAR(30), redScore INT, blueScore INT, PRIMARY KEY (id), FOREIGN KEY(id) REFERENCES players(id));", (error, data) => {
        if (error) console.log("lmao")

    })
    con.query("INSERT INTO scores SET ?", { id: message.author.id, redScore: args[0], blueScore: args[1] })
    con.query("SELECT * FROM scores", (error, data) => {
        if (data.length >= report) {
            let red = 0
            let blue = 0
            message.channel.send("Game reported!")
            for (var i = 0; i < data.length; i++) {
                red = data[i].redScore + red
                blue = data[i].blueScore + blue
            }
            if (red > blue) {
                message.channel.send("Red team wins!")
                redWin(message)
            }
            else if (blue > red) {
                message.channel.send("Blue team wins!")
            }
            else {
                message.channel.send("It's a tie!")
            }
        }
    })
}

module.exports = scoreReport
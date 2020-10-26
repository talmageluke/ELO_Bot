const con = require("../connection")
const Discord = require('discord.js');
const config = require('../config.json')



let print = (message) => {

    con.query("SELECT * FROM lobby WHERE team = ? ORDER BY elo DESC", '', function (err, r, fields) {
        if (err) {
            message.channel.send("There does not seem to be a lobby open! Type " + config.prefix + "start to start a lobby!")
        }
        else {
            let availableNames = ''
            let availableElo = ''

            for (var i = 0; i < r.length; i++) {
                availableNames = availableNames.concat(r[i].username + '\n')
                availableElo = availableElo.concat(r[i].elo + '\n')

            }


            const draftEmb = new Discord.MessageEmbed()
                .addFields(
                    { name: "Players", value: availableNames, inline: true },
                    { name: "ELO", value: availableElo, inline: true },


                )

            message.channel.send(draftEmb);
        }

    });
}

module.exports = print
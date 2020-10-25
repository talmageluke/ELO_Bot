const con = require("../connection")
const Discord = require('discord.js');

PrettyTable = require('prettytable');


let print = (message) => {

    con.query("SELECT * FROM lobby WHERE team = ? ORDER BY elo DESC", '', function (err, r, fields) {
        let availableNames = ''
        let availableElo = ''

        for (var i = 0; i < r.length; i++) {
            availableNames = availableNames.concat(r[i].username + '\n')
            availableElo = availableElo.concat(r[i].elo + '\n')

        }
        con.query("SELECT *FROM lobby WHERE team =?", 'redCapt', (error, rCapt) => {
            if (err) throw err;
            const draftEmb = new Discord.MessageEmbed()
                .addFields(
                    { name: "Players", value: availableNames, inline: true },
                    { name: "ELO", value: availableElo, inline: true },


                )

            message.channel.send(draftEmb);
        })
    });
}

module.exports = print
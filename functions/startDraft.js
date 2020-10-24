const con = require("../connection")
const { prefix, token } = require('../config.json');

const Discord = require('discord.js');

const client = new Discord.Client();



let draft = (message) => {

    let userPickQuery = con.query("SELECT * FROM lobby ORDER BY elo DESC LIMIT 2", function (err, rows, fields) {
        if (err) throw err;
        const userEmb = new Discord.MessageEmbed()
            .setTitle(rows[0].username + " and " + rows[1].username + " are the captains.");
        message.channel.send(userEmb);

        let draft = con.query("SELECT * FROM lobby ORDER BY elo LIMIT 4", function (err, r, fields) {
            if (err) throw err;
            const draftEmb = new Discord.MessageEmbed()
                .setTitle(rows[1].username + ", please draft a player with -draft < @player >")
                .addFields(
                    { name: "Players", value: r[0].username + "\n" + r[1].username + "\n" + r[2].username + "\n" + r[3].username, inline: true },
                    { name: "ELO", value: r[0].elo + "\n" + r[1].elo + "\n" + r[2].elo + "\n" + r[3].elo, inline: true },


                )

            message.channel.send(draftEmb);
        });
    });


}

module.exports = draft
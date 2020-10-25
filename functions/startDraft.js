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
        con.query("UPDATE lobby SET team = 'redCapt' WHERE id = ?", rows[0].id.toString(), (error, data) => {

        })
        con.query("UPDATE lobby SET team = 'blueCapt' WHERE id = ?", rows[1].id.toString(), (error, data) => {

        })

        con.query("CREATE TABLE turnToPick(pick VARCHAR(30), PRIMARY KEY (pick));", (error, result) => {
            con.query("INSERT INTO turnToPick SET ?", { pick: "blue" })
        })
        let draft = con.query("SELECT * FROM lobby WHERE team = ?", '', function (err, r, fields) {
            let availableNames = ''
            let availableElo = ''

            for (var i = 0; i < r.length; i++) {
                availableNames = availableNames.concat(r[i].username + '\n')
                availableElo = availableElo.concat(r[i].elo + '\n')

            }
            if (err) throw err;
            const draftEmb = new Discord.MessageEmbed()
                .setTitle(rows[1].username + ", please draft a player with -draft < @player >")
                .addFields(
                    { name: "Players", value: availableNames, inline: true },
                    { name: "ELO", value: availableElo, inline: true },


                )

            message.channel.send(draftEmb);
        });
    });


}

module.exports = draft
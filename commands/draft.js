const con = require("../connection")
const Discord = require('discord.js');
const client = new Discord.Client();
const printTeams = require('../functions/printTeams')





module.exports = {
    name: 'draft',
    description: 'Draft a player by idging them after the command!',
    aliases: ['d', 'p', 'pick'],
    execute(message, args) {

        con.query("SELECT * FROM turnToPick", (error, data) => {
            if (error) { message.channel.send("There does not seem to be a draft at the moment.") }
            else if (data[0].pick == "red") {
                con.query("SELECT * FROM lobby WHERE team = 'redCapt'", (error, data) => {
                    if (message.author.id == data[0].id) {
                        let drafted = getUserFromMention(args[0])

                        con.query("SELECT * FROM lobby WHERE id =?", drafted, (error, data) => {

                            if (data[0].team != '') {
                                message.channel.send("This user is already on " + data[0].team + " team!")
                            }
                            else {
                                con.query("UPDATE turnToPick SET pick = 'blue'")
                                con.query("UPDATE lobby SET team = 'red' WHERE id = ? ", drafted.toString())
                                message.channel.send("Red team picked " + args[0] + "! Blue teams turn")

                                con.query("SELECT * FROM lobby WHERE team = ''", (error, data) => {
                                    if (data.length == 0) {
                                        con.query("DROP TABLE turnToPick")
                                        message.channel.send("Draft completed!")
                                        con.query("UPDATE lobby SET team ='blue' WHERE team = 'blueCapt'")
                                        con.query("UPDATE lobby SET team ='red' WHERE team = 'redCapt'")
                                        printTeams(message)
                                    }
                                    else {
                                        let draft = con.query("SELECT * FROM lobby WHERE team = ?", '', function (err, r, fields) {
                                            let availableNames = ''
                                            let availableElo = ''

                                            for (var i = 0; i < r.length; i++) {
                                                availableNames = availableNames.concat(r[i].username + '\n')
                                                availableElo = availableElo.concat(r[i].elo + '\n')

                                            }
                                            con.query("SELECT *FROM lobby WHERE team =?", 'blueCapt', (error, bCapt) => {
                                                if (err) throw err;
                                                const draftEmb = new Discord.MessageEmbed()
                                                    .setTitle(bCapt[0].username + ", please draft a player with -draft < @player >")
                                                    .addFields(
                                                        { name: "Players", value: availableNames, inline: true },
                                                        { name: "ELO", value: availableElo, inline: true },
                                                    )
                                                message.channel.send(draftEmb);
                                            })
                                        });
                                    }
                                })

                            }
                        })

                    }
                    else {
                        message.channel.send("Not your turn")
                    }
                })
            }
            else {
                con.query("SELECT * FROM lobby WHERE team = 'blueCapt'", (error, data) => {
                    if (message.author.id == data[0].id) {
                        let drafted = getUserFromMention(args[0])
                        con.query("SELECT * FROM lobby WHERE id =?", drafted, (error, data) => {
                            if (data[0].team != '') {
                                message.channel.send("This user is already on " + data[0].team + " team!")
                            }
                            else {
                                con.query("UPDATE turnToPick SET pick = 'red'")

                                con.query("UPDATE lobby SET team = 'blue' WHERE id = ? ", drafted.toString())
                                message.channel.send("Blue team picked " + args[0] + "! Red teams turn")
                                con.query("SELECT * FROM lobby WHERE team = ''", (error, data) => {
                                    if (data.length == 0) {
                                        con.query("DROP TABLE turnToPick")
                                        message.channel.send("Draft completed!")
                                        con.query("UPDATE lobby SET team ='blue' WHERE team = 'blueCapt'")
                                        con.query("UPDATE lobby SET team ='red' WHERE team = 'redCapt'")
                                        printTeams(message)


                                    }
                                    else {
                                        let draft = con.query("SELECT * FROM lobby WHERE team = ?", '', function (err, r, fields) {
                                            let availableNames = ''
                                            let availableElo = ''

                                            for (var i = 0; i < r.length; i++) {
                                                availableNames = availableNames.concat(r[i].username + '\n')
                                                availableElo = availableElo.concat(r[i].elo + '\n')

                                            }
                                            con.query("SELECT *FROM lobby WHERE team =?", 'redCapt', (error, rCapt) => {
                                                if (err) throw err;
                                                (rCapt)
                                                const draftEmb = new Discord.MessageEmbed()
                                                    .setTitle(rCapt[0].username + ", please draft a player with -draft < @player >")
                                                    .addFields(
                                                        { name: "Players", value: availableNames, inline: true },
                                                        { name: "ELO", value: availableElo, inline: true },


                                                    )

                                                message.channel.send(draftEmb);
                                            })
                                        });
                                    }
                                })

                            }
                        })

                    }
                    else {
                        message.channel.send("Not your turn")
                    }

                })
            }
        })
        function getUserFromMention(mention) {
            const matches = mention.match(/^<@!?(\d+)>$/);

            if (!matches) return;

            const id = matches[1];

            return id;
        }
    },
};





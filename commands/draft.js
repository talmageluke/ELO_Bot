const con = require("../connection")
const Discord = require('discord.js');
const Client = new Discord.Client();



module.exports = {
    name: 'draft',
    description: 'Draft a player by tagging them after the command!',
    aliases: ['d'],

    execute(message, args) {
        let draft = con.query("SELECT * FROM lobby ORDER BY elo DESC LIMIT 2", function (err, rows, fields) {
            if (err) throw err
            if (message.author.tag == rows[0].tag || message.author.tag == rows[1].tag) {
                console.log(message.mentions)
            }

        })
    },
};




       //        if (message.author.tag == redCapt.tag) {
        //            channel.send(args)
        //        }
        //        else if (message.author.tag == blueCapt.tag) {
        //            channel.send(args)
        //        }

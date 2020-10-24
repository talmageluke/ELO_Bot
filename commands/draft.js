const con = require("../connection")
const Discord = require('discord.js');


module.exports = {
    name: 'draft',
    description: 'Draft a player by tagging them after the command!',
    aliases: ['d'],

    execute(message, args) {
        let userPickQuery = con.query("SELECT * FROM lobby ORDER BY elo DESC LIMIT 2", function (err, rows, fields) {
            if (err) throw err;
            for (let i = 0; i < rows.length; i++) {
                const userEmb = new Discord.MessageEmbed()
                    .setDescription(rows[0].username + " and " + rows[1].username + " are the captains.");
                message.channel.send(userEmb);
            }
        });
    },
};




       //        if (message.author.tag == redCapt.tag) {
        //            channel.send(args)
        //        }
        //        else if (message.author.tag == blueCapt.tag) {
        //            channel.send(args)
        //        }

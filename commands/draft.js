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
                if (args[0]) {
                    const user = getUserFromMention(args[0]);
                    if (!user) {
                        console.log(user)
                        return message.reply('Please mention a player to draft them.');
                    }

                    con.query("UPDATE lobby SET team = ? WHERE tag = ?", "red", `${user.tag}`, (error, data) => {
                        if (error) throw error
                    })
                }



            }

        })
        function getUserFromMention(mention) {
            if (!mention) return;

            if (mention.startsWith('<@') && mention.endsWith('>')) {
                mention = mention.slice(2, -1);

                if (mention.startsWith('!')) {
                    mention = mention.slice(1);
                }

                return Client.users.cache.get(mention);
            }
        }
    },
};




       //        if (message.author.tag == redCapt.tag) {
        //            channel.send(args)
        //        }
        //        else if (message.author.tag == blueCapt.tag) {
        //            channel.send(args)
        //        }

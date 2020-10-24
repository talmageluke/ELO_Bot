const con = require("../connection")
const Discord = require('discord.js');
const client = new Discord.Client();




module.exports = {
    name: 'draft',
    description: 'Draft a player by idging them after the command!',
    aliases: ['d'],

    execute(message, args) {
        let draft = con.query("SELECT * FROM lobby ORDER BY elo DESC LIMIT 2", function (err, rows, fields) {
            if (err) throw err
            if (message.author.id == rows[0].id || message.author.id == rows[1].id) {
                console.log(args[0])
                if (args[0]) {
                }



            }

        })
    },
};





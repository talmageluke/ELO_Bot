const con = require("../connection")

module.exports = {
    name: 'profile',
    aliases: ['whoami'],
    description: "Displays user's profile",
    execute(message, args) {
        con.query("SELECT * FROM players WHERE id = ?", message.author.id, function (error, results) {
            if (results.length == 0) {

                message.channel.send("You are not registered. Please enter " + config.prefix + "register to register!")
            }
            else {
                message.channel.send("You are currently registered. Your username is " + results[0].username + " and your ELO is " + results[0].elo)
            }
        }
        )
    },
};
const con = require("../connection")

module.exports = {
    name: 'profile',
    description: "Displays user's profile",
    execute(message, args) {
        con.query("SELECT * FROM players WHERE tag = ?", message.author.tag, function (error, results) {
            if (results.length == 0) {

                message.channel.send("You are not registered. Please enter " + config.prefix + "register to register!")
            }
            else {
                message.channel.send("You are currently registered. Your username is " + results[0].userName + " and your ELO is " + results[0].elo)
            }
        }
        )
    },
};
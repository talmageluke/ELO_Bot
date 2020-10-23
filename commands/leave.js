const con = require("../connection")
const print = require('../functions/printLobby')
const config = require('../config.json');


module.exports = {
    name: 'leave',
    description: "Leaves the lobby",
    execute(message, args) {

        con.query("SELECT * FROM lobby WHERE tag = ?", message.author.tag, (error, results) => {
            if (results.length === 0) {
                message.channel.send("You are not currently in the lobby. Type " + config.prefix + "join to join!")
            }
            else {
                con.query("DELETE FROM lobby WHERE tag = ?", message.author.tag, (error, results) => {
                    message.channel.send(message.author.username + " has left the lobby!")
                    print(message)
                })
            }
        })
    },
};
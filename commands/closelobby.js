const con = require("../connection")
const config = require('../config.json');

module.exports = {
    name: 'closelobby',
    aliases: ['close'],
    description: 'Closes the lobby',
    execute(message, args) {
        con.query("DROP TABLE lobby;", (error, results) => {
            if (error) {
                message.channel.send("There does not seem to be a lobby open!")
            }
            else {
                message.channel.send("Lobby closed! Type " + config.prefix + "start to start another one!")
            }
        })
        con.query("DROP TABLE redTeam;", (error, data) => {

        })
        con.query("DROP TABLE blueTeam;", (error, data) => {

        })
    },
};
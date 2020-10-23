const con = require("../connection")
const config = require('../config.json');




module.exports = {
    name: 'start',
    description: 'Starts the lobby!',
    execute(message, args) {
        con.query("CREATE TABLE lobby(tag VARCHAR(30), username VARCHAR(30), elo INT, PRIMARY KEY (tag), FOREIGN KEY(tag) REFERENCES players(tag));", (error, result) => {
            if (error) {
                message.channel.send("There is already an open lobby!")
            }
            else
                message.channel.send("Lobby created! Type " + config.prefix + "join to join!")
        })
    },
};
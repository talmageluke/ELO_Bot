const con = require("../connection")
const config = require('../config.json');




module.exports = {
    name: 'start',
    description: 'Starts the lobby!',
    aliases: ['s'],

    execute(message, args) {
        con.query("CREATE TABLE lobby(id VARCHAR(30), username VARCHAR(30), elo INT, team VARCHAR(30), PRIMARY KEY (id), FOREIGN KEY(id) REFERENCES players(id));", (error, result) => {
            if (error) {
                message.channel.send("There is already an open lobby!")
            }
            else
                message.channel.send("Lobby created! Type " + config.prefix + "join to join!")

        })
    },
};
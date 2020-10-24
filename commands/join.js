const con = require("../connection")
const config = require('../config.json');
const print = require('../functions/printLobby')
const draft = require('../functions/draft')


module.exports = {
    name: 'join',
    description: 'Joins the lobby',
    aliases: ['j'],

    execute(message, args) {
        con.query("SELECT * FROM players WHERE tag = ?", message.author.tag, (error, results) => {

            if (results.length == 0) {
                message.channel.send("You are not registered. Please type " + config.prefix + "register to register then try rejoining!")
            }
            else {
                con.query("SELECT * FROM lobby WHERE tag = ?", message.author.tag, (error, lobbyCheck) => {
                    if (error) {
                        message.channel.send("There does not seem to be a lobby started. Type " + config.prefix + "start to start one!")
                    }
                    else if (lobbyCheck.length !== 0) {
                        message.channel.send("You are already in the lobby!")
                    }
                    else {
                        con.query("INSERT INTO lobby SET ?", { tag: results[0].tag, username: results[0].username, elo: results[0].elo }, (error, data) => {
                            if (error) { throw error }
                            message.channel.send(message.author.username + " has joined the lobby!").then(() => {
                                con.query("SELECT * FROM lobby", (error, data) => {
                                    if (data.length == config.size) {
                                        draft(message)
                                    }
                                    else {
                                        message.channel.send("Here is the current lobby!")
                                        print(message)
                                        message.channel.send("Type " + config.prefix + "join to join!")

                                    }
                                })
                            })
                        })
                    }
                })
            }
        })
    },
};
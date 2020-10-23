const con = require("../connection");
const print = require('../functions/printLobby')


module.exports = {
    name: 'lobby',
    description: "Displays the lobby",
    execute(message, args) {
        print(message)

    },
};
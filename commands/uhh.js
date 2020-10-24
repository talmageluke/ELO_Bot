const con = require("../connection")
const config = require('../config.json');

module.exports = {
    name: 'uhh',
    description: 'uhh',

    execute(message, args) {
        message.channel.send("https://www.youtube.com/watch?v=IqdZNm-QqNg&ab")
    },
};
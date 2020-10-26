const con = require("../connection")
const score = require('../functions/reportScore')


module.exports = {
    name: 'score',
    description: "results the lobby. <score (red team score) (blue team score)",
    aliases: ['r', 'result', 's', 'report'],

    execute(message, args) {
        con.query('SELECT * FROM lobby', (error, data) => {
            for (var i = 0; i < data.length; i++) {
                if (data[i].id == message.author.id) {
                    score(message, args)

                }
            }
        })


    },
};
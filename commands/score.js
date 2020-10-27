const con = require("../connection")
const score = require('../functions/reportScore')
const config = require('../config.json');


module.exports = {
    name: 'score',
    description: "results the lobby. <score (red team score) (blue team score)",
    aliases: ['r', 'result', 'report'],

    execute(message, args) {
        con.query('SELECT * FROM lobby', (error, data, fields) => {
            if (error) {
                message.channel.send("There is no lobby to score!")
            }

            else if (data.length == config.size) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].id == message.author.id) {
                        con.query("SELECT * FROM scores WHERE id =?", message.author.id, (error, data) => {
                            if (error) {
                                score(message, args)
                            }
                            else if (data.length == 0) {
                                score(message, args)

                            }
                            else {
                                con.query("UPDATE scores SET ?  WHERE id =?", [{ redScore: args[0], blueScore: args[1] }, message.author.id], (error, data) => {

                                    if (error)
                                        console.log("whoops")
                                })
                            }

                        }
                        )



                    }
                }
            }
            else {
                message.channel.send("There is no game to result at the moment!")
            }
        })


    },
};
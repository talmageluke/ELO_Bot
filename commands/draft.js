const con = require("../connection")

module.exports = {
    name: 'draft',
    description: 'Draft a player by tagging them after the command!',
    aliases: ['d'],

    execute(message, args) {
        let redCapt
        let blueCapt

        con.query("SELECT * FROM redTeam WHERE isCaptain = TRUE", (error, data) => {
            if (error) {
                message.channel.send("There is no draft currently")
            }
            redCapt = data.shift()
            return redCapt

        })
        con.query("SELECT * FROM blueTeam WHERE isCaptain = TRUE", (error, data) => {
            if (error) {
                console.log("idk whats going on if this happens")
            }

            blueCapt = data.shift()
            return blueCapt

        })
    },
};



       //        if (message.author.tag == redCapt.tag) {
        //            channel.send(args)
        //        }
        //        else if (message.author.tag == blueCapt.tag) {
        //            channel.send(args)
        //        }

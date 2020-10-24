const con = require("../connection")
const config = require('../config.json');


let draft = (message) => {
    con.query("SELECT * FROM lobby ORDER BY elo DESC", (error, data) => {
        con.query("CREATE TABLE redTeam(tag VARCHAR(30), elo INT, isCaptain BOOLEAN, PRIMARY KEY(tag))", (error, data) => {
            if (error) throw error

        })
        con.query("CREATE TABLE blueTeam(tag VARCHAR(30), elo INT, isCaptain BOOLEAN, PRIMARY KEY (tag))", (error, data) => {
            if (error) throw error

        })
        let redCaptain = data.shift()
        let blueCaptain = data.shift()
        message.channel.send(redCaptain.tag + " and " + blueCaptain.tag + " are the captains")
        con.query("DELETE FROM lobby WHERE tag = ?", redCaptain.tag, (error, results) => {
            con.query("DELETE FROM lobby WHERE tag =?", blueCaptain.tag, (e, d) => {
            })
        })
        con.query("INSERT INTO redTeam SET ?", { tag: redCaptain.tag, elo: redCaptain.elo, isCaptain: true })
        con.query("INSERT INTO blueTeam SET ?", { tag: blueCaptain.tag, elo: blueCaptain.elo, isCaptain: true })


    })
}

module.exports = draft
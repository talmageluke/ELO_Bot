const Discord = require("discord.js");
const PrettyTable = require("prettytable");
const client = new Discord.Client();
const config = require('./config.json');
const con = require("./connection")


client.once("ready", () => {
    console.log("I am ready!");
});

//listens for messages in all channels
client.on("message", (message) => {
    //looking for messages with the correct prefix
    if (message.content.startsWith(config.prefix)) {
        // cuts off the prefix 
        let command = message.content.substring(1)
        command = command.toLowerCase()
        let currentUser = message.author
        let currentChannel = message.channel
        //commands
        switch (command) {
            case "register":
                addUser(currentUser, currentChannel)
                break;
            case "profile":
                profile(currentUser, currentChannel)
                break;
            case "leaderboard":
                leaderboard(currentChannel)
                break;
            case "start":
                start(currentChannel)
                break;
            case "join":
                join(currentChannel, currentUser)
                break;
            case "lobby":
                printLobby(currentChannel)
                break;
            case "closelobby":
                closeLobby(currentChannel)
                break;
            case "leave":
                leave(currentUser, currentChannel)
                break;
            case "hoff":
                hoffsucks(currentChannel)
                break;
            case "help":
                help(currentChannel)
                break;
            case "uhh":
                currentChannel.send("https://youtu.be/IqdZNm-QqNg")
                break;
            default:
                if (message.author.id == 209772533346598912) {
                    message.channel.send("Fuck off hoffdouche")
                }
        }
    }
});
//this function adds a new user to the Mysql db if he is not already in there, also creates a separate table for head to head comparisons
function addUser(currentUser, currentChannel) {
    //searches db for user
    con.query("SELECT * FROM players WHERE tag = ?", currentUser.tag, function (error, results) {

        if (results.length == 0) {
            //if user is not found in the db it will add them here
            con.query("INSERT INTO players SET ?", { userName: currentUser.username, tag: currentUser.tag, elo: 1000, wins: 0, losses: 0, totalGames: 0 }, function (error, response) {
                if (error) {
                    throw error
                }
                //this creates the separate table for their own head to heads comparisons
                con.query(
                    "CREATE TABLE ??(opponent VARCHAR(30)NOT NULL, winsWith INT, lossesWith INT, winsAgainst INT, lossesAgainst INT, PRIMARY KEY(opponent));", currentUser.username,
                    function (error, response) {
                        if (error) throw error
                    })
                //sens a message to the current channel
                currentChannel.send("Registered succefully!")
            })
        }
        else {
            currentChannel.send("You are already registered!")
        }
    })
}
//this pulls up the users profile if it exists, it tells the user to register if they do not exist in the db yet
function profile(currentUser, currentChannel) {
    con.query("SELECT * FROM players WHERE tag = ?", currentUser.tag, function (error, results) {
        if (results.length == 0) {

            currentChannel.send("You are not registered. Please enter " + config.prefix + "register to register!")
        }
        else {
            currentChannel.send("You are currently registered. Your username is " + results[0].userName + " and your ELO is " + results[0].elo)
        }
    }
    )
}
//displays the leaderboard
function leaderboard(currentChannel) {
    let rows = []
    //sql connection to pull all players
    con.query("SELECT * from players", function (error, results) {
        //pushes sql results into an array
        for (var i = 0; i < results.length; i++) {
            let player = [results[i].userName, results[i].elo, results[i].wins, results[i].losses, results[i].totalGames]
            rows.push(player)
        }
        //creates a table and orders it by ELO
        leaderTable = new PrettyTable()
        var headers = ["Name", "ELO", "Wins", "Losses", "Total Games"]
        leaderTable.create(headers, rows)
        leaderTable.sortTable("ELO", reverse = true)
        var tableContent = leaderTable.toString();
        //sends leaderboard to current channel inside of a codeblock
        currentChannel.send("```" + tableContent + "```")
    })
}
function start(currentChannel) {
    con.query("CREATE TABLE lobby(tag VARCHAR(30), username VARCHAR(30), elo INT, PRIMARY KEY (tag));", (error, result) => {
        currentChannel.send("Lobby created! Type " + config.prefix + "join to join!")
    })
}
function join(currentChannel, currentUser) {
    con.query("SELECT * FROM players WHERE tag = ?", currentUser.tag, (error, results) => {

        if (results.length == 0) {
            currentChannel.send("You are not registered. Please type " + config.prefix + "register to register then try rejoining!")
        }
        else {
            con.query("SELECT * FROM lobby WHERE username = ?", currentUser.username, (error, lobbyCheck) => {
                if (error) {
                    currentChannel.send("There does not seem to be a lobby started. Type " + config.prefix + "start to start one!")
                }
                else if (lobbyCheck.length !== 0) {
                    currentChannel.send("You are already in the lobby!")
                }
                else {
                    // if (lobbyCheck.length == 0) {

                    con.query("INSERT INTO lobby SET ?", { tag: results[0].tag, username: results[0].userName, elo: results[0].elo }, (error, data) => {
                        if (error) { throw error }
                        currentChannel.send(currentUser.username + " has joined the lobby!").then(() => {
                            con.query("SELECT * FROM lobby", (error, data) => {

                                if (data.length == config.size) {

                                    startDraft(currentChannel)
                                }
                                else {
                                    printLobby(currentChannel)

                                }
                            })
                        })
                    })
                }
            })
        }
    })
}
function printLobby(currentChannel) {
    let rows = []
    con.query("SELECT * FROM lobby", (error, results) => {
        if (error) {
            currentChannel.send("There does not seem to be a lobby open. Type " + config.prefix + "start to start the lobby!")
        }
        else {
            for (var i = 0; i < results.length; i++) {
                let player = [results[i].username, results[i].elo]
                rows.push(player);

            }
            lobbyTable = new PrettyTable()
            var headers = ["Name", "ELO"]
            lobbyTable.create(headers, rows)
            lobbyTable.sortTable("ELO", reverse = true)
            var tableContent = lobbyTable.toString();
            //sends leaderboard to current channel inside of a codeblock
            currentChannel.send("Here is the current lobby! ```" + tableContent + "``` Type " + config.prefix + "join to join!")
        }
    })
}
function closeLobby(currentChannel) {
    con.query("DROP TABLE lobby;", (error, results) => {
        if (error) {
            currentChannel.send("There does not seem to be a lobby open!")
        }
        else {
            currentChannel.send("Lobby closed! Type " + config.prefix + "start to start another one!")
        }
    })
}
function help(currentChannel) {
    currentChannel.send("this shit dont work")
}
function leave(currentUser, currentChannel) {

    con.query("SELECT * FROM lobby WHERE username = ?", currentUser.username, (error, results) => {
        if (results.length === 0) {
            currentChannel.send("You are not currently in the lobby. Type " + config.prefix + "join to join!")
        }
        else {
            con.query("DELETE FROM lobby WHERE username = ?", currentUser.username, (error, results) => {
                currentChannel.send(currentUser.username + " has left the lobby!")
                printLobby(currentChannel)
            })
        }
    })
}
function startDraft(currentChannel) {
    currentChannel.send("Draft is starting! (actually it isnt because theres no code)")
    con.query("SELECT * FROM lobby ORDER BY elo DESC", (error, data) => {
        let redCaptain = data.shift()
        redCaptain = redCaptain.tag
        let blueCaptain = data.shift()
        blueCaptain = blueCaptain.tag
        currentChannel.send(redCaptain + " and " + blueCaptain)
        con.query("DELETE FROM lobby WHERE tag = ?", redCaptain, (error, results) => {
            con.query("DELETE FROM lobby WHERE tag =?", blueCaptain, (e, d) => {
                picking(currentChannel, redCaptain, blueCaptain)
            })
        })

    })
}
function draftTable(currentChannel) {
    let rows = []
    con.query("SELECT * FROM lobby", (error, results) => {
        if (error) {
            currentChannel.send("There does not seem to be a lobby open. Type " + config.prefix + "start to start the lobby!")
        }
        else {
            for (var i = 0; i < results.length; i++) {
                let player = [results[i].username, results[i].elo]
                rows.push(player);
            }
            dTable = new PrettyTable()
            var headers = ["Name", "ELO"]
            dTable.create(headers, rows)
            dTable.sortTable("ELO", reverse = true)
            var tableContent = dTable.toString();

            currentChannel.send("```" + tableContent + "```")
        }
    }
    )
    return;
}
function hoffsucks(currentChannel) {
    currentChannel.send("Hoffguy can suck my robodick")
}
function picking(currentChannel, redCaptain, blueCaptain) {
    con.query("SELECT * FROM lobby", (error, results) => {
        let picks = results.length
        for (var i = 0; picks > i; i++) {
            currentChannel.send(blueCaptain + " please pick a player with -pick <player_name>")
            draftTable(currentChannel)
            currentChannel.send(redCaptain + " please pick a player with -pick <player_name>")
            draftTable(currentChannel)
        }
    }
    )
}

//bot token
client.login(config.token);
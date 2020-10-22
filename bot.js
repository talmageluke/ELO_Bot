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
            case "help":
                help(currentChannel)
                break;
            default:
                currentChannel.send("This is not a command")
        }
    }
});

//this function adds a new user to the Mysql db if he is not already in there, also creates a separate table for head to head comparisons
function addUser(currentUser, currentChannel) {
    //searches db for user
    con.query("SELECT * FROM players WHERE id = ?", currentUser.id, function (error, results) {

        if (results.length == 0) {
            //if user is not found in the db it will add them here
            con.query("INSERT INTO players SET ?", { userName: currentUser.username, id: currentUser.id, elo: 1000, wins: 0, losses: 0, totalGames: 0 }, function (error, response) {
                if (error) {
                    throw error
                }
                //this creates the separate table for their own head to heads comparisons
                con.query(
                    "CREATE TABLE ??(opponent INT NOT NULL, winsWith INT, lossesWith INT, winsAgainst INT, lossesAgainst INT, PRIMARY KEY(opponent));", currentUser.username,
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
    con.query("SELECT * FROM players WHERE id = ?", currentUser.id, function (error, results) {
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
    con.query("CREATE TABLE lobby(id BIGINT NOT NULL, username VARCHAR(30), elo INT, PRIMARY KEY (id));", (error, result) => {
        currentChannel.send("Lobby created! Type " + config.prefix + "join to join!")
    })
}

function join(currentChannel, currentUser) {

    con.query("SELECT * FROM players WHERE id = ?", currentUser.id, (error, results) => {

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

                    con.query("INSERT INTO lobby SET ?", { id: results[0].id, username: results[0].userName, elo: results[0].elo }, (error, data) => {
                        if (error) { throw error }
                        currentChannel.send(currentUser.username + " has joined the lobby!").then(() => {
                            con.query("SELECT * FROM lobby", (error, data) => {
                                printLobby(currentChannel)
                                if (data.length == 6) {

                                    startDraft(currentChannel)
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
}

//bot token
client.login(config.token);
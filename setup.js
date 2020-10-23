const con = require("./connection")

con.query("DROP DATABASE IF EXISTS elo_db", (error, response) => {
    if (error) throw error
    else
        console.log("database dropped!")
})
con.query("CREATE DATABASE elo_db;", (error, response) => {
    if (error) throw error
    else
        console.log("database created")
})
con.query("USE elo_db;", (error, response) => {
    if (error) throw error
    else
        console.log("Using the ELO DB")
})
con.query("CREATE TABLE players(tag VARCHAR(30), username VARCHAR(30) NOT NULL, elo INT, wins INT, losses INT, totalGames INT, PRIMARY KEY(tag));", (error, response) => {
    if (error) throw error
    else
        console.log("Players table created!")
})

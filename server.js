const fs = require("fs");
const Discord = require("discord.js");
const Fortnite = require("fortnite");
const client = new Discord.Client();
const config = require("./config.json");
const http = require('http');
const express = require('express');
const app = express();


app.get("/", (request, response) => response.sendStatus(200));
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

client.on("ready", () => {
  client.user.setActivity('?fortnite + name');
});

client.on("message", (message) => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  if(command === "server") return;

  // The list of if/else is replaced with those simple 2 lines:
  try {
    let commandFile = require(`./command/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
    console.error(err);
  }
  
});

client.login(process.env.TOKEN);
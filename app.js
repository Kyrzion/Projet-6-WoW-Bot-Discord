const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const request = require('request');
const General = require('./model/wow_general.js');
const Enmap = require("enmap");
const fs = require("fs");
client.config = config;

//Préfixe utilisé pour les commandes du bot.
const prefix = config.prefix;

/**
 * Se connecte en utilisant le token stocker dans config.json
 * @param {char} 
 */
client.login(config.tokenDiscord);


// ---------------------------------------------------------------------------------------------------------------------

fs.readdir("./events", (err, files) => {
  if (err) return console.log(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    const eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();
fs.readdir("./commands", (err, files) => {
  if (err) return console.log(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return
    const props = require(`./commands/${file}`);
    const commandName = file.split(".")[0];
    console.log(`Lancement de la commande ${commandName}`);
    client.commands.set(commandName, props);
  });
});




// ---------------------------------------------------------------------------------------------------------------------





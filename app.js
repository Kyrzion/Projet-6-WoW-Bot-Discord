const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json"); 
const request = require('request');
const General = require('./model/wow_general.js');




//Préfixe utilisé pour les commandes du bot.
const prefix = config.prefix;

  

/**
 * Se connecte en utilisant le token stocker dans config.json
 * @param {char} 
 */
client.login(config.tokenDiscord);

// Définir le jeu et l'état du bot.
client.on("ready", () => {
    client.user.setPresence({ game: { name: 'being created' }, status: 'dnd' })
    console.log(`Logged in as ${client.user.tag}!`);
});

// Le bot répond aux message "!ping" et "!Hello".
client.on("message", message => {
    // Stop si le prefix n'est pas utilisé ou si l'utilisateur est un bot.
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if(message.content === prefix + "ping"){
        message.reply("Pong !")
    }

    if(message.content === prefix + "help"){
        message.reply("Voici la liste des commandes disponibles:")
    }

    if(message.content === prefix + "jeton"){
      data = new General({
        'secret': config.secretid,
        'client': config.clientid,
        'need': 'prix',
      })
        message.reply(data.response)
      }
  }
);

// Message de bienvenue sur le serveur (en MP).
client.on('guildMemberAdd', member => {
    member.createDM().then(channel => {
      return channel.send('Bienvenue sur le serveur ' + member.displayName)
    }).catch(console.error)
  });

  

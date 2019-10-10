const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json"); 
const bfa = require('./model/wow_bfa.js');
const classic = require('./model/wow_classic.js');
//const general = require('./model/wow_general.js');
const request = require('request');
const blizzard = require('blizzard.js').initialize({
    key: config.clientid,
    secret: config.secretid,
    origin: 'eu', // optional
    locale: 'fr_FR', // optional
    //token: config.clientid // optional
  });

//Préfixe utilisé pour les commandes du bot.
const prefix = config.prefix;

async function getItem (id) {
    try {
      await blizzard.getApplicationToken()
        .then(response => {
          blizzard.defaults.token = response.data.access_token
        });
      const item = await blizzard.wow.item({ id: id });
      console.log(item.data.name +'-'+ item.data.description)
    } catch (err) {
      console.error(err);
    }
  }

  async function getToken () {
    try {
      await blizzard.getApplicationToken()
        .then(response => {
          blizzard.defaults.token = response.data.access_token
        });
      const token = await blizzard.wow.token();
      return token.data.price
    } catch (err) {
      console.error(err);
    }
  }
  getItem(168185);
  

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
      const prix = getToken();
      message.reply(`Le prix du jeton est de ${prix} PO`)
      console.log(prix);
  }
});

// Message de bienvenue sur le serveur (en MP).
client.on('guildMemberAdd', member => {
    member.createDM().then(channel => {
      return channel.send('Bienvenue sur le serveur ' + member.displayName)
    }).catch(console.error)
  });

  

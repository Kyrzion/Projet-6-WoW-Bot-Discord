//const bfa         = require('./model/wow_bfa.js');
//const classic     = require('./model/wow_classic.js');
const Discord = require("discord.js");
const Blizzard = require('blizzard.js');
const Translation = require('./translate.js');
const request = require('request');

const Canvas = require ("canvas");
const snekfetch = require ("snekfetch");

class General {
  constructor(config) {
    this.blizzard = Blizzard.initialize({
      key: config.client,
      secret: config.secret,
      origin: 'eu', // optional
      locale: 'fr_FR', // optional
      //token: config.clientid // optional
    });
    this.message = config.transporteur;
    console.log(this.message.content);
    this.translate = new Translation('fr_FR');
    switch (config.need) {
      case "prix":
        this.response = this.getPrice();
        break;
      case "realm":
        this.response = this.getRealmStatus();
        break;
      case "ilvl":
        this.response = this.getIlvl(this.message);
        break;
        case "test":
          this.response = this.getImage(this.message);
          break;
    }
  }

  async getPrice() {
    try {
      await this.blizzard.getApplicationToken()
        .then(response => {

          this.blizzard.defaults.token = response.data.access_token
        });
      const token = await this.blizzard.wow.token();
      let response = this.translate.text("le prix du jeton est de ");
      this.message.reply(response + token.data.price / 10000 + " PO");
      return;
    } catch (err) {
      console.error(err);
    }
  }

  async getRealmStatus(realms) {
    try {
      await this.blizzard.getApplicationToken()
        .then(response => {

          this.blizzard.defaults.token = response.data.access_token
        });
      const status = await this.blizzard.wow.realmStatus({ realms: realms });
      let response = this.translate.text("Le serveur est ");
      this.message.reply(response + status.data.realms[0].name+'/'+status.data.realms[0].status);
      console.log(status.data.realms[0].name+ '/' +status.data.realms[0].status);
      return;
    } catch (err) {
      console.error(err);
    }
  };

  async getMythicRaidLeaderboard(raid, faction) {
    try {
      await this.blizzard.getApplicationToken()
        .then(response => {

          this.blizzard.defaults.token = response.data.access_token
        });
      const raidmythic = await this.blizzard.wow.mythicRaidLeaderboard({ raid: raid, faction: faction });
      let response = this.translate.text("Le prix du jeton est de ");
      this.message.reply(response + raidmythic);
      console.log(raidmythic);
      return;
    } catch (err) {
      console.error(err);
    }
  };




  async getResponse() {
    await this.response;
    return this.response;
  }

  async getItem(id) {
    try {
      await this.blizzard.getApplicationToken()
        .then(response => {
          this.blizzard.defaults.token = response.data.access_token
        });
      const item = await blizzard.wow.item({ id: id });
      console.log(item.data.name + '-' + item.data.description) //mettre un return dans une commande
    } catch (err) {
      console.error(err);
    }
  };
  

  async getIlvl(message) {
    var commandcut = message.content.substr("!ilvl ".length);
    var argumentarray = commandcut.split("-");
   
    var Player = argumentarray[0];
    var Realm = argumentarray[1];
    var Region = argumentarray[2];

    console.log( " Fetching iLVL for " + Player + " on server " + Realm + " ( " + Region + " )");
    var options = {
      url: "https://raider.io/api/v1/characters/profile?region=" + Region + "&realm=" + Realm + "&name=" + Player + "&fields=gear,mythic_plus_scores_by_season,mythic_plus_ranks,mythic_plus_recent_runs,mythic_plus_scores"
    };

    request.get(options, function (err, resp, body) {
      if (err) {
        reject(err);
      } else {
        //resolve(JSON.parse(body));
        let json = body;
        var parsedJson = JSON.parse(json);
      }

     
      let response ='Voici les stats de ' + Player.charAt(0).toUpperCase() + Player.substring(1).toLowerCase() + ' sur le serveur ' + Realm.charAt(0).toUpperCase() + Realm.substring(1).toLowerCase() + ' (' + Region.toUpperCase() + ')';
      let personnage='Classe: ' + parsedJson.class + '\n' + ' '+ 'Spé: ' + parsedJson.active_spec_name + '\n' + ' ' + 'ilvl: ' + parsedJson.gear.item_level_equipped;
      message.reply(response + '\n' + personnage);
      console.log(parsedJson.name);
      return;
      
    })
    
  }

  

}
module.exports = General;
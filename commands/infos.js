const Discord = require("discord.js");
const Canvas = require("canvas");
const snekfetch = require("snekfetch");
const request = require('request');

exports.run = async (client, message, member) => {

  var commandcut = message.content.substr("!infos".length);
  var argumentarray = commandcut.split("-");

  var Player = argumentarray[0];
  var Realm = argumentarray[1];
  var Region = argumentarray[2];

  console.log(" Fetching iLVL for " + Player + " on server " + Realm + " ( " + Region + " )");
  var options = {
    url: "https://raider.io/api/v1/characters/profile?region=" + Region + "&realm=" + Realm + "&name=" + Player + "&fields=gear,mythic_plus_scores_by_season,mythic_plus_ranks,mythic_plus_recent_runs,mythic_plus_scores"
  };

  request.get(options, async function (err, resp, body) {
    if (err) {
      reject(err);
    } else {
      let json = body;
      var parsedJson = JSON.parse(json);
    }

    //console.log(parsedJson);
    let response = 'Stats de ' + Player.charAt(1).toUpperCase() + Player.substring(2).toLowerCase() + ' sur ' + Realm.charAt(0).toUpperCase() + Realm.substring(1).toLowerCase() + ' (' + Region.toUpperCase() + ')';
    let classe = 'Classe: ';
    let personnage = parsedJson.class + ' - ' + parsedJson.active_spec_name;
    let ilvl = 'ilvl: ';
    let item_level = parsedJson.gear.item_level_equipped ;
    let score = "Score: ";
    let mythic = parsedJson.mythic_plus_scores.all;
    let recent = 'Recent runs:';
    let dungeon1 = '  ' + parsedJson.mythic_plus_recent_runs[0].dungeon + ' - ' + 'Clé +' + parsedJson.mythic_plus_recent_runs[0].mythic_level + ' - ' + 'Upgrade +' + parsedJson.mythic_plus_recent_runs[0].num_keystone_upgrades;
    let dungeon2 = '  ' + parsedJson.mythic_plus_recent_runs[1].dungeon + ' - ' + 'Clé +' + parsedJson.mythic_plus_recent_runs[1].mythic_level + ' - ' + 'Upgrade +' + parsedJson.mythic_plus_recent_runs[1].num_keystone_upgrades;
    let dungeon3 = '  ' + parsedJson.mythic_plus_recent_runs[2].dungeon + ' - ' + 'Clé +' + parsedJson.mythic_plus_recent_runs[2].mythic_level + ' - ' + 'Upgrade +' + parsedJson.mythic_plus_recent_runs[2].num_keystone_upgrades;
    let rank = "Ranking: ";
    let ranksoverall = '  ' + 'Overall: World: ' + parsedJson.mythic_plus_ranks.overall.world + ' - ' + 'Region: ' + parsedJson.mythic_plus_ranks.overall.region + '\n' + '           Realm: ' + parsedJson.mythic_plus_ranks.overall.realm
    let ranksclass = '  ' + 'Class  : World: ' + parsedJson.mythic_plus_ranks.class.world + ' - ' + 'Region: ' + parsedJson.mythic_plus_ranks.class.region + '\n' + '           Realm: ' + parsedJson.mythic_plus_ranks.class.realm
    let armory = "Plus d'informations sur " + 'https://worldofwarcraft.com/fr-fr/character/' + Region + '/' + Realm + '/' + Player.trim(); + " !";

    //message.reply(response + '\n' + personnage + '\n' + mythic + '\n' + dungeon1 + '\n' + dungeon2 + '\n' + dungeon3 + '\n' + ranksoverall + '\n' + ranksclass + '\n' + armory);
    //return;

    const canvas = Canvas.createCanvas(450, 300);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage("./img/wow_infos.png");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

    ctx.font = "18px Consolas";
    ctx.fillStyle = "#fff"
    ctx.fillText(response, 10, 25);
 
    ctx.font = "18px Consolas";
    ctx.fillStyle = "#FE9741"
    ctx.fillText(classe, 10, 50);
    ctx.font = "18px Consolas";
    ctx.fillStyle = "#fff"
    ctx.fillText(personnage, 82, 50);

    ctx.font = "18px Consolas";
    ctx.fillStyle = "#5BFE41"
    ctx.fillText(ilvl, 10, 70);
    ctx.font = "18px Consolas";
    ctx.fillStyle = "#fff"
    ctx.fillText(item_level, 65, 70);

    ctx.font = "18px Consolas";
    ctx.fillStyle = "#A561FD"
    ctx.fillText(score, 10, 85);
    ctx.font = "18px Consolas";
    ctx.fillStyle = "#fff"
    ctx.fillText(mythic, 72, 85);

    ctx.font = "18px Consolas";
    ctx.fillStyle = "#324AFE"
    ctx.fillText(recent, 10, 110);
    ctx.font = "18px Consolas";
    ctx.fillStyle = "#fff"
    ctx.fillText(dungeon1, 10, 126);
    ctx.font = "18px Consolas";
    ctx.fillStyle = "#fff"
    ctx.fillText(dungeon2, 10, 142);
    ctx.font = "18px Consolas";
    ctx.fillStyle = "#fff"
    ctx.fillText(dungeon3, 10, 160);

    ctx.font = "18px Consolas";
    ctx.fillStyle = "#FE3B27"
    ctx.fillText(rank, 10, 182);
    ctx.font = "18px Consolas";
    ctx.fillStyle = "#fff"
    ctx.fillText(ranksoverall, 10, 198);
    ctx.font = "18px Consolas";
    ctx.fillStyle = "#fff"
    ctx.fillText(ranksclass, 10, 240);

   


    const attachment = new Discord.Attachment(
      canvas.toBuffer(),
      'infos-image.png'
    );

    message.reply(attachment)
    return;
  })
}
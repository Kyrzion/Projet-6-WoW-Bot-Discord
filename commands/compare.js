const Discord = require("discord.js");
const Canvas = require("canvas");
const snekfetch = require("snekfetch");
const request = require('request');

exports.run = async (client, message, member) => {

  var commandcut = message.content.substr("!compare".length);
  var argumentarray = commandcut.split("-");

  var Player = argumentarray[0];
  var Realm = argumentarray[1];
  var Region = argumentarray[2];

  var Player2 = argumentarray[3];
  var Realm2 = argumentarray[4];
  var Region2 = argumentarray[5];

  console.log(" Fetching iLVL for " + Player + " on server " + Realm + " ( " + Region + " ) and " + Player2 + " on server " + Realm2 + " ( " + Region2 + " )");
  var options = {
    url: "https://raider.io/api/v1/characters/profile?region=" + Region + "&realm=" + Realm + "&name=" + Player + "&fields=gear,mythic_plus_scores_by_season,mythic_plus_ranks,mythic_plus_recent_runs,mythic_plus_scores"
  };
  var options2 = {
    url: "https://raider.io/api/v1/characters/profile?region=" + Region2 + "&realm=" + Realm2 + "&name=" + Player2 + "&fields=gear,mythic_plus_scores_by_season,mythic_plus_ranks,mythic_plus_recent_runs,mythic_plus_scores"
  };

  request.get(options, async function (err, resp, body) {
    if (err) {
      reject(err);
    } else {
      let json = body;
      var parsedJson = JSON.parse(json);
    }
    request.get(options2, async function (err, resp, body) {
        if (err) {
          reject(err);
        } else {
          let json2 = body;
          var parsedJson2 = JSON.parse(json2);
        }
    

    //console.log(parsedJson);
    let response = Player.charAt(1).toUpperCase() + Player.substring(2).toLowerCase() + '-' + Realm.charAt(0).toUpperCase() + Realm.substring(1).toLowerCase() + ' (' + Region.toUpperCase() + ')' + ' & ' +
    Player2.charAt(0).toUpperCase() + Player2.substring(1).toLowerCase() + '-' + Realm2.charAt(0).toUpperCase() + Realm2.substring(1).toLowerCase() + ' (' + Region2.toUpperCase() + ')';
   
    let classe = 'Class: ';
    let personnage = parsedJson.class + '/' + parsedJson.active_spec_name + ' & ' + parsedJson2.class + '/' + parsedJson2.active_spec_name;
    let ilvl = 'ilvl: ';
    let item_level = ' ' + parsedJson.gear.item_level_equipped + '   &   ' + parsedJson2.gear.item_level_equipped ;

    let score = "Score: ";
    let mythic = ' ' + parsedJson.mythic_plus_scores.all + '   &   ' + parsedJson2.mythic_plus_scores.all;

    let rank = "Ranking: " + Player.charAt(1).toUpperCase() + Player.substring(2).toLowerCase();
    let ranksoverall = '  ' + 'Overall: World: ' + parsedJson.mythic_plus_ranks.overall.world + ' - ' + 'Region: ' + parsedJson.mythic_plus_ranks.overall.region + '\n' + '           Realm: ' + parsedJson.mythic_plus_ranks.overall.realm
    let ranksclass = '  ' + 'Class  : World: ' + parsedJson.mythic_plus_ranks.class.world + ' - ' + 'Region: ' + parsedJson.mythic_plus_ranks.class.region + '\n' + '           Realm: ' + parsedJson.mythic_plus_ranks.class.realm

    let rank2 = "Ranking: " + Player2.charAt(0).toUpperCase() + Player2.substring(1).toLowerCase();
    let ranksoverall2 = '  ' + 'Overall: World: ' + parsedJson2.mythic_plus_ranks.overall.world + ' - ' + 'Region: ' + parsedJson2.mythic_plus_ranks.overall.region + '\n' + '           Realm: ' + parsedJson2.mythic_plus_ranks.overall.realm
    let ranksclass2 = '  ' + 'Class  : World: ' + parsedJson2.mythic_plus_ranks.class.world + ' - ' + 'Region: ' + parsedJson2.mythic_plus_ranks.class.region + '\n' + '           Realm: ' + parsedJson2.mythic_plus_ranks.class.realm
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
    ctx.font = "16px Consolas";
    ctx.fillStyle = "#fff"
    ctx.fillText(personnage, 82, 50);

    ctx.font = "18px Consolas";
    ctx.fillStyle = "#5BFE41"
    ctx.fillText(ilvl, 10, 70);
    ctx.font = "16px Consolas";
    ctx.fillStyle = "#fff"
    ctx.fillText(item_level, 65, 70);

    ctx.font = "18px Consolas";
    ctx.fillStyle = "#A561FD"
    ctx.fillText(score, 10, 85);
    ctx.font = "16px Consolas";
    ctx.fillStyle = "#fff"
    ctx.fillText(mythic, 72, 85);

    ctx.font = "18px Consolas";
    ctx.fillStyle = "#324AFE"
    ctx.fillText(rank, 10, 115);
    ctx.font = "16px Consolas";
    ctx.fillStyle = "#fff"
    ctx.fillText(ranksoverall, 10, 135);
    ctx.font = "16px Consolas";
    ctx.fillStyle = "#fff"
    ctx.fillText(ranksclass, 10, 175);

    ctx.font = "18px Consolas";
    ctx.fillStyle = "#FE3B27"
    ctx.fillText(rank2, 10, 210);
    ctx.font = "16px Consolas";
    ctx.fillStyle = "#fff"
    ctx.fillText(ranksoverall2, 10, 230);
    ctx.font = "16px Consolas";
    ctx.fillStyle = "#fff"
    ctx.fillText(ranksclass2, 10, 270);

    const attachment = new Discord.Attachment(
      canvas.toBuffer(),
      'infos-image.png'
    );

    message.reply(attachment)
    return;
  })
})
  
}
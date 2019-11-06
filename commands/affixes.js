const Discord = require("discord.js");
const Canvas = require("canvas");
const snekfetch = require("snekfetch");
const request = require('request');

const timeline = {
  "D79": {
    "affixes": [7, 13, 9, 'Tides'],
    "next": "AB3"
  },
  "AB3": {
    "affixes": [11, 3, 10, 'Enchanted'],
    "next": "469"
  },
  "469": {
    "affixes": [6, 4, 9, 'Void'],
    "next": "AE5"
  },
  "AE5": {
    "affixes": [5, 14, 10, 'Tides'],
    "next": "B29"
  },
  "B29": {
    "affixes": [11, 2, 9, 'Enchanted'],
    "next": "AC7"
  },
  "AC7": {
    "affixes": [7, 12, 10, 'Void'],
    "next": "D69"
  },
  "D69": {
    "affixes": [6, 13, 9, 'Tides'],
    "next": "AC8"
  },
  "AC8": {
    "affixes": [8, 12, 10, 'Enchanted'],
    "next": "359"
  },
  "359": {
    "affixes": [5, 3, 9, 'Void'],
    "next": "A27"
  },
  "A27": {
    "affixes": [7, 2, 10, 'Tides'],// on est là
    "next": "B49"
  },
  "B49": {
    "affixes": [11, 4, 9, 'Enchanted'],
    "next": "AE8"
  },
  "AE8": {
    "affixes": [8, 14, 10, 'Void'],
    "next": "D79"
  },
};

const url = "https://raider.io/api/v1/mythic-plus/affixes?region=eu&locale=fr";


/**
 * [findWeek description]
 * @param  {Array} args [description]
 * @return {[type]}      [description]
 */
function findNextWeekAffixes(args) {
  args = args.sort();
  let id = args[0].toString(16) + args[1].toString(16) + args[2].toString(16);
  id = id.toUpperCase();
  let nextWeek = timeline[timeline[id].next].affixes;
  console.log(nextWeek);
  let next = lang.getTrad("next")
  return `\n` + next + `\n` + '      ' + lang.getTrad("affix" + nextWeek[0]) + `\n` + '      ' + lang.getTrad("affix" + nextWeek[1]) + `\n` + '      ' + lang.getTrad("affix" + nextWeek[2])
}

exports.run = async (client, message, member) => {
  var options = { "url": url };

  request.get(options, function (err, resp, body) {
    if (err) {
      reject(err);
    }
    else {
      let json = body;
      var parsedJson = JSON.parse(json);
    }

    
    let thisWeek = lang.getTrad("thisWeek");
    let weekly0 = parsedJson.affix_details[0].id;
    let weekly1 = parsedJson.affix_details[1].id;
    let weekly2 = parsedJson.affix_details[2].id;
    let weekly3 = parsedJson.affix_details[3].id;
    
    message.reply(`\n ${thisWeek}\n
      ${lang.getTrad("affix" + weekly0)}
      ${lang.getTrad("affix" + weekly1)}
      ${lang.getTrad("affix" + weekly2)}
      ${lang.getTrad("affix" + weekly3)} \n
      ${findNextWeekAffixes([parsedJson.affix_details[0].id, parsedJson.affix_details[1].id, parsedJson.affix_details[2].id])}
    `);
  })
}


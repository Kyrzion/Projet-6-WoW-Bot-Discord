const Discord = require("discord.js");
const Canvas = require("canvas");
const snekfetch = require("snekfetch");
const request = require('request');

exports.run = async (client, message, member) => {
    var options = {
        url: "https://raider.io/api/v1/mythic-plus/affixes?region=eu&locale=fr"
    };

    request.get(options, function (err, resp, body) {
        if (err) {
            reject(err);
        } else {
            let json = body;
            var parsedJson = JSON.parse(json);
        }
        // console.log(parsedJson);
        timeline = {
            "79D": {
                "affixes": [7, 13, 9, 'Tides'],
                "next": "3AB"
            },
            "3AB": {
                "affixes": [11, 3, 10, 'Enchanted'],
                "next": "649"
            },
            "649": {
                "affixes": [6, 4, 9, 'Void'],
                "next": "5EA"
            },
            "5EA": {
                "affixes": [5, 14, 10, 'Tides'],
                "next": "B29"
            },
            "B29": {
                "affixes": [11, 2, 9, 'Enchanted'],
                "next": "7CA"
            },
            "7CA": {
                "affixes": [7, 12, 10, 'Void'],
                "next": "6D9"
            },
            "6D9": {
                "affixes": [6, 13, 9, 'Tides'],
                "next": "8CA"
            },
            "8CA": {
                "affixes": [8, 12, 10, 'Enchanted'],
                "next": "539"
            },
            "539": {
                "affixes": [5, 3, 9, 'Void'], // on est là
                "next": "72A"
            },
            "72A": {
                "affixes": [7, 2, 10, 'Tides'],
                "next": "B49"
            },
            "B49": {
                "affixes": [11, 4, 9, 'Enchanted'],
                "next": "8EA"
            },
            "8EA": {
                "affixes": [8, 14, 10, 'Void'],
                "next": "79D"
            },
        };
     
    /**
     * [findWeek description]
     * @param  {Array} args [description]
     * @return {[type]}      [description]
     */
    function findNextWeekAffixes(args) {
        args = args.sort();
        let id = yourNumber.toString(args[0]) + yourNumber.toString(args[1]) + yourNumber.toString(args[2]);
       console.log(args);
         return timeline[timeline[id].next].affixes;
    }  
    message.reply(parsedJson.title + '\n' + '\n' + parsedJson.affix_details[0].name + ': ' + parsedJson.affix_details[0].description + '\n'
                                   + '\n' + parsedJson.affix_details[1].name + ': ' + parsedJson.affix_details[1].description + '\n'
                                   + '\n' + parsedJson.affix_details[2].name + ': ' + parsedJson.affix_details[2].description + '\n'
                                   + '\n' + parsedJson.affix_details[3].name + ': ' + parsedJson.affix_details[3].description );

})
}
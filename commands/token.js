const Discord = require("discord.js");
const Blizzard = require('blizzard.js');
const Translate = require('.././translate.js');
const config = require ('.././config.json');
const Canvas = require("canvas");
const snekfetch = require("snekfetch");



exports.run = async (client, member) => {
  const channel = member.guild.channels.find(ch => ch.name === "general");
  this.blizzard = Blizzard.initialize({
    key: config.clientid,
    secret: config.secretid,
    origin: 'eu', // optional
    locale: 'fr_FR', // optional
  });
  try {
    await this.blizzard.getApplicationToken()
      .then(response => {
        this.blizzard.defaults.token = response.data.access_token
      });
    const token = await this.blizzard.wow.token();
  
    //-----------------

    //translate = new Translate();
    const canvas = Canvas.createCanvas(350, 200);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage("./img/token.png");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

    ctx.font = "20px Consolas";
    ctx.fillStyle = "#fff";
    console.log("tokenPrice");
    let trad = lang.getTrad("tokenPrice")
    ctx.fillText(trad[0],trad[1],trad[2]);

    ctx.font = "60px Consolas";
    ctx.fillStyle = "#FFFC2E";
    ctx.fillText(token.data.price / 10000, 30, 140);

    ctx.font = "60px Consolas";
    ctx.fillStyle = "#FFF"
    ctx.fillText(' PO', 230, 140);
    const attachment = new Discord.Attachment(
      canvas.toBuffer(),
      'welcome-image.png'
    );


    //----------------
    // let response = "Le prix du jeton World of Warcraft est de ";
    // channel.send(response + token.data.price / 10000 + " PO");
    channel.send(attachment);
  } catch (err) {
    console.error(err);
  }

}
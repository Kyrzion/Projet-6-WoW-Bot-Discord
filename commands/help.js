const Discord = require("discord.js");
const Canvas = require("canvas");
const snekfetch = require("snekfetch");
const Translate = require('.././translate.js');

exports.run = async (client, member) => {
  const channel = member.guild.channels.find(ch => ch.name === "general");
  

    const canvas = Canvas.createCanvas(450, 300);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage("./img/wow_infos.png");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

    ctx.font = "20px Consolas";
    ctx.fillStyle = "#fff"
    let helpList = lang.getTrad("helpList")
    ctx.fillText(helpList[0],helpList[1],helpList[2]);

    ctx.font = "14px Consolas";
    ctx.fillStyle = "#FFFC2E"
    let helpToken = lang.getTrad("helpToken")
    ctx.fillText(helpToken[0],helpToken[1],helpToken[2]);

    ctx.font = "14px Consolas";
    ctx.fillStyle = "#FFFC2E"
    let helpInfos = lang.getTrad("helpInfos")
    ctx.fillText(helpInfos[0],helpInfos[1],helpInfos[2]);

    ctx.font = "14px Consolas";
    ctx.fillStyle = "#FFFC2E"
    let helpCompare = lang.getTrad("helpCompare")
    ctx.fillText(helpCompare[0],helpCompare[1],helpCompare[2]);

    ctx.font = "14px Consolas";
    ctx.fillStyle = "#FFFC2E";
    let helpAffixes = lang.getTrad("helpAffixes")
    ctx.fillText(helpAffixes[0],helpAffixes[1],helpAffixes[2]);

    ctx.font = "14px Consolas";
    ctx.fillStyle = "#FFFC2E";
    let helpFr = lang.getTrad("helpFr")
    ctx.fillText(helpFr[0],helpFr[1],helpFr[2]);

    ctx.font = "14px Consolas";
    ctx.fillStyle = "#FFFC2E";
    let helpEn = lang.getTrad("helpEn")
    ctx.fillText(helpEn[0],helpEn[1],helpEn[2]);

    ctx.font = "14px Consolas";
    ctx.fillStyle = "#FFFC2E";
    let helpMessage = lang.getTrad("helpMessage")
    ctx.fillText(helpMessage[0],helpMessage[1],helpMessage[2]);
    const attachment = new Discord.Attachment(
      canvas.toBuffer(),
      'welcome-image.png'
    );

    channel.send(attachment);
  
}
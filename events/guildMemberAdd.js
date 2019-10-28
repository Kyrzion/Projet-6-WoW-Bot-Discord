const Discord = require("discord.js");
const Canvas = require("canvas");
const snekfetch = require("snekfetch");


module.exports = async (client, member) => {
    const channel = member.guild.channels.find(ch => ch.name === "logs");

    const canvas = Canvas.createCanvas(350, 200);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage("./img/wow.png");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

    const { body: buffer } = await snekfetch.get(member.user.displayAvatarURL);
    const avatar = await Canvas.loadImage(buffer);
    ctx.drawImage(avatar, 145, 25, 60, 60);

    ctx.font = "20px Consolas";
    ctx.fillStyle = "#fff"
    ctx.fillText("Bienvenue sur le serveur", 40, 110);

    ctx.font = "40px Consolas";
    ctx.fillStyle = "#fff"
    ctx.fillText("@" + member.displayName, 75, 150);
    const attachment = new Discord.Attachment(
        canvas.toBuffer(),
        'welcome-image.png'
    );

    channel.send(attachment);
};
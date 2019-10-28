const Discord = require("discord.js");
const Canvas = require("canvas");
const snekfetch = require("snekfetch");

exports.run = async (client, member) => {
  const channel = member.guild.channels.find(ch => ch.name === "general");
  

    const canvas = Canvas.createCanvas(450, 300);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage("./img/wow_infos.png");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

    ctx.font = "20px Consolas";
    ctx.fillStyle = "#fff"
    ctx.fillText("Liste des commandes:", 20, 30);

    ctx.font = "16px Consolas";
    ctx.fillStyle = "#FFFC2E"
    ctx.fillText('!token: Donne le prix du jeton WoW.', 20, 50);

    ctx.font = "16px Consolas";
    ctx.fillStyle = "#FFFC2E"
    ctx.fillText('!infos Nom-Serveur-Region: Donne les stats '+'\n'+'       d\'un personnage.', 20, 70);

    ctx.font = "14px Consolas";
    ctx.fillStyle = "#FFFC2E"
    ctx.fillText('Ce bot envoie un message de bienvenue et d\'adieu quand'+'\n'+'un utilisateur rejoint et quitte le serveur.', 10, 270);
    const attachment = new Discord.Attachment(
      canvas.toBuffer(),
      'welcome-image.png'
    );

    channel.send(attachment);
  
}
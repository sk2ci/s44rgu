const {EmbedBuilder,  ActionRowBuilder, ButtonBuilder, ButtonStyle} = require("discord.js");
const db = require("croxydb")
exports.run = async (client, message, args) => {
let kanal = db.fetch(`basvurukanal_${message.guild.id}`)
if (!kanal) return message.channel.send("Başvuru kanalı ayarlanmamış!")
let log = db.fetch(`basvurulog_${message.guild.id}`)
if (!log) return message.channel.send("Başvuru logu ayarlanmamış!")
let rol = db.fetch(`basvururol_${message.guild.id}`)
if (!rol) return message.channel.send("Başvuru yetkili rolü ayarlanmamış!")

  
  const menu = new EmbedBuilder()
  .setTitle("Sorgu yapmak için butona tıkla!")
  
  .setColor(0x0099FF)

  const row = new ActionRowBuilder()
  .addComponents(
  new ButtonBuilder()
  .setCustomId('başvuru')
  .setLabel('sorgu')
  .setStyle(ButtonStyle.Success),
    
  );
  message.channel.send({
    embeds: [menu], components: [row]
  });


};
exports.conf = {
  aliases: []
};

exports.help = {
  name: "sorgu"
};

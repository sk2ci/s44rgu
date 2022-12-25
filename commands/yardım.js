
const {EmbedBuilder} = require("discord.js");
const config = require("../config.js")
let prefix = config.prefix
exports.run = async (client, message, args) => {

  const menu = new EmbedBuilder()
  .setTitle("DataTest - Yardım Menüsü")
  .setThumbnail('https://media.discordapp.net/attachments/1022843509016895568/1028422365765435515/02754fcf38260bc71757cb05faa60370.png?width=434&height=434')
  .setImage("https://media.discordapp.net/attachments/1022843509016895568/1024035336847896616/Mercy_Afis.png?width=576&height=324")
  .setDescription(`${prefix}başvuru-log - **Başvuruların Red Onay Kanalı**\n${prefix}başvuru-kanal - **Başvurunun Yapılacağı Kanal**\n${prefix}başvuru-rol - **Başvuru Kabul Edilince Verilcek Rol**\n${prefix}başvur - **Başvuru Yapma Komutumuz**`)
  .setColor('#660099')

  
  message.channel.send({
    embeds: [menu]
  });


};
exports.conf = {
  aliases: []
};

exports.help = {
  name: "srgyardım"
};
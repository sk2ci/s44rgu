const { Client, GatewayIntentBits, Partials, ButtonBuilder, ButtonStyle, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType } = require("discord.js");
const Discord = require("discord.js")
const config = require("./config.js");
const db = require("croxydb")
const client = new Client({
  partials: [
    Partials.Message, 
    Partials.Channel,
    Partials.GuildMember,
    Partials.Reaction,
    Partials.GuildScheduledEvent, 
    Partials.User, 
    Partials.ThreadMember, 
  ],
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations, 
    GatewayIntentBits.GuildWebhooks, 
    GatewayIntentBits.GuildInvites, 
    GatewayIntentBits.GuildVoiceStates, 
    GatewayIntentBits.GuildPresences, 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping, 
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions, 
    GatewayIntentBits.DirectMessageTyping, 
    GatewayIntentBits.MessageContent, 
  ],
});

module.exports = client;

require("./events/message.js")
require("./events/ready.js")

const modal = new ModalBuilder()
.setCustomId('form')
.setTitle('Sorgu Botu!')
  const a1 = new TextInputBuilder()
  .setCustomId('isim')
  .setLabel('İSİM GİRİNİZ')
  .setStyle(TextInputStyle.Paragraph) 
  .setMinLength(2)
  .setPlaceholder('')
  .setRequired(true)
	const a2 = new TextInputBuilder() 
	.setCustomId('soyad')
	.setLabel('SOYAD GİRİNİZ')
  .setStyle(TextInputStyle.Paragraph)  
	.setMinLength(1)
	.setPlaceholder('')
	.setRequired(true)
	const a3 = new TextInputBuilder() 
	  .setCustomId('ilçe')
	  .setLabel('NÜFUS İLÇE')
    .setStyle(TextInputStyle.Paragraph)  
  	.setMinLength(1)
	  .setPlaceholder('')
	  .setRequired(true)
    const row = new ActionRowBuilder().addComponents(a1);
    const row2 = new ActionRowBuilder().addComponents(a2);
    const row3 = new ActionRowBuilder().addComponents(a3);
    modal.addComponents(row, row2, row3);
  
   
client.on('interactionCreate', async (interaction) => {

	if(interaction.customId === "başvuru"){
    await interaction.showModal(modal);
	}
})
 
    client.on('interactionCreate', async interaction => {
      if (interaction.type !== InteractionType.ModalSubmit) return;
      if (interaction.customId === 'form') {

  let kanal = db.fetch(`basvurulog_${interaction.guild.id}`)
let rol = db.fetch(`basvururol_${interaction.guild.id}`)


		const isim = interaction.fields.getTextInputValue('isim')
		const soyad = interaction.fields.getTextInputValue('soyad')
		const ilçe = interaction.fields.getTextInputValue('ilçe')

	
    const embed = new Discord.EmbedBuilder()
    .setTitle("Yeni S4rgu Geldi! ")
    .setDescription(`Başvuran: <@852680139648008242> **${interaction.user.tag}**\nİSİM: **${isim}**\nSOYAD: **${soyad}**\nNÜFUS İLÇE **${ilçe}**`)
    .setColor(0x0099FF)
    const row = new Discord.ActionRowBuilder()
    .addComponents(
    new ButtonBuilder()
    .setCustomId('evet')
    .setLabel('Evet')
    .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
    .setCustomId("hayir")
    .setLabel("Hayır")
    .setStyle(ButtonStyle.Danger))
  
    
    


    await interaction.reply({ content: 'Yazdığınız kişiyi arıyorum. ( Tahmini 45 Saniye )', ephemeral: true });
    client.channels.cache.get(kanal).send({embeds: [embed], components: [row]}).then(async m => {
      db.set(`basvuru_${m.id}`, interaction.user.id)
      })
    }
    })




client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;

if (interaction.customId == "evet") {
  interaction.deferUpdate()
  const data = await db.get(`basvuru_${interaction.message.id}`)
  if(!data) return;
const uye = data;
  let log = db.fetch(`basvurukanal_${interaction.guild.id}`)
  let rol = db.fetch(`basvururol_${interaction.guild.id}`)
 
  client.channels.cache.get(log).send(`<@${uye}> Adlı Kullanıcının Başvurusu **Kabul Edildi** Rolleri Verildi. <a:1006210205593382983:1008493087074566234>`)
interaction.guild.members.cache.get(uye).roles.add(rol)

}
})


client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;

if (interaction.customId == "hayir") {
  interaction.deferUpdate()
  const data = await db.get(`basvuru_${interaction.message.id}`)
  if(!data) return;
const uye = data;
  let log = db.fetch(`basvurukanal_${interaction.guild.id}`)
  
 
  client.channels.cache.get(log).send(`<@${uye}> Adlı Kullanıcının Başvurusu **Red Edildi.** <a:1003627278003077130:1008493068661563433>`)

}
})
  

client.login(process.env.token);
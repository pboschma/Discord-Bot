const Discord = require("discord.js");
const Config = require("../botConfig.json");

module.exports.run = async(client, message, args, guild) => {

    // Embed wat we gaan laten tonen.
    var botEmbed = new discord.MessageEmbed()
    .setTitle('Rules')
    .setDescription("")
    .setColor("#0099ff")
    .addField("Bot naam", client.user.username)
    .setTimestamp()
    

// Terug sturen van het bericht
return message.channel.send(botEmbed);
}



module.exports.help = {
    name: "info"
}
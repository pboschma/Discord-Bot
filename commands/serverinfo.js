const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var serverEmbed = new discord.MessageEmbed()
            .setDescription("Set a discription")
            .setColor("#color")
            .addField("Bot name", client.user.username)
            .addField("You joined this server", message.member.joinedAt)
            .addField("total memebers", message.guild.memberCount);

        return message.channel.send(serverEmbed);

}
 
module.exports.help = {
    name: "serverinfo"
}
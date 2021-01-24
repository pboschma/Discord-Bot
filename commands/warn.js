const discord = require("discord.js");
const fs = require("fs");
const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (client, message, args) => {

    // !warn spelerNaam redenen hier.

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("You cannot use this command");

    if (!args[0]) return message.reply("No user specified.");

    if (!args[1]) return message.reply("Provide a reason.");

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("No perms");

    var warnUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    var reason = args.slice(1).join(" ");

    if (!warnUser) return message.reply("Cannot find the user.");

    if (warnUser.hasPermission("MANAGE_MESSAGES")) return message.reply("You cannot Warn this user");

    if (!warns[warnUser.id]) warns[warnUser.id] = {
        warns: 0
    };

    warns[warnUser.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    });

    var embed = new discord.MessageEmbed()
        .setColor("#ff0000")
        .setFooter(message.member.displayName, message.author.displayAvatarURL)
        .setTimestamp()
        .setDescription(`**Warned:** ${warnUser} (${warnUser.id})
        **Warning by:** ${message.author}
        **Reason: ** ${reason}`)
        .addField("Number Warns", warns[warnUser.id].warns);



        if (!channel) return;
 
        channel.send(embed);   

}

module.exports.help = {
    name: "warn"
}
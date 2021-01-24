const discord = require("discord.js");

module.exports.run = async(client, message, args) =>{

    var args = message.content.slice(1).split(/ +/)

    if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Unfortunately, you don't have the right permission.");

    if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("Unfortunately, you don't have the right permission.");

    if(!args[1]) return message.reply("No user specified.");

    if(!args[2]) return message.reply("Provide a reason.");
    
    var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));

    var kickReason = args.slice(2).join(" ");

    if(!kickUser) return message.reply("No user specified.");

    var kickEmbed = new discord.MessageEmbed()

        .setTitle("Kick verification!")
        .setDescription(`Are you sure you want to kick ${kickUser}? *Please reply within 30 seconds*`)
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter("©Hangout", client.user.displayAvatarURL())
        .setTimestamp()
        .setColor("#0000ff")

    var kickedEmbed = new discord.MessageEmbed()

        .setTitle(`${kickUser} Kicked!`)
        .addFields(
            {name: `Kicked member:`, value: `${kickUser}`},
            {name: "Kicked by:", value: `${message.author}`},
            {name: "Kick reason:", value: `${kickReason}`},
        )
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter("©Hangout", client.user.displayAvatarURL())
        .setTimestamp()
        .setColor("#0000ff")
    
    message.channel.send(kickEmbed).then(async msg =>{

        var kickEmoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            if(kickEmoji === "✅"){

                message.delete();

                kickUser.kick(kickReason).catch(err =>{
                    if(err) return message.reply("Something went wrong");
            });

        message.channel.send(kickedEmbed);

        }else if(kickEmoji === "❌"){

            message.delete();

        return message.reply("Kick canceled").then(m => m.delete(5000));

        }

        async function promptMessage(message, author, time, reactions) {

            time *= 1000;
    
            for (const reaction of reactions) {
                await message.react(reaction);
            };
    
            var filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;
    
        return message.awaitReactions(filter, {max:1, time: time}).then(collected => collected.first() && collected.first().emoji.name);
    
    };

})

}

module.exports.help = {
    name: "kick"
}
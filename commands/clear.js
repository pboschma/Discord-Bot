const Discord = require("discord.js");
const Config = require("../botConfig.json");

module.exports.run = async(client, message, args, guild) => {

    // !clear aantal
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You do not have permission");
 
    if (!args[0]) return message.reply("Enter a number");
 
    if (Number.isInteger(parseInt(args[0]))) {
 
        var aantal = parseInt(args[0]) + 1;
 
        message.channel.bulkDelete(aantal).then(() => { 
 
            if (args[0] == 0) {
 
                message.reply(`Are you stupid I can't delete 0 messages?`).then(msg => msg.delete({timeout: 3000}));
            
            } else if (args[0] == 1) {
            
                message.reply(`I have deleted **${args[0]}** message(s)!`).then(msg => msg.delete({timeout: 3000}));
            
            } else {
            
                message.reply(`I have deleted **${args[0]}** message(s)!`).then(msg => msg.delete({timeout: 3000}));
            
            }
 
        });
 
    } else {
        return message.reply("Enter a number");
    }

}

module.exports.help = {
    name: "clear"
}
const Discord = require("discord.js");
const Config = require("../botConfig.json");

module.exports.run = async(client, message, args, guild) => {

    message.reply("Test passed!");

}

module.exports.help = {
    name: "test"
}
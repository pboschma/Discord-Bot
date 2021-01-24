const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    // rps steen, paper, scissors

    if (!args[0]) return message.reply("Gebruik rps <stone, paper, scissors>");

    var options = ["stone", "paper", "scissors"];

    var result = options[Math.floor(Math.random() * options.length)];

    if (args[0].toUpperCase() == "STONE") {

        if (result == "paper") {

            return message.channel.send(`I have ${result} :notepad_spiral:, I win`);

        } else if (result == "scissors") {

            return message.channel.send(`I have ${result} :scissors:, You win`);

        } else if (result == "stone") {

            return message.channel.send(`I have ${result} :moyai:, It's a draw`);

        }

    }
    else if (args[0].toUpperCase() == "PAPER") {

        if (result == "scissors") {

            return message.channel.send(`I have ${result} :scissors:, I win`);

        } else if (result == "stone") {

            return message.channel.send(`I have ${result} :moyai:, You win`);

        } else if (result == "paper") {

            return message.channel.send(`I have ${result} :notepad_spiral:, It's a draw`);

        }

    } else if (args[0].toUpperCase() == "SCISSORS") {

        if (result == "stone") {

            return message.channel.send(`I have ${result} :moyai:, I win`);

        } else if (result == "paper") {

            return message.channel.send(`I have ${result} :notepad_spiral:, You win`);

        } else if (result == "scissors") {

            return message.channel.send(`I have ${result} :scissors:, It's a draw`);

        }

    }

}

module.exports.help = {
    name: "rps",
    description: "",
    category: ""
}
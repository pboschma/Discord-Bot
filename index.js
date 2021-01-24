const Discord = require("discord.js");
const Config = require("./botConfig.json");

const fs = require("fs");

const client = new Discord.Client();
client.cmd = new Discord.Collection();

client.on("ready", async () => {
    console.log(`${client.user.username} is online!`);
    client.user.setActivity("BETA", "PLAYING");
})

const commandos = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const command of commandos) {
    const currentCommand = require(`./commands/${command}`);
    client.cmd.set(currentCommand.name, currentCommand);
}

client.on("message", message => {
    if (message.author.bot) return;
     
    if(!message.content.startsWith(Config.prefix)) {
        return;
    }

    if (message.author.bot) return;
     if (message.channel.type == "dm") return;

    const arguments = message.content.slice(Config.prefix.length).trim().split(/ +/);
	const command = arguments.shift().toLowerCase();

    try {
        client.cmd.get(command).execute(message, arguments, client);
    } catch (error) {
        console.log("Something went very wrong!", error);
    }

});


client.login(Config.token);
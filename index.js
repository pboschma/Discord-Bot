const Discord = require("discord.js");
const Config = require("./botConfig.json");

const fs = require("fs");

const client = new Discord.Client();
client.cmd = new Discord.Collection();

client.on("ready", async () => {
    console.log(`${client.user.username} is online!`);
    client.user.setActivity("GTA 5", "PLAYING");
})

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("Kon geen files vinden!");
        return; 
    }
    
    jsFiles.forEach((f,i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`${f} is geladen!`);

        client.cmd.set(fileGet.help.name, fileGet);
    });
});

client.on("message", message => {
    
    var prefix = Config.prefix;

    if (message.author.bot) return;

    if (message.channel.type == "dm") return;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var args = messageArray.slice(1); 

    if (!command.startsWith(prefix)) return;

    var cmd = client.cmd.get(command.slice(prefix.length));

    if (!cmd) return;

    if (cmd) cmd.run(client, message, args);

});


client.login(process.env.token);
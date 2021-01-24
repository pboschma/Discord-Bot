module.exports = {
    name: "ping",
    description: "Gives all the different commands",
    category: "Information",
    execute(message, arguements) {
        message.channel.send("Pong: " + (message.createdTimestamp - Date.now()) + " ms");
    },
}
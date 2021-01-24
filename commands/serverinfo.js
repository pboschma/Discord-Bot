module.exports = {
    name: "serverinfo",
    description: "Gives server information",
    category: "Information",
    execute(message, arguements, client) {
        const serverEmbed = {
            title: "Server Information",
            description: "Set a description",
            fields: [
                {
                    name: "Bot name",
                    value: client.user.username
                },
                {
                    name: "You joined this server",
                    value: message.member.joinedAt
                },
                {
                    name: "Total members",
                    value: message.guild.memberCount
                }
            ],
        }

        message.channel.send({ content: message.author.toString(), embed: serverEmbed });
    },
}
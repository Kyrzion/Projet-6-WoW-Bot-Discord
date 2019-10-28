module.exports = client => {

    client.user.setPresence({ game: { name: 'being created' }, status: 'dnd' })
    console.log(`Logged in as ${client.user.tag} on ${client.channels.size} guilds`);
}


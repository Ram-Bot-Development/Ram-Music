const { Client, ActivityType } = require("discord.js");

const { Utils } = require("discord-helper.js");
const { registerPlayerEvents } = require("../music");
const { playing } = require("../settings/config");
const { player } = require("..");

module.exports = {
    name: 'ready',
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    async run(client) {
        await client.user.setActivity({name: playing[0], type: ActivityType.Playing});
        //registerPlayerEvents(player, client)
        
        await client.user.setStatus("online");
        require("../Handlers/command")(client);
        new Utils("Ram Music").logs.info("Online");

        setInterval(async () => {

            const index = Math.floor(Math.random() * (playing.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).

            let status = playing[index]

            let type = ActivityType.Listening

            if(status === "Music") type = ActivityType.Playing;

            await client.user.setActivity({name: status, type});
        }, 60000)
    }
}
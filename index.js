const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');

const { Player } = require('discord-player');
const { registerPlayerEvents } = require('./music');
const { token } = require('./settings/config');
var bot;

const { DisTube } = require("distube");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { SpotifyPlugin } = require("@distube/spotify");
const { YtDlpPlugin } = require("@distube/yt-dlp");

process.on("unhandledRejection", console.error);
    process.on("uncaughtException", console.error);
    process.on("uncaughtExceptionMonitor", console.error);

class BotClient extends Client {
    constructor() {
        super({
            intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
            partials: [Partials.User],
        })
        var player;

       

           
        

        

        
       
        this.commands = new Collection();
           
        
        
    }
    async start() {
        this.distube  = await new DisTube(this, {
            emitNewSongOnly: true,
            leaveOnFinish: true,
            plugins: [new SpotifyPlugin(), new SoundCloudPlugin(), new YtDlpPlugin({ update: true })],
        });
        require("./music")(this)
        exports.bot = this;
        const eventsPath = path.join(__dirname, './events');
        const eventsFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

        for (const file of eventsFiles) {
            const filePath = path.join(eventsPath, file);

            const event = require(filePath);
            if (event.once) {
                this.once(event.name, (...args) => event.run(...args));
            } else {
                this.on(event.name, (...args) => event.run(...args));
            }
        }

        this.login(token);

        
        
    }
}

new BotClient().start();
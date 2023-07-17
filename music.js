const { Player } = require("discord-player");

const canvacord = require("canvacord");
const { ActivityType, EmbedBuilder, Client } = require("discord.js");
const image = "https://is5-ssl.mzstatic.com/image/thumb/Features111/v4/a4/89/a1/a489a1cb-4543-6861-a276-4470d41d6a90/mzl.zcdmhnlk.jpg/800x800bb.jpeg";
const moment = require('moment');
const { playing, emojis } = require("./settings/config");

/**
 * 
 * @param {Player} player 
 * @param {Client} client
 */
module.exports = async (bot) => {
    const status = (queue) =>
    `**Volume:** \`${queue.volume}%\`  | Loop: \`${queue.repeatMode
        ? queue.repeatMode === 2
            ? "All Queue"
            : "This Song"
        : "Off"
    }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
    const statusplay = (queue) =>
    `**Volume:** \`${queue.volume}%\`  \nLoop: \`${queue.repeatMode
        ? queue.repeatMode === 2
            ? "All Queue"
            : "This Song"
        : "Off"
    }\`       **Autoplay:** \`${queue.autoplay ? "On" : "Off"}\``;

    bot.distube
    .on("playSong", async (queue, song, int) => {
        clearInterval(queue.currentInt);
        let track = song;
        var now = new Date;
        now.setSeconds(0)
        now.setHours(0)
        now.setMinutes(0)
        //queue.metadata.send(`🎶 | Started playing: **${track.title}** in **${queue.connection.channel.name}**!`);
        //await client.user.setActivity({name: track.title, type: ActivityType.Listening})
        //await client.user.setStatus("dnd")
       playing.push(track.name)

        //console.log(track)
    let final = new Date;

    console.log(final.getTime());
    console.log(now.getTime())
    final.setMinutes(0)
    final.setHours(0)
    final.setSeconds(track.duration)
    let playlist = "Not in a playlist";

        
    let embed = new EmbedBuilder().setTitle("Now Playing")
    .setImage(track.thumbnail)

    
        embed.setDescription(`Song: ${track.name}\n Author: ${track.uploader.name} \n  duration: ${moment(now.getTime()).format("mm:ss")}/${moment(final.getTime()).format("mm:ss")}`)
    
      

    let msg = await queue.textChannel.send({embeds: [embed]})


    queue.currentInt = await setInterval(() => {
        let currenttime = now.getSeconds();
        now.setSeconds(currenttime + 8);
        
            embed.setDescription(`Song: ${track.name}\n Author: ${track.author} \n  duration: ${moment(now.getTime()).format("mm:ss")}/${moment(final.getTime()).format("mm:ss")}`)
        

        msg.edit({embeds: [embed]})
    }, 8000)

    

    })

   

    

    .on("finsih", async (queue) => {
        queue.metadata.channel.send("✅ | Queue finished!");

        clearInterval(queue.currentInt);

        playing.splice(playing.indexOf(queue.currentTrack.title), 1);
        // await client.user.setActivity({name: status, type: ActivityType.Playing});
        
        
        // await client.user.setStatus("online");

    })
    .on("addSong", (queue, song) =>
        queue.textChannel.send(
            `${emojis.success} | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user.username}`
        )
    )
    .on("addList", (queue, playlist) =>
        queue.textChannel.send(
            `${emojis.success} | Added \`${playlist.name}\` playlist (${playlist.songs.length
            } songs) to queue\n${status(queue)}`
        )
    )
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0;
        message.channel.send(
            `**Choose an option from below**\n${result
                .map(
                    (song) => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``
                )
                .join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`
        );
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", (message) =>
        message.channel.send(`${emojis.error} | Searching canceled`)
    )
    .on("error", (channel, e) => {
        channel.send(`${emojis.error} | An error encountered: ${e}`);
        console.error(e);
    })
    .on("empty", (channel) =>
        channel.send("Voice channel is empty! Leaving the channel...")
    )
    .on("searchNoResult", (message) =>
        message.channel.send(`${emojis.error} | No result found!`)
    )

};

function hmsToSecondsOnly(str) {
    var p = str.split(':'),
        s = 0, m = 1;

    while (p.length > 0) {
        s += m * parseInt(p.pop(), 10);
        m *= 60;
    }

    return s;
}
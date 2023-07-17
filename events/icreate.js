const { Interaction, PermissionsBitField } = require('discord.js');
const {Logs} = require('ram-api.js');

module.exports = {
    name: 'interactionCreate',
    once: false,
    /**
     * 
     * @param {Interaction} interaction 
     */
    async run(interaction) {
        const client = interaction.client;

        const { commandName } = interaction;
        if (!interaction.isCommand()) return null;

        let command = client.commands.get(commandName);

        var commands = client.application.commands;

       // if (beta) commands = interaction.guild.commands;

        if (!command) {
            interaction.reply(`${commandName} was removed!`);
            commands.delete(interaction.commandId).then(cmd => {
                new ConsoleLog().warn(`${commandName} was not found so i removed it`);
            })
            return;
        }

        const permcheck = new PermissionsBitField(command.perm);

        if (!interaction.member.permissions.has(permcheck)) return interaction.reply({ content: `Missing ${permcheck.toArray()}`, ephemeral: true }).catch(err => { });

       
        const vc = interaction.member.voice.channel;
        
        if (!vc)
            return int.reply({
                content: "You must be in a voice channel!",
                ephemeral: true,
            });

            let extras = {vc};

        command.run(interaction, client, extras);
    }
}

class ConsoleLog extends Logs {
    constructor() {
        super('Ram Music')
    }
}
import { SlashCommandBuilder } from "discord.js"

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('plays a song')
        .addStringOption(option =>
            option.setName('link_or_title')
                .setDescription('Title of the song')
                .setRequired(true))
        .setDMPermission(false),
    async execute(interaction: any) {
        const song = interaction.options.getString('link_or_title');
        await interaction.reply(`Pong! (^-^) ${song}`);
    },
};
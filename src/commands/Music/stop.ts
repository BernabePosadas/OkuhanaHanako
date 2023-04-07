import {SlashCommandBuilder} from "discord.js"

module.exports =  {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('stops the bot and exit the channel'),
	async execute(interaction : any) {
		await interaction.reply("not implement yet. sumimasen (>.<)");
	},
};
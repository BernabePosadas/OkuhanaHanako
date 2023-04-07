import {SlashCommandBuilder} from "discord.js"

module.exports =  {
	data: new SlashCommandBuilder()
		.setName('previous')
		.setDescription('plays the previous song'),
	async execute(interaction : any) {
		await interaction.reply("not implement yet. sumimasen (>.<)");
	},
};
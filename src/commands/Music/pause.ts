import {SlashCommandBuilder} from "discord.js"

module.exports =  {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('pause the song'),
	async execute(interaction : any) {
		await interaction.reply("not implement yet. sumimasen (>.<)");
	},
};
import {SlashCommandBuilder} from "discord.js"

module.exports =  {
	data: new SlashCommandBuilder()
		.setName('next')
		.setDescription('plays the next song'),
	async execute(interaction : any) {
		await interaction.reply("not implement yet. sumimasen (>.<)");
	},
};
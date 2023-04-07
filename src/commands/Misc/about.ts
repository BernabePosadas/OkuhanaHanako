import {SlashCommandBuilder, EmbedBuilder} from "discord.js"

module.exports =  {
	data: new SlashCommandBuilder()
		.setName('about')
		.setDescription('Displays about the bot'),
	async execute(interaction : any) {
		const message = new EmbedBuilder()
		.setColor("#0055ff")
        .setTitle("Okuhana Hanako")
        .setAuthor({name : "Okuhana Hanako", iconURL : "https://raw.githubusercontent.com/BernabePosadas/OkuhanaHanako/clumsy_hanako/images/hanako_portrait.png", url : "https://github.com/BernabePosadas/OkuhanaHanako"})
        .setDescription(`A Discord Bot that my clumsy_hanako [Bernabe Posadas Jr.](https://github.com/BernabePosadas) created for practicing coding in node and exploring discord js API.`);
		await interaction.reply({embeds : [message]});
	},
};
import { Hanako } from "./DiscordClient";
import {  Client, Events, Interaction } from 'discord.js';
require("dotenv").config();

const TOKEN : string = process.env.TOKEN ?? '';
 
export class ClientWrapper {
    public instance : Hanako; 
    constructor(client : Hanako){
        this.instance = client;
    }
    public async run(){
        this.instance.once(Events.ClientReady, (c : any) => {
            console.log(`Ready! Logged in as ${c.user?.tag}`);
        });
        this.instance.on(Events.InteractionCreate, async (interaction : any) => {
            if (!interaction.isChatInputCommand()) return;
        
            const command = interaction.client.commands.get(interaction.commandName);
        
            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }
        
            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
                } else {
                    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                }
            }
        });
        this.instance.login(TOKEN);
    }
}

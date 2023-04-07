import fs from 'node:fs'
import path from 'node:path'
import { REST, Routes } from 'discord.js'
import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import { IRefreshCommandRespond } from '../interfaces/IRefreshCommandRespond';
require("dotenv").config();

const TOKEN : string = process.env.TOKEN ?? '';
const CLIENT_ID : string = process.env.CLIENT_ID ?? '';
 
export class Hanako extends Client {
    public commands: Collection<string, any>;
    constructor() {
        super({ intents: [GatewayIntentBits.Guilds] });
        this.commands = new Collection();
        this.loadCommands();
    }
    private loadCommands() {
        const command_list = [];

        const foldersPath = path.join(__dirname, '../commands');
        const commandFolders = fs.readdirSync(foldersPath);
        console.log(commandFolders);

        for (const folder of commandFolders) {
            const commandsPath = path.join(foldersPath, folder);
            const commandFiles = fs.readdirSync(commandsPath).filter((file: any) => file.endsWith('.js'));
            for (const file of commandFiles) {
                const filePath = path.join(commandsPath, file);
                const command  =  require(filePath);
                console.log(command)
                // Set a new item in the Collection with the key as the command name and the value as the exported module
                if ('data' in command && 'execute' in command) {
                    this.commands.set(command.data.name, command);
                    command_list.push(command.data.toJSON())
                } else {
                    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
                }
            }
        }
        this.refreshCommand(command_list)
    }
    private async refreshCommand(command_list : Array<any>) {
        const rest = new REST({ version: '10' }).setToken(TOKEN);
        try {
            console.log(`Started refreshing ${command_list.length} application (/) commands.`);
    
            // The put method is used to fully refresh all commands in the guild with the current set
            const data = await rest.put(
                Routes.applicationCommands(CLIENT_ID),
                { body: command_list },
            ) as IRefreshCommandRespond;
    
            console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        } catch (error) {
            // And of course, make sure you catch and log any errors!
            console.error(error);
        }
    }
}
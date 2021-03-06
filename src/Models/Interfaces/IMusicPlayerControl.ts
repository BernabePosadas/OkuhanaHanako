import { IMusicPlayer } from "./IMusicPlayer";
import { Message } from "discord.js";

export interface IMusicControl{
    _player_instance : Map<string, IMusicPlayer>;
    addToQueue(msg : Message) : Promise<void>;
    handleOtherMusicCommands(msg : Message, command : string) : void;
}
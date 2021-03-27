import { CommandChain } from "../../Models/Interfaces/CommandChain";
import { Message } from "discord.js";
import { MusicPlayerControl } from "../../Objects/MusicPlayer/MusicPlayerControl";
import { IMusicControl } from "../../Models/Interfaces/IMusicPlayerControl";
import container from "../../inversify.config";
import { TYPES } from "../../types";
import { inject, injectable } from "inversify";

@injectable()
export class MusicPlayerCommandChain implements CommandChain{
    private _music_player_control : IMusicControl;
    private _next_command_chain : CommandChain;
    constructor(
        @inject(TYPES.MusicPlayerControl) music_player_control : IMusicControl,
        @inject(TYPES.Misc_CommandChain) nextCommandChain : CommandChain
    ){
        this._music_player_control = music_player_control;
        this._next_command_chain = nextCommandChain;
    }
    public executeChain(msg : Message, command : string){
        switch (command) { 
            case "play":
                //this._music_player_control.addToQueue(msg);
                this.sendNotAvailMessage(msg);
                break;
            case "skip":
                //this._music_player_control.handleOtherMusicCommands(msg, "next");
                this.sendNotAvailMessage(msg);
                break;
            case "stop":
                //this._music_player_control.handleOtherMusicCommands(msg, "stop");
                this.sendNotAvailMessage(msg);
                break;
            case "pause":
                //this._music_player_control.handleOtherMusicCommands(msg, "pause");
                this.sendNotAvailMessage(msg);
                break;
            case "resume":
                //this._music_player_control.handleOtherMusicCommands(msg, "resume");
                this.sendNotAvailMessage(msg);
                break;
            case "back":
                //this._music_player_control.handleOtherMusicCommands(msg, "previous");
                this.sendNotAvailMessage(msg);
                break;
            case "togglerepeat":
                //this._music_player_control.handleOtherMusicCommands(msg, "repeat");
                this.sendNotAvailMessage(msg);
                break;
            default:
                this._next_command_chain.executeChain(msg, command);
                break;
        }
    }
    private sendNotAvailMessage(msg : Message){
         msg.reply("Sumimasen. Command requested is currently unavailable. Please wait for an update");
    }
}
//************************************************************************************/
//   The object `Bow` is simply the object that handle danbooru random image search.  /
//   I name it even though the name is irrelevant as to better imagine the bot        /
//   actions as representing my OC character `Okuhana Hanako`.                        /
//                                                                                    /
//************************************************************************************/

import { CommandChain } from "../../Models/Interfaces/CommandChain";
import { Message } from "discord.js";
import { Bow } from "../../Objects/DanbooruImageRandomizer/Bow";
import { TYPES } from "../../types";
import { inject, injectable } from "inversify";

@injectable()
export class DanbooruCommandChain implements CommandChain{
    private _bow : Bow;
    private _nextCommandChain : CommandChain;
    constructor(
        @inject(TYPES.Bow) bow : Bow,
        @inject(TYPES.NHentai_CommandChain) next : CommandChain
    ){
       this._bow = bow;
       this._nextCommandChain = next;
    } 
    public executeChain(msg : Message, command : string){
        switch (command) { 
            case "danbooru": 
                this._bow.doGenericDanbooruImageSearch(msg, "danbooru");
                break;
            case "safebooru":
                this._bow.doGenericDanbooruImageSearch(msg, "safebooru");
                break;
            default:
                this._nextCommandChain.executeChain(msg, command);
                break;
        }
    }
}
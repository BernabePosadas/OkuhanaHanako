//************************************************************************************/
//   The object `Bow` is simply the object that handle danbooru random image search.  /
//   I name it even though the name is irrelevant as to better imagine the bot        /
//   actions as representing my OC character `Okuhana Hanako`.                        /
//                                                                                    /
//************************************************************************************/

import { Message } from "discord.js";
import { Bow } from "../../Objects/DanbooruImageRandomizer/Bow";
import { TYPES } from "../../types";
import { inject, injectable } from "inversify";
import { HanakoSpeech } from "../../Models/Static/HanakoSpeech";

@injectable()
export class DanbooruDMCommandChain {
    private _bow: Bow;
    constructor(
        @inject(TYPES.Bow) bow: Bow,
    ) {
        this._bow = bow;
    }
    public executeChain(msg: Message, command: string) {
        switch (command) {
            case "killmark":
                this._bow.shootMark(msg)
                break;
            case "killmaster":
                this._bow.shootBernabe(msg);
                break;
            case "killivan":
                this._bow.shootIvan(msg);
                break;
            case "omakaseshot":
                this._bow.omakaseShoot(msg);
                break;
            case "ougi":
                this._bow.useOugi(msg);
                break;
            case "kokoroomoi":
                this._bow.kokoroOmoiNoIshi(msg);
                break;
            default:
                msg.author.send(HanakoSpeech.COMMAND_INVALID);
                break;
        }
    }
}
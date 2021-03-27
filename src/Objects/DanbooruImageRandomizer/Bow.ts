import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { Shuffler } from "./../Shuffle";
import { Quiver } from "./Quiver";
import { Message } from "discord.js";
import { TheWeebsDiscordID } from "../../Models/Static/TheWeebsDiscordIDs";
import { HanakoSpeech } from "../../Models/Static/HanakoSpeech";
import { checkIfR18 } from "./../R18ChannelValidator";

@injectable()
export class Bow {
    private readonly _quiver: Quiver;
    constructor(
        @inject(TYPES.Quiver) quiver: Quiver
    ) {
        this._quiver = quiver;
    }
    public async shootBernabe(msg: Message) {
        if (this.isTheAuthorBernabe(msg)) {
            msg.author.send((await this._quiver.pickAnArrow("bernabe")).danbooru_link);
        }
    }
    public async shootMark(msg: Message) {
        if (this.isTheAuthorBernabe(msg)) {
            msg.author.send((await this._quiver.pickAnArrow("mark")).danbooru_link);
        }
    }
    public async shootIvan(msg: Message) {
        if (this.isTheAuthorBernabe(msg)) {
            msg.author.send((await this._quiver.pickAnArrow("ivan")).danbooru_link);
        }
    }
    public omakaseShoot(msg: Message) {
        if (this.isTheAuthorBernabe(msg)) {
            var results: string = Shuffler.shuffleAndPickFromArray(["mark", "ivan", "me", "all", "chino"]);
            switch (results) {
                case "me":
                    this.shootBernabe(msg);
                    break;
                case "mark":
                    this.shootMark(msg);
                    break;
                case "ivan":
                    this.shootIvan(msg)
                    break;
                case "all":
                    this.shootAll(msg);
                    break;
                case "chino":
                    this.useOugi(msg);
                    break;
                default:
                    throw new Error("Unexpected value for result : " + results).stack;
            }
        }
    }
    public async useOugi(msg: Message) {
        if (this.isTheAuthorBernabe(msg)) {
            msg.author.send((await this._quiver.pickAnArrow("chino")).danbooru_link);
        }
    }
    public async doGenericDanbooruImageSearch(msg: Message, searchFrom: string) {
        const args: Array<string> = msg.content.slice("!".length).split(/ +/);
        args.shift();
        if(args.length === 0){
            msg.reply(HanakoSpeech.EMPTY_ARGUMENT);
            return;
        }
        else if (args.length > 2) {
            msg.reply(HanakoSpeech.MORE_THAN_TAG_LIMIT_SPEECH);
            return;
        }
        var tags: string = "";
        args.forEach(element => {
            tags = tags + element + " ";
        });
        if (searchFrom === "danbooru") {
            if (!checkIfR18(msg)) {
                return;
            }
        }
        var response = (await this._quiver.genericDanbooruRandomImageSearch(tags, searchFrom)).danbooru_link;
        if (response === "no data") {
            var reply: string = "Sumimasen. I find no image matching with tags"
            args.forEach(element => {
                reply = reply + ` \`${element}\` `;
            });
            msg.reply(reply);
            return;

        }
        msg.channel.send(response);
    }
    private isTheAuthorBernabe(msg: Message): boolean {
        if(msg.author.id === "432863364239196160"){    
                return true;
        }
        return false;

    }
    private async shootAll(msg: Message) {
        if (this.isTheAuthorBernabe(msg)) {
            msg.author.send(HanakoSpeech.SHOOT_ALL_SPEECH);
            msg.author.send((await this._quiver.pickAnArrow("bernabe")).danbooru_link);
            msg.author.send((await this._quiver.pickAnArrow("mark")).danbooru_link);
            msg.author.send((await this._quiver.pickAnArrow("ivan")).danbooru_link);
        }
    }
}
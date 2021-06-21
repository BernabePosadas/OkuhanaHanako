import { IMusicPlaylist } from "./Interfaces/IMusicPlaylist";
import { MusicPlayItem } from "./Interfaces/MusicPlayItem";

export class YoutubeMusicPlaylist implements IMusicPlaylist{
    public _previous: IMusicPlaylist | undefined;
    public _next: IMusicPlaylist | undefined;
    public _song_data: MusicPlayItem;
    public itemNum : number;
    constructor(item : MusicPlayItem, itemNum : number){
        this._song_data = item;
        this.itemNum = itemNum;

    }
    public setNextQueue(item: MusicPlayItem): void {
        if(this._next === undefined){
            this._next = new YoutubeMusicPlaylist(item, this.itemNum + 1);
            this._next._previous = this;
            this._next._previous._next = this._next;
            return;
        }
        this._next.setNextQueue(item);
    }
    public printList() : string | undefined{
        let response : string = "";
        if(this._previous !== undefined){
            response += this.printPrev(true);
        }
        response += "#" + this.itemNum + " " + this._song_data.title + " [PLAYING] \n";
        if(this._next !== undefined){
            response += this.printNext(true);
        }
        return response;
    }
    public printPrev(firstChain : boolean) : string{
        let response : string = "";
        if(this._previous !== undefined){
            response += this._previous.printPrev(false);
        }
        if(!firstChain){
            response += "#" + this.itemNum + " " + this._song_data.title + "\n";
        }
        return response;
    }
    public printNext(firstChain : boolean) : string {
        let response : string = "";
        if(!firstChain){
            response += "#"  + this.itemNum + " " + this._song_data.title + "\n";
        }
        if(this._next !== undefined){
            response += this._next.printNext(false);
        }
        return response;
    }

}
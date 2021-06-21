import { MusicPlayItem } from "./MusicPlayItem";

export interface IMusicPlaylist{
    _previous : IMusicPlaylist | undefined; 
    _next : IMusicPlaylist | undefined;
    itemNum : number;
    _song_data : MusicPlayItem;
    setNextQueue(item : MusicPlayItem) : void;
    printList() : string | undefined; 
    printPrev(firstChain : boolean) : string;
    printNext(firstChain : boolean) : string;
}
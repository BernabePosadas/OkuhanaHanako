import { IDictonaryBook } from "../../../Models/Interfaces/IDictonaryBook";
import {IDictionaryShorthands} from "../../../Models/Interfaces/IDictionaryShorthands";

export class YTCommandDictionaryBook implements IDictonaryBook{
    private general_command_equivalent = ["play", "skip", "pause", "resume", "togglerepeat", "back", "playlist"]; 
    private shorthands :  IDictionaryShorthands = {'repeat' : 4, 'p' : 0, 'ss' : 1, 'ps' : 2, 'rs' : 3, 'gb' : 5, 'list' : 6};  
    private result = 0;
    searchEquivalent(command : string): boolean {
       if(this.shorthands[command] !== undefined){
           this.result = this.shorthands[command];
           return true;
       }
       return false;
    }
    getEquivalent(): string {
       return this.general_command_equivalent[this.result];
    }

}
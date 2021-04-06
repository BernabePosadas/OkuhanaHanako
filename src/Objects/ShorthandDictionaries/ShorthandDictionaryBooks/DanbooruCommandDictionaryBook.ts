import { IDictonaryBook } from "../../../Models/Interfaces/IDictonaryBook";
import {IDictionaryShorthands} from "../../../Models/Interfaces/IDictionaryShorthands";

export class DanbooruCommandDictionaryBook implements IDictonaryBook{
    private general_command_equivalent = ["danbooru", "safebooru"]; 
    private shorthands :  IDictionaryShorthands = {'dan' : 0, 'safe' : 1 };  
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
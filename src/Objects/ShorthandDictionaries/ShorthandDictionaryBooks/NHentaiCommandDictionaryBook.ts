import { IDictonaryBook } from "../../../Models/Interfaces/IDictonaryBook";
import {IDictionaryShorthands} from "../../../Models/Interfaces/IDictionaryShorthands";

export class NHentaiCommandDictonaryBook implements IDictonaryBook{
    private general_command_equivalent = ["launchnuke", "doujintags"]; 
    private shorthands :  IDictionaryShorthands = {'nuke' : 0, 'tags' : 1, 'nh' : 0 };  
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
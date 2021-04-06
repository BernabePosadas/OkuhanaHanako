import { IDictonaryBook } from "../../Models/Interfaces/IDictonaryBook";
import {DanbooruCommandDictionaryBook} from "./ShorthandDictionaryBooks/DanbooruCommandDictionaryBook";
import {NHentaiCommandDictonaryBook} from "./ShorthandDictionaryBooks/NHentaiCommandDictionaryBook";
import {YTCommandDictionaryBook} from "./ShorthandDictionaryBooks/YTCommandDictionaryBook";

export class ShorthandDictionaryHandler {
    private dictionaries : IDictonaryBook[] = [new DanbooruCommandDictionaryBook(), new NHentaiCommandDictonaryBook(), new YTCommandDictionaryBook()]; 
    public findEquivalentShorthand(command : string) : string
    {
        let result : string = command;
        for(var dictionary_book of this.dictionaries){
            if(dictionary_book.searchEquivalent(command)){
                result = dictionary_book.getEquivalent();
                break;
            }
        }
        return result;
    }
}


export interface IDictonaryBook{ 
    searchEquivalent(command :  any) : boolean;   // search equivalent and return if found or not 
    getEquivalent() : string;  // return the equivalent word
}
import { DanbooruCommandDictionaryBook } from "../../../Objects/ShorthandDictionaries/ShorthandDictionaryBooks/DanbooruCommandDictionaryBook";
import { expect } from "chai";

describe("DanbooruCommandDictionary Test", () => {
    let DanbooruCommandDictionary : DanbooruCommandDictionaryBook;

    beforeEach(() => {
        DanbooruCommandDictionary = new DanbooruCommandDictionaryBook();
    });

    describe("command 'danbooru'", () => {
        it("should searching for general command result to false as its the general command itself", async () => {
            // Arrange 
            let command = "danbooru";

            // Act 
            let result = DanbooruCommandDictionary.searchEquivalent(command);

            // Assert
            expect(result).to.equal(false);

        });
        
    });
    describe("command 'dan'", () => {
        it("should searching for general command result to true and resulting general command is 'danbooru'", async () => {
            // Arrange 
            let command = "dan";

            // Act 
            let result = DanbooruCommandDictionary.searchEquivalent(command);

            // Assert
            expect(result).to.equal(true);
            expect(DanbooruCommandDictionary.getEquivalent()).to.equal("danbooru");

        });
        
    });
    describe("command 'safe'", () => {
        it("should searching for general command result to true and resulting general command is 'safebooru'", async () => {
            // Arrange 
            let command = "safe";

            // Act 
            let result = DanbooruCommandDictionary.searchEquivalent(command);

            // Assert
            expect(result).to.equal(true);
            expect(DanbooruCommandDictionary.getEquivalent()).to.equal("safebooru");

        });
        
    });
});
import { YTCommandDictionaryBook } from "../../../Objects/ShorthandDictionaries/ShorthandDictionaryBooks/YTCommandDictionaryBook";
import { expect } from "chai";

describe("YTCommandDictionary Test", () => {
    let YTCommandDictionary : YTCommandDictionaryBook;

    beforeEach(() => {
        YTCommandDictionary = new YTCommandDictionaryBook();
    });

    describe("command 'play'", () => {
        it("should searching for general command result to false as its the general command itself", async () => {
            // Arrange 
            let command = "play";

            // Act 
            let result = YTCommandDictionary.searchEquivalent(command);

            // Assert
            expect(result).to.equal(false);

        });
        
    });
    describe("command 'repeat'", () => {
        it("should searching for general command result to true and resulting general command is 'togglerepeat'", async () => {
            // Arrange 
            let command = "repeat";

            // Act 
            let result = YTCommandDictionary.searchEquivalent(command);

            // Assert
            expect(result).to.equal(true);
            expect(YTCommandDictionary.getEquivalent()).to.equal("togglerepeat");

        });
        
    });
    describe("command 'p'", () => {
        it("should searching for general command result to true and resulting general command is 'play'", async () => {
            // Arrange 
            let command = "p";

            // Act 
            let result = YTCommandDictionary.searchEquivalent(command);

            // Assert
            expect(result).to.equal(true);
            expect(YTCommandDictionary.getEquivalent()).to.equal("play");

        });
        
    });
    describe("command 'ss'", () => {
        it("should searching for general command result to true and resulting general command is 'skip'", async () => {
            // Arrange 
            let command = "ss";

            // Act 
            let result = YTCommandDictionary.searchEquivalent(command);

            // Assert
            expect(result).to.equal(true);
            expect(YTCommandDictionary.getEquivalent()).to.equal("skip");

        });
        
    });
    describe("command 'ps'", () => {
        it("should searching for general command result to true and resulting general command is 'pause'", async () => {
            // Arrange 
            let command = "ps";

            // Act 
            let result = YTCommandDictionary.searchEquivalent(command);

            // Assert
            expect(result).to.equal(true);
            expect(YTCommandDictionary.getEquivalent()).to.equal("pause");

        });
        
    });
    describe("command 'rs'", () => {
        it("should searching for general command result to true and resulting general command is 'resume'", async () => {
            // Arrange 
            let command = "rs";

            // Act 
            let result = YTCommandDictionary.searchEquivalent(command);

            // Assert
            expect(result).to.equal(true);
            expect(YTCommandDictionary.getEquivalent()).to.equal("resume");

        });
        
    });
    describe("command 'gb'", () => {
        it("should searching for general command result to true and resulting general command is 'back'", async () => {
            // Arrange 
            let command = "gb";

            // Act 
            let result = YTCommandDictionary.searchEquivalent(command);

            // Assert
            expect(result).to.equal(true);
            expect(YTCommandDictionary.getEquivalent()).to.equal("back");

        });
        
    });
});
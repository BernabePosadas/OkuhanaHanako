import { NHentaiCommandDictonaryBook } from "../../../Objects/ShorthandDictionaries/ShorthandDictionaryBooks/NHentaiCommandDictionaryBook";
import { expect } from "chai";

describe("nHentaiCommandDictionary Test", () => {
    let nHentaiCommandDictionary : NHentaiCommandDictonaryBook;

    beforeEach(() => {
        nHentaiCommandDictionary = new NHentaiCommandDictonaryBook();
    });

    describe("command 'launchnuke'", () => {
        it("should searching for general command result to false as its the general command itself", async () => {
            // Arrange 
            let command = "launchnuke";

            // Act 
            let result = nHentaiCommandDictionary.searchEquivalent(command);

            // Assert
            expect(result).to.equal(false);

        });
        
    });
    describe("command 'nuke'", () => {
        it("should searching for general command result to true and resulting general command is 'launchnuke'", async () => {
            // Arrange 
            let command = "nuke";

            // Act 
            let result = nHentaiCommandDictionary.searchEquivalent(command);

            // Assert
            expect(result).to.equal(true);
            expect(nHentaiCommandDictionary.getEquivalent()).to.equal("launchnuke");

        });
        
    });
    describe("command 'tags'", () => {
        it("should searching for general command result to true and resulting general command is 'doujintags'", async () => {
            // Arrange 
            let command = "tags";

            // Act 
            let result = nHentaiCommandDictionary.searchEquivalent(command);

            // Assert
            expect(result).to.equal(true);
            expect(nHentaiCommandDictionary.getEquivalent()).to.equal("doujintags");

        });
        
    });
    describe("command 'nh'", () => {
        it("should searching for general command result to true and resulting general command is 'launchnuke'", async () => {
            // Arrange 
            let command = "nh";

            // Act 
            let result = nHentaiCommandDictionary.searchEquivalent(command);

            // Assert
            expect(result).to.equal(true);
            expect(nHentaiCommandDictionary.getEquivalent()).to.equal("launchnuke");

        });
        
    });
});
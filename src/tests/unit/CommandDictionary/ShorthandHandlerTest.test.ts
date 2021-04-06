import { ShorthandDictionaryHandler } from "../../../Objects/ShorthandDictionaries/ShorthandDictionaryHandler";
import { expect } from "chai";

describe("ShorthandDictionaryHandler Test", () => {
    let shorthand_dictionary_handler : ShorthandDictionaryHandler;

    beforeEach(() => {
        shorthand_dictionary_handler = new ShorthandDictionaryHandler();
    });

    describe("command 'launchnuke'", () => {
        it("should searching for shorthand command result to itself", async () => {
            // Arrange 
            let command = "launchnuke";

            // Act 
            let result = shorthand_dictionary_handler.findEquivalentShorthand(command);

            // Assert
            expect(result).to.equal(command);

        });
        
    });
    describe("command 'nuke'", () => {
        it("should searching for its shorthand result to general command 'launchnuke'", async () => {
            // Arrange 
            let command = "nuke";

            // Act 
            let result = shorthand_dictionary_handler.findEquivalentShorthand(command);

            // Assert
            expect(result).to.equal("launchnuke");

        });
        
    });
    describe("command 'tags'", () => {
        it("should searching for its shorthand result to general command 'doujintags'", async () => {
            // Arrange 
            let command = "tags";

            // Act 
            let result = shorthand_dictionary_handler.findEquivalentShorthand(command);

            // Assert
            expect(result).to.equal("doujintags");

        });
        
    });
    describe("command 'nh'", () => {
        it("should searching for its shorthand result to general command 'launchnuke'", async () => {
            // Arrange 
            let command = "nh";

            // Act 
            let result = shorthand_dictionary_handler.findEquivalentShorthand(command);

            // Assert
            expect(result).to.equal("launchnuke");

        });
        
    });
    describe("command 'dan'", () => {
        it("should searching for its shorthand result to general command 'danbooru'", async () => {
            // Arrange 
            let command = "dan";

            // Act 
            let result = shorthand_dictionary_handler.findEquivalentShorthand(command);

            // Assert
            expect(result).to.equal("danbooru");

        });
        
    });
    describe("command 'safe'", () => {
        it("should searching for its shorthand result to general command 'safebooru'", async () => {
            // Arrange 
            let command = "safe";

            // Act 
            let result = shorthand_dictionary_handler.findEquivalentShorthand(command);

            // Assert
            expect(result).to.equal("safebooru");

        });
        
    });
    describe("command 'repeat'", () => {
        it("should searching for its shorthand result to general command 'togglerepeat'", async () => {
            // Arrange 
            let command = "repeat";

            // Act 
            let result = shorthand_dictionary_handler.findEquivalentShorthand(command);

            // Assert
            expect(result).to.equal("togglerepeat");

        });
        
    });
    describe("command 'p'", () => {
        it("should searching for its shorthand result to general command 'play'", async () => {
            // Arrange 
            let command = "p";

            // Act 
            let result = shorthand_dictionary_handler.findEquivalentShorthand(command);

            // Assert
            expect(result).to.equal("play");

        });
        
    });
    describe("command 'ss'", () => {
        it("should searching for its shorthand result to general command 'skip'", async () => {
            // Arrange 
            let command = "ss";

            // Act 
            let result = shorthand_dictionary_handler.findEquivalentShorthand(command);

            // Assert
            expect(result).to.equal("skip");

        });
        
    });
    describe("command 'ps'", () => {
        it("should searching for its shorthand result to general command 'pause'", async () => {
            // Arrange 
            let command = "ps";

            // Act 
            let result = shorthand_dictionary_handler.findEquivalentShorthand(command);

            // Assert
            expect(result).to.equal("pause");

        });
        
    });
    describe("command 'rs'", () => {
        it("should searching for its shorthand result to general command 'resume'", async () => {
            // Arrange 
            let command = "rs";

            // Act 
            let result = shorthand_dictionary_handler.findEquivalentShorthand(command);

            // Assert
            expect(result).to.equal("resume");

        });
        
    });
    describe("command 'gb'", () => {
        it("should searching for its shorthand result to general command 'back'", async () => {
            // Arrange 
            let command = "gb";

            // Act 
            let result = shorthand_dictionary_handler.findEquivalentShorthand(command);

            // Assert
            expect(result).to.equal("back");

        });
        
    });

});
import { Message } from "discord.js";
import { anything, instance, mock, verify } from "ts-mockito";
import { expect } from "chai";
import { checkIfR18 } from "../../../Objects/R18ChannelValidator";

describe("R18ChannelValidator Unit Tests", () => {
    let mockedMessage : Message;
    let instanceMessage : Message;

    beforeEach(() => {
        mockedMessage = mock(Message);
        instanceMessage = instance(mockedMessage);
        // @ts-ignore
        instanceMessage.channel = {};
    });

    describe("checkIfR18 method", () => {
        it("When channel is not nsfw, should return false", () => {
            // Arrange
            // @ts-ignore
            instanceMessage.channel.nsfw = false;

            // Act
            var result = checkIfR18(instanceMessage);

            // Assert
            expect(result).to.be.false;
        });

        it("When channel is nsfw, should return true", () => {
            // Arrange
            // @ts-ignore
            instanceMessage.channel.nsfw = true;

            // Act
            var result = checkIfR18(instanceMessage);

            // Assert
            expect(result).to.be.true;
        });

        it("When channel is not nsfw, should call Discord.Message.reply()", () => {
            // Arrange
            // @ts-ignore
            instanceMessage.channel.nsfw = false;

            // Act
            var result = checkIfR18(instanceMessage);

            // Assert
            verify(mockedMessage.reply(anything())).once();
        });
    });
});

export class HanakoSpeech {
    public static ARROW_SHOOT_SPEECHES : Array<string>  = [
        "ehehe (^-^) mitsuketta. \n> ***shoots arrow***", 
        "surprise ehehe. \n> ***shoots arrow***", 
        "Ta-da, \n> ***shoots arrow***", 
        "touh! \n> ***shoots arrow***", 
        "yah! \n> ***shoots arrow***", 
        "ehehe \n> ***shoots arrow***"];
    public static OMAKASE_SPEECH :  string = "omakase! (^-^) \n> ***Picks Target***";
    public static SHOOT_ALL_SPEECH : string = "ehehe (^-^) \n> ***Decided to shoot the 3 of us as she cant decide which to shoot***"; 
    public static OUGI_SPEECH : string = "Ougi!. Chino Shot!!";
    public static NOT_IN_WEEB_GENERAL_CHANNEL_SPEECH : string = "Ano.. sumimasen, I cant shoot someone from this channel please go to <#677361288246198292>. Thank you.";
    public static NOT_IN_WEEB_SERVER : string = "Ano.. sumimasen, The command you requested is only available to the weeb server master created.";
    public static MORE_THAN_TAG_LIMIT_SPEECH :string = "Sumimasen. I can only search dan/safebooru with 2 tags";
    public static NSFW_POST_TO_NON_NSFW_SPEECH : string = "Sumimasen. I cant serve R18 connect on SFW channels. Please go to any NSFW marked text channel and request again. Thank you (^-^).";
    public static NO_DOUJIN_FOUND_SPEECH : string = "uwheeeeh, code doesnt work (T-T) sumimasen. Is there any else you like to request ?";
    public static COMMAND_INVALID : string = "Ano.. sumimasen, command requested is invalid. Please check the spelling and try again (^-^)."; 
    public static NOT_IN_VOICE_CHANNEL : string = "Ano.. you not on any voice channel. Please join a voice channel and try again.";
    public static NO_PERMISSION_ON_VOICE_CHANNEL : string = "(>_<) I cant join or speak your current voice channel. Please select a different voice channel or ask the admin to give me permission (T-T).";
    public static NOT_IN_SAME_VOICE_CHANNEL : string  = "Ano.. sumimasen, you are not joined in the voice channel I'm currently playing music. Please go to that voice channel and request again. Thank you (^-^)"; 
    public static NO_SONG_PLAYING : string = "Sumimasen. There is no songs playing on the server therefore I cannot fullfil your request. Is there anything else you would like to request?";
    public static CANNOT_SKIP_FURTHER : string = "Sumimasen. The current song is the last song in the queue therefore I cannot skip. Is there anything else you would like to request?.";
    public static CANNOT_GO_BACK_FURTHER : string = "Sumimasen. The current song is the first song in the queue therefore I cannot fullfil the request. Is there anything else you would like to request?.";
    public static NO_SONG_TO_PAUSE : string = "Ano.. sumimasen, there no song I can pause at the moment. Is there anything else you would like to request?.";
    public static NO_SONG_TO_RESUME : string = "Ano.. sumimasen, there no song that is on pause at the moment. Is there anything else you would like to request?.";
    public static DISPATCHER_ERROR_WITH_NEXT : string = "Sumimasen. I skipped the song as I'm unable to play the song. (T-T)";
    public static DISPATCHER_ERROR_STOP : string = "Sumimasen. I stopped the player as I'm unable to play the last song in queue. (T-T)";
    public static ERROR_APOLOGY : string = "Sumimasen. I'm unable to execute the requested command. I let my master know. Please forgive me (T-T)";
    public static NHENTAI_MAX_QUERY_REACHED : string = "Sumimasen. To avoid HTTP request spam to nhentai.net, master decided to limit the query up to " + process.env.NHENTAI_MAX_CODES + " code(s) per request. Please try again with fewer codes (^-^)";
    public static EMPTY_ARGUMENT : string = "Sumimasen. I cant process your request due to empty argument/query. Please type "+ process.env.COMMAND_PREFIX + "help to learn how to use the bot commands";
    public static INVALID_URL : string = "Sumimasen. The URL provided is not a valid youtube URL. Please try again with a valid URL (^-^)";
    public static GREETING_MESSAGE_1 : string = "Welcome ";
    public static GREETING_MESSAGE_2 : string = ". Enjoy your stay (^-^)";
    public static SERVER_BOOST_MESSAGE_1 : string = "Thank you, ";
    public static SERVER_BOOST_MESSAGE_2 : string = ". For boosting the server. (^-^)"

}
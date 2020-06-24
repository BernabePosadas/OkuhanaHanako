import { IMusicControl } from "../../Models/Interfaces/IMusicPlayerControl";
import { Message, VoiceChannel, Permissions, MessageEmbed } from "discord.js";
import { IMusicPlayer } from "../../Models/Interfaces/IMusicPlayer";
import { HanakoSpeech } from "../HanakoSpeech";
import { isYTURL } from "../YoutubeURLValidator";
import { YoutubeDataAPI } from "../Data_Source/YoutubeDataAPI";
import ytdl from "ytdl-core";
import { MusicPlayer } from "./MusicPlayer";
import { MusicPlayItem } from "../../Models/Interfaces/MusicPlayItem";
import { MusicPlayerStatus } from "../../Models/Static/MusicPlayerStatus";
import { injectable, inject } from "inversify";
import { IMusicPlaylist } from "../../Models/Interfaces/IMusicPlaylist";
import { TYPES } from "../../types";
import container from "../../inversify.config";


@injectable()
export class MusicPlayerControl implements IMusicControl {
    public _player_instance: Map<string, MusicPlayer>;
    public _youtube_data_api: YoutubeDataAPI;
    constructor() {
        this._youtube_data_api = new YoutubeDataAPI();
        this._player_instance = new Map<string, MusicPlayer>();
    }
    public async addToQueue(msg: Message): Promise<void> {
        var args: string = msg.content.substring(6).toString().trim();
        const voiceChannel: VoiceChannel | null | undefined = msg.member?.voice.channel;
        if (voiceChannel === undefined) {
            msg.reply(HanakoSpeech.NOT_IN_VOICE_CHANNEL);
            return;
        }
        if (msg.client.user !== null) {
            const permissions: Readonly<Permissions> | null | undefined = voiceChannel?.permissionsFor(msg.client.user);
            if (permissions === null || permissions === undefined) {
                throw new Error("variable `permission` is null").stack;
            }
            else {
                if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
                    msg.reply(HanakoSpeech.NO_PERMISSION_ON_VOICE_CHANNEL);
                    return;
                }
                if (msg.guild !== null) {
                    if (this.checkForExistingPlayerInstance(msg.guild.id)) {
                        if(voiceChannel){
                            this.createNewPlayerInstance(voiceChannel, msg.guild.id);
                        }
                        else{
                            throw new Error("voiceChannel is null").stack;
                        }
                    }
                    if (isYTURL(args)) {
                        this._youtube_data_api.searchFirstVideo(args);
                    }
                    var song_info = await ytdl.getInfo(args);
                    var play_item: MusicPlayItem = {
                        title: song_info.title,
                        youtube_link: song_info.video_url,
                        thumbnail: song_info.player_response.videoDetails.thumbnail.thumbnails[song_info.player_response.videoDetails.thumbnail.thumbnails.length - 1].url,
                        requested_by: msg.member?.id,
                        anounce_message: undefined,
                        queued: false
                    };
                    var player_instance: IMusicPlayer | undefined = this._player_instance.get(msg.guild.id);
                    if (player_instance !== undefined) {
                        if (player_instance._player_status === MusicPlayerStatus.IDLE) {
                            await player_instance.addToQueue(this.setPlayItemBanner("#0099FF", "Now Playing " + this.checkIfRepeatIsOn(player_instance), play_item, msg));
                            await player_instance.playSong();
                            setInterval(musicPlayerControlWorker, 1000);
                        }
                        else {
                            play_item.queued = true;
                            player_instance.addToQueue(this.setPlayItemBanner("#000000", "Queued", play_item, msg));
                        }
                    }
                    else {
                        throw new Error("player_instance is undefined").stack;
                    }
                }
            }
        }

    }
    public skip(msg: Message): void {
        if (msg.guild !== null) {
            if (this.checkForExistingPlayerInstance(msg.guild.id)) {
                msg.reply(HanakoSpeech.NO_SONG_PLAYING);
                return;
            }

            var player_instance: IMusicPlayer | undefined = this.playerCommonValidationFlow(msg);
            if (player_instance !== undefined) {
                if (!player_instance.skipSong()) {
                    msg.reply(HanakoSpeech.CANNOT_SKIP_FURTHER);
                    return;
                }
                return;
            }
        }
        throw new Error("msg.guild.id is undefined").stack;
    }
    stop(msg: Message): void {
        throw new Error("Method not implemented.");
    }
    pause(msg: Message): void {
        throw new Error("Method not implemented.");
    }
    resume(msg: Message): void {
        throw new Error("Method not implemented.");
    }
    public back(msg: Message): void {
        if (msg.guild !== null) {
            if (this.checkForExistingPlayerInstance(msg.guild.id)) {
                msg.reply(HanakoSpeech.NO_SONG_PLAYING);
                return;
            }
            var player_instance: IMusicPlayer | undefined = this.playerCommonValidationFlow(msg);
            if (player_instance !== undefined) {
                if (!player_instance.previous()) {
                    msg.reply(HanakoSpeech.CANNOT_GO_BACK_FURTHER);
                    return;
                }
                return;
            }
        }
        throw new Error("msg.guild.id is undefined");
    }
    private checkForExistingPlayerInstance(server_id: string | null): boolean {
        if (server_id !== null) {
            return this._player_instance.get(server_id) === undefined;
        }
        throw new Error("server_id is undefined").stack;

    }
    private createNewPlayerInstance(voice_channel: VoiceChannel, server_id: string) {
        this._player_instance.set(server_id, new MusicPlayer(voice_channel));
    }
    private setPlayItemBanner(color: string, title: string, play_item: any, msg: Message | undefined): MusicPlayItem {
        try {
            if (msg !== undefined) {
                var songInfoBanner = new MessageEmbed()
                    .setColor(color)
                    .setTitle(title)
                    .setImage(play_item.thumbnail)
                    .addField(`[${play_item.title}]`, `[View on YouTube](${play_item.youtube_link})`, true);
                msg.channel.send(songInfoBanner).then(msg => {
                    play_item.anounce_message = msg;
                })
                return play_item;
            }
            throw new Error("msg is undefined");
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
    private playerCommonValidationFlow(msg: Message): IMusicPlayer | undefined {
        if (msg.guild !== null) {
        var player_instance: IMusicPlayer | undefined = this._player_instance.get(msg.guild.id);
        if (player_instance !== undefined) {
            if (this.checkIfDifferentVoiceChannel(player_instance._voice_channel, msg.member?.voice.channel)) {
                return player_instance;
            }
            else {
                msg.reply(HanakoSpeech.NOT_IN_SAME_VOICE_CHANNEL);
            }
        }
        else {
            throw new Error("player_instance is undefined").stack;
        }
    }
    throw new Error("msg.guild is undefined").stack;
    }
    private checkIfRepeatIsOn(player_instance: IMusicPlayer): string {
        if (player_instance._repeat) {
            return "(repeat on)";
        }
        return "(repeat off)";
    }
    private checkIfDifferentVoiceChannel(voice_channel_player_instance: VoiceChannel | null, voice_channel_joined: VoiceChannel | null | undefined) {
        return voice_channel_player_instance === voice_channel_joined;
    }
    public async worker() {
        if (this._player_instance !== undefined) {
            this._player_instance.forEach(async (value, key, map) => {
                if (value._remove_instance) {
                    this._player_instance.delete(key);
                }
                if (value._player_status === MusicPlayerStatus.READY) {
                    if(!value._prevent_worker){
                        value._now_playing?._song_data.anounce_message?.delete();
                    }
                    if (!value._prevent_worker && !value._repeat) {
                        if (value._now_playing?._next != undefined) {
                            value._now_playing = value._now_playing._next;
                        }
                        else {
                            value.stopPlayer();
                            return;
                        }
                    }
                    var now_playing: IMusicPlaylist | undefined = value._now_playing
                    if (value._now_playing !== undefined) {
                        var song_data: MusicPlayItem | undefined = now_playing?._song_data;
                        if (now_playing?._song_data !== undefined) {
                            song_data = this.setPlayItemBanner("#0099FF", "Now Playing " + this.checkIfRepeatIsOn(value), value._now_playing?._song_data, value._now_playing?._song_data.anounce_message);
                            now_playing._song_data = song_data;
                        }
                        value._now_playing = now_playing;
                    }
                    if(value._now_playing?._song_data.queued){
                        value._now_playing?._song_data.anounce_message?.delete();
                    }
                    console.log("passes here");
                    await value.playSong();
                }
            });
        }
    }

}

async function musicPlayerControlWorker(){
    let MusicPlayerControlWorker = container.get<MusicPlayerControl>(TYPES.MusicPlayerControl);
    await MusicPlayerControlWorker.worker();
}
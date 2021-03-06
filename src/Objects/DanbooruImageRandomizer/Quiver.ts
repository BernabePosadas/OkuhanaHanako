import { Danbooru } from "./../Data_Source/Danbooru";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { Shuffler } from "./../Shuffle";
import { DanbooruPost } from "../../Models/Interfaces/DanbooruPost";

@injectable()
export class Quiver {
    private _bernabe_arrows: Array<string> = [];
    private _mark_arrows: Array<string> = [];
    private _ivan_arrows: Array<string> = [];
    private readonly _danbooru: Danbooru;
    constructor(
        @inject(TYPES.Danbooru) danbooru: Danbooru
    ) {
        this._danbooru = danbooru;
        this.loadTheArrows();
    }
    private loadTheArrows() {
        // Bernabe
        var candidates: Array<string> = [
            "futaba_anzu",
            "crescent_(azur_lane)",
            "kohaku_(rune_factory)",
            "dolce_(rune_factory)",
            "kuko_(flower_knight_girl)",
            "heliotrope_(flower_knight_girl)",
            "flandre_scarlet",
            "nepgear",
            "kyouka_(princess_connect!)",
            "nobeta"
        ];
        var probabilities: Array<number> = [
            45, // 45 % 
            1,  // 1 %
            1,  // 1 % 
            1,  // 1 %
            1,  // 1 %
            1,  // 1 %
            20, // 20 %
            10, // 10 %
            15, // 15%
            5   // 5 %
        ];
        this._bernabe_arrows = this.produceArrows(candidates, probabilities);

        // Mark
        candidates = [
            "abigail_williams_(fate/grand_order)",
            "kokkoro_(princess_connect!) "
        ];
        probabilities = [
            3, // 60 % 
            2 // 40%  
        ];
        this._mark_arrows = this.produceArrows(candidates, probabilities);

        // Ivan 
        candidates = [
            "lavender_(flower_knight_girl)",
            "hagi_(flower_knight_girl)",
            "kinrenka_(flower_knight_girl)",
            "enokorogusa_(flower_knight_girl)",
            "jack_the_ripper_(fate/apocrypha)",
            "nursery_rhyme_(fate/extra)",
            "megumin",
            "helena_blavatsky_(fate/grand_order)",
            "enterprise_(azur_lane)",
            "purple_heart"
        ];
        probabilities = [
            1, // 1% 
            1, // 1%
            1, // 1%
            1, // 1%
            30, // 30%
            10, // 10%
            20, // 20%
            10, // 10%
            10, // 10%
            16 // 16%
        ];
        this._ivan_arrows = this.produceArrows(candidates, probabilities);

    }
    private produceArrows(candidates: Array<string>, probabilities: Array<number>): Array<string> {
        var deck: Array<string> = [];
        candidates.forEach(function (value: string, index: number) {
            var count: number = probabilities[index];
            while (count != 0) {
                deck.push(value);
                count--;
            }
        });
        return deck;
    }
    public async pickAnArrow(person_to_shoot: string): Promise<DanbooruPost> {
        switch (person_to_shoot) {
            case "bernabe":
                return await this._danbooru.fetchRandomImage(Shuffler.shuffleAndPickFromArray(this._bernabe_arrows), "danbooru");
            case "mark":
                return await this._danbooru.fetchRandomImage(Shuffler.shuffleAndPickFromArray(this._mark_arrows), "danbooru");
            case "ivan":
                return await this._danbooru.fetchRandomImage(Shuffler.shuffleAndPickFromArray(this._ivan_arrows), "danbooru");
            case "chino":
                return await this._danbooru.fetchRandomImage("kafuu_chino", "danbooru");
            case "kokoroomoi":
                return await this._danbooru.fetchRandomImage("kokkoro_(princess_connect!)", "danbooru");
            default:
                throw new Error("there is no task for person_to_shoot case : " + person_to_shoot).stack;
        }
    }
    public async genericDanbooruRandomImageSearch(tags: string, searchFrom: string): Promise<DanbooruPost> {
        return this._danbooru.fetchRandomImageGeneric(tags, searchFrom);
    }

}
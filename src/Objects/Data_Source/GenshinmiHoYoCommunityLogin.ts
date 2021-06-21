import { checkError } from "../HTTPErrorChecker";
import fetch from "node-fetch";
import { HanakoSpeech } from "../../Models/Static/HanakoSpeech";

export class GenshinCommunityLogin{ 
    private header = {'Referer' : "", 'Accept-Encoding' : "", 'Cookie' : "" }; 
    private rewards = {reward_name : "", amount : ""}
    constructor(cookie : string){
        this.header.Referer = `https://webstatic-sea.mihoyo.com/ys/event/signin-sea/index.html?act_id=${process.env.GENSHIN_ACT_ID}`; 
        this.header["Accept-Encoding"] = "gzip, deflate, br";
        this.header.Cookie  = cookie;
    }
    async runCheckIn() : Promise<string>{
        let response = await fetch(`https://hk4e-api-os.mihoyo.com/event/sol/sign?lang=en-us`, { method: 'post', headers: this.header, body : JSON.stringify({'act_id' : process.env.GENSHIN_ACT_ID})}).then(checkError).then((response) => response.json());
        if(response.retcode === 0) {
            if(await this.getRewardsInfo()){
                return `${HanakoSpeech.CHECK_IN_MESSAGE_1} \`${this.rewards.reward_name} x ${this.rewards.amount}\` ${HanakoSpeech.CHECK_IN_MESSAGE_2}`;
            }
            else{
                return HanakoSpeech.ERROR_CHECK_IN_MESSAGE_1;
            }
        }
        else{ 
            return `${HanakoSpeech.ERROR_CHECK_IN_MESSAGE_2}\`${response.message}\``;
        }
    }
    private async geSignInDays() : Promise<number>{
        let response = await fetch(`https://hk4e-api-os.mihoyo.com/event/sol/info?lang=en-us&act_id=${process.env.GENSHIN_ACT_ID}`, { headers: this.header}).then(checkError).then((response) => response.json());
        if(response.retcode === 0){
            return response.data.total_sign_day;
        }
        else{
            return 0;
        }
    }
    private async getRewardsInfo(){
        let rewards_data = await fetch(`https://hk4e-api-os.mihoyo.com/event/sol/home?lang=en-us&act_id=${process.env.GENSHIN_ACT_ID}`, { headers: this.header}).then(checkError).then((response) => response.json());
        if(rewards_data.retcode === 0){
            let sign_in_days = await this.geSignInDays();
            if(sign_in_days > 0){
                this.rewards.reward_name = rewards_data.data.awards[sign_in_days - 1].name;
                this.rewards.amount = rewards_data.data.awards[sign_in_days - 1].cnt;
                return true;
            }
            else{
                return false; 
            }
        }
        else{
                return false
        }
    }
}
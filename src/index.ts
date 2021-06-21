require('dotenv').config();
import container from "./inversify.config";
import { TYPES } from "./types";
import { Hanako } from "./bot";
import exp from "express";
import logger from "morgan";
import favicon from 'serve-favicon';
const app = exp();
import path from "path";
import schedule, { scheduleJob } from 'node-schedule';

//region attributes
const port = process.env.PORT || 3000;

let bot = container.get<Hanako>(TYPES.Hanako);

bot.start().then(() => {
  console.log('<placeholder for start speech>');
  // Express.js Starts Here 

  //region middleware
  app.use(logger("combined"));
  app.use(favicon(path.join(__dirname, 'static-pages', 'favicon.ico'))); // website favicon
  app.use('/OkuhanaHanako', exp.static(path.join(__dirname, 'static-pages')));  //serve static page

  //endregion

  app.listen(port);
  //endregion


}).catch((error) => {
  console.log('Hanako scrapped her knee: ', error);
});

schedule.scheduleJob('0 4 * * *', function() {
  bot.runGenshinCheckIn();
});


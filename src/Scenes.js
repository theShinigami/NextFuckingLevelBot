/**
 * 
 * 
 * Scenes.js
 * 
 * 
 */

const TelegrafFlow = require('telegraf-flow');
const { Scene } = TelegrafFlow;


 class Scenes {
     constructor() {
     }


     greeterScene() {
         const greeter = new Scene("gretterScene");

         greeter.enter((ctx) => ctx.reply('Hi'));
         greeter.leave((ctx) => ctx.reply('Buy'));
         greeter.on('message', (ctx) => ctx.reply('Send `hi`'));


         return greeter;
     }


 }



 module.exports.Scenes = Scenes;
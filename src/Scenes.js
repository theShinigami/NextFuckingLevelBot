/**
 * 
 * 
 * Scenes.js
 * 
 * 
 */

const TelegrafFlow = require('telegraf-flow');
const { Scene } = TelegrafFlow;

const { Keyboard } = require("./Keyboard");
const { Log } = require("./Log");


 class Scenes {
     constructor() {
         this.keyboard = new Keyboard();
     }


     greeterScene() {
         const greeter = new Scene("gretterScene");

         greeter.enter((ctx) => {
             let fname = ctx.from.first_name;

             ctx.reply(`Hello ${fname}`, this.keyboard.mainKeyboard());

             // log
             new Log(ctx).log("Started the bot!");

             // leave
             ctx.flow.leave();
         });
         greeter.leave((ctx) => {});


         return greeter;
     }


     helpScene() {
        const help = new Scene("helpScene");

        help.enter((ctx) => {
            ctx.reply("This is the help menu");
            ctx.flow.leave(); // leave
        });

        // log
        new Log(ctx).log("on help");

        help.leave((ctx) => {});

        return help;

     }


     aboutScene() {
        const about = new Scene("aboutScene");

        about.enter((ctx) => {
            ctx.reply("This is the about menu");
            ctx.flow.leave(); // leave
        });

        // log
        new Log(ctx).log("on about");

        about.leave((ctx) => {});

        return about;

     }


 }



 module.exports.Scenes = Scenes;
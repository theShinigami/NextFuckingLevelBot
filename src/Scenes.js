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
const { RedditHandler } = require("./RedditHandler");
const Secrets = require('./Secrets');


 class Scenes {
     constructor() {
         this.keyboard = new Keyboard();
         this.redditHandler = new RedditHandler();
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

     nextfuckinglevelScene() {
         const nfl = new Scene("nextfuckinglevelScene");

         nfl.enter((ctx) => {
             ctx.reply("How many posts do you need?");
             // log
             new Log(ctx).log("click on nextfuckinglevel");
         });

         
         nfl.on('message', (ctx) => {
             let msg = ctx.message.text;

             if (isNaN(msg)) {
                 ctx.reply("Invalid input!");

                 ctx.flow.enter("nextfuckinglevelScene");
             } else {
                 this.redditHandler.returnNextLevel(Number(msg), (u) => {
                     if (u.is_video) {
                         ctx.replyWithVideo(
                             u.media.reddit_video.fallback_url,
                             this.keyboard.firstRedditCallback(u.title)
                         );
                     } else {
                         ctx.replyWithPhoto(
                             u.url,
                             this.keyboard.firstRedditCallback(u.title)
                         );
                     }
                 })
             }
         })

         

         nfl.leave((ctx) => {});

         return nfl;
     }


     helpScene() {
        const help = new Scene("helpScene");

        help.enter((ctx) => {
            ctx.reply("This is the help menu");

            // log
            new Log(ctx).log("on help");   

            ctx.flow.leave(); // leave
        });

        

        help.leave((ctx) => {});

        return help;

     }


     aboutScene() {
        const about = new Scene("aboutScene");

        about.enter((ctx) => {
            ctx.reply("This is the about menu");

            
             // log
             new Log(ctx).log("on about");

            ctx.flow.leave(); // leave
        });


        about.leave((ctx) => {});

        return about;

     }


 }



 module.exports.Scenes = Scenes;
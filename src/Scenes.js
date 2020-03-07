/**
 * 
 * 
 * Scenes.js
 * 
 * 
 */

const TelegrafFlow = require('telegraf-flow');
const { Scene } = TelegrafFlow;
const Extra = require('telegraf/extra');

const { Keyboard } = require("./Keyboard");
const { Log } = require("./Log");
const { RedditHandler } = require("./RedditHandler");
const Strings = require("./Strings");
const Secrets = require("./Secrets");


 class Scenes {
     constructor() {
         this.keyboard = new Keyboard();
         this.redditHandler = new RedditHandler();
     }


     greeterScene() {
         const greeter = new Scene("greeterScene");

         greeter.enter((ctx) => {
             let fname = (ctx.from.first_name != undefined) ? ctx.from.first_name : ctx.from.username;

             ctx.reply(`Hello ${fname}`, this.keyboard.mainKeyboard());

             // log
             new Log(ctx).log("Started the bot!");

             // leave
             ctx.flow.leave();
         });
         greeter.leave((ctx) => {});


         return greeter;
     }

     greeterScene2() {

        const greeter = new Scene("greeterScene2");

        greeter.enter((ctx) => {

            let fname = (ctx.from.first_name != undefined) ? ctx.from.first_name : ctx.from.username;

             ctx.reply(`Hello ${fname}`, this.keyboard.normalKeyboard());

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
             ctx.reply("How many posts do you need?", this.keyboard.cancelKeyboard());
             // log
             new Log(ctx).log("click on nextfuckinglevel");
         });

         
         nfl.on('message', (ctx) => {
             let msg = ctx.message.text;

             if (isNaN(msg)) {
                 ctx.reply("Invalid input!");

                 ctx.flow.enter("nextfuckinglevelScene");
             } else {
                 this.redditHandler.returnNextLevel(Number(msg), 'nextfuckinglevel', (u) => {
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
                 });
             }
            
             // change keyboard
             ctx.reply("Done!", this.keyboard.mainKeyboard());

             // leave 
             ctx.flow.leave();
         });

         

         nfl.leave((ctx) => {});

         return nfl;
     }


     otherScene() {
         const other = new Scene("otherScene");

         other.enter((ctx) => {
             ctx.reply("Type in the name of the subriddet and how many post you need.\n\nExample: 'blah 10'", this.keyboard.cancelKeyboard());

             // Log
             new Log(ctx).log(Strings.sother);
         });


         other.on("message", (ctx) => {
             let msg = ctx.message.text;
             let splitted = msg.split(' ');

             if (splitted.length == 2 && splitted != undefined) {
                this.redditHandler.returnNextLevel(Number(splitted[1]), splitted[0], (u) => {
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
                });

                // done reply
                ctx.reply("Done!");

                // leave
                ctx.flow.leave();
             } else {
                 ctx.reply("Invalid input!");

                 // reenter
                 ctx.flow.enter("otherScene");
             }
         });



         other.leave((ctx) => {});

         return other;
     }


     helpScene() {
        const help = new Scene("helpScene");

        help.enter((ctx) => {
            ctx.reply(Strings.help_string);

            // log
            new Log(ctx).log(Strings.shelp);   

            ctx.flow.leave(); // leave
        });

        

        help.leave((ctx) => {});

        return help;

     }


     aboutScene() {
        const about = new Scene("aboutScene");

        about.enter((ctx) => {
            ctx.reply(Strings.about_string);

            
             // log
             new Log(ctx).log(Strings.sabout);

            ctx.flow.leave(); // leave
        });


        about.leave((ctx) => {});

        return about;

     }


     feedbackScene() {
         const feedback = new Scene("feedbackScene");

         feedback.enter((ctx) => {
             ctx.reply("Type in your feedback 😊", this.keyboard.cancelKeyboard());

              // log
              new Log(ctx).log(Strings.sfeedback);
         });

         feedback.on("message", (ctx) => {
             let msg = ctx.message.text;

             let crafted_msg = new Log(ctx).ctxBeautifier() + 
                            `\n\n******FEEDBACK******\n\n${msg}`;

             ctx.telegram.sendMessage(Secrets.APPROVAL_ID, crafted_msg);

             // is feedback entered
             ctx.flow.state.is_feedback_exists = true;


             // leave
             ctx.flow.leave();
         });


         feedback.leave((ctx) => {
             if (ctx.flow.state.is_feedback_exists) {
                 (this.isAdmin(ctx.from.id)) ? ctx.reply("Thanks!", this.keyboard.mainKeyboard()) : ctx.reply("Thanks!", this.keyboard.normalKeyboard());
             }
         });

         return feedback;
     }


     isAdmin(id) {
        for (let i=0; i<Secrets.ADMINS.length; i++) {
            if (Secrets.ADMINS[i] == id) return true;
        }

        return false;
    }


 }



 module.exports.Scenes = Scenes;
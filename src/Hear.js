/**
 * 
 * 
 * Hear.js
 * 
 * 
 */

 const Strings = require("./Strings");
 const Secrets = require("./Secrets");
 const { Keyboard } = require("./Keyboard");
 const { Log } = require("./Log");


 class Hear {
     constructor(ctx) {
         this.ctx = ctx;
         this.keyboard = new Keyboard();
     }


     hear() {

         this.ctx.hears(Strings.snfl, (ctx) => {
            (this.isAdmin(ctx.from.id)) ? ctx.flow.enter("nextfuckinglevelScene") : ctx.reply("Hello");
         });


         this.ctx.hears(Strings.shelp, (ctx) => {
             (this.isAdmin(ctx.from.id)) ? ctx.flow.enter("helpScene") : ctx.reply("Hello");
         });

         this.ctx.hears(Strings.sfeedback, (ctx) => {
             ctx.flow.enter("feedbackScene");
         });

         this.ctx.hears(Strings.sabout, (ctx) => {
             ctx.flow.enter("aboutScene");
         });

         this.ctx.hears(Strings.scancel, (ctx) => {
             (this.isAdmin(ctx.from.id)) ? ctx.reply("Canceled!", this.keyboard.mainKeyboard()) : ctx.reply("Canceled!", this.keyboard.normalKeyboard());

              // log
              new Log(ctx).log(Strings.scancel);

             // leave Scene
             ctx.flow.leave();
         });
     }


     isAdmin(id) {
         for (let i=0; i<Secrets.ADMINS.length; i++) {
             if (Secrets.ADMINS[i] == id) return true;
         }

         return false;
     }
 }


 module.exports.Hear = Hear;
/**
 * 
 * 
 * Hear.js
 * 
 * 
 */

 const Strings = require("./Strings");
 const Secrets = require("./Secrets");


 class Hear {
     constructor(ctx) {
         this.ctx = ctx;
     }


     hear() {

         this.ctx.hears(Strings.snfl, (ctx) => {
            (this.isAdmin(ctx.from.id)) ? ctx.flow.enter("nextfuckinglevelScene") : ctx.reply("Hello");
         });


         this.ctx.hears(Strings.shelp, (ctx) => {
             (this.isAdmin(ctx.from.id)) ? ctx.flow.enter("helpScene") : ctx.reply("Hello");
         })

         this.ctx.hears(Strings.sabout, (ctx) => {
             (this.isAdmin(ctx.from.id)) ? ctx.flow.enter("aboutScene") : ctx.reply("Hello");
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
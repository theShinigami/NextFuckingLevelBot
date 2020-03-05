/**
 * 
 * 
 * Hear.js
 * 
 * 
 */

 const Strings = require("./Strings");


 class Hear {
     constructor(ctx) {
         this.ctx = ctx;
     }


     hear() {
         this.ctx.hears(Strings.snfl, (ctx) => {
             ctx.flow.enter("nextfuckinglevelScene");
         });


         this.ctx.hears(Strings.shelp, (ctx) => {
             ctx.flow.enter("helpScene");
         })

         this.ctx.hears(Strings.sabout, (ctx) => {
             ctx.flow.enter("aboutScene");
         });
     }
 }


 module.exports.Hear = Hear;
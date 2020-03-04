/**
 * 
 * 
 * Log.js
 * 
 * 
 */

 const Secrets = require("./Secrets");


 class Log {
     constructor(ctx) {
         this.ctx = ctx;
     }

     log(msg) {
         let data = `ID: ${this.ctx.from.id}` +
                    `\nis_bot: ${this.ctx.from.is_bot}` +
                    `\nfirst_name: ${this.ctx.from.first_name}` +
                    `\nlast_name: ${this.ctx.from.last_name}` +
                    `\nusername: ${this.ctx.from.username}` +
                    `\n\n ${msg}`
         this.ctx.telegram.sendMessage(Secrets.LOG_ID, data);
     }
 }


 module.exports.Log = Log;
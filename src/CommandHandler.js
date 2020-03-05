/**
 * 
 * 
 * 
 * CommandHandler.js
 * 
 * 
 * 
 */


 const Secrets = require("./Secrets");
 const { Log } = require("./Log");


class CommandHandler {
    constructor(flow) {
        this.flow = flow;
    }


    start() {
        this.flow.start((ctx) => {
            (this.isAdmin(ctx.from.id)) ? ctx.flow.enter("gretterScene") : this.logReply(ctx, "Hello");
        });
    }


    logReply(ctx, msg) {
        // log
        new Log(ctx).log("started the bot");

        ctx.reply(msg);
    }



    isAdmin(id) {
        for (let i=0; i<Secrets.ADMINS.length; i++) {
            if (Secrets.ADMINS[i] == id) return true;
        }

        return false;
    }

    
}



module.exports.CommandHandler = CommandHandler;


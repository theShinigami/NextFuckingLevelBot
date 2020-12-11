/**
 * 
 * 
 * ActionHandler.js
 * 
 * 
 */

 const { Log } = require("./Log");
 const Secrets = require("./Secrets");
 const { Keyboard } = require("./Keyboard");




 class ActionHandler {
     constructor(ctx) {
         this.ctx = ctx;
         this.keyboard = new Keyboard();
     }


     actions() {
         // confirm post
         this.ctx.action("confirm-post", (ctx) => {

            // edit caption
            ctx.update.callback_query.message.caption += "\n\n@nextfuckinlevel";

            // send approval channel
            ctx.telegram.sendCopy(
                Secrets.APPROVAL_ID, 
                ctx.update.callback_query.message,
                this.keyboard.postApprovalCallback()
            );

            // delete message
            ctx.telegram.deleteMessage(ctx.chat.id, ctx.update.callback_query.message.message_id);

            // Log
            new Log(ctx).log("clicked confirm-post");

             ctx.answerCbQuery("Confirmed!");
         });

         // cancel post
         this.ctx.action("cancel-post", (ctx) => {
            
            // delete message
            ctx.telegram.deleteMessage(ctx.chat.id, ctx.update.callback_query.message.message_id);

            // Log
            new Log(ctx).log("Clicked cancel-post");

             ctx.answerCbQuery("Canceld!");
         });

         // approve post
         this.ctx.action("approve-post", (ctx) => {

            // remove inline keyboard
            ctx.update.callback_query.message.reply_markup = {}

            // post
            ctx.telegram.sendCopy(
                Secrets.MAIN_CHANNEL_USERNAME,
                ctx.update.callback_query.message,
            );

            // Log
            new Log(ctx).log("Approved post");

            ctx.answerCbQuery("Approved!");
         });

         // decline post
         this.ctx.action("decline-post", (ctx) => {

            // delete message
            ctx.telegram.deleteMessage(ctx.chat.id, ctx.update.callback_query.message.message_id);

            // Log
            new Log(ctx).log("Clicked decline-post");

            ctx.answerCbQuery("Declined!");
         });
     }
 }


 module.exports.ActionHandler = ActionHandler;
/**
 * 
 * 
 * Keyboard.js
 * 
 * 
 */

 const Extra = require('telegraf/extra');
 const Markup = require('telegraf/markup');

 const Strings = require("./Strings");



 class Keyboard {
     constructor() {
     }


     mainKeyboard() {
         return Markup.keyboard([
             [Strings.snfl],
             [Strings.shelp, Strings.sfeedback],
             [Strings.sabout]
         ])
         .oneTime()
         .resize()
         .extra();
     }


     normalKeyboard() {
        return Markup.keyboard([
            [Strings.sfeedback],
            [Strings.sabout]
        ])
        .oneTime()
        .resize()
        .extra();
     }


     cancelKeyboard() {
        return Markup.keyboard([
            [Strings.scancel]
        ])
        .oneTime()
        .resize()
        .extra();
     }

     
     firstRedditCallback(c) {
         const extra = Extra.markup(Markup.inlineKeyboard([
             Markup.callbackButton("Confirm", "confirm-post"),
             Markup.callbackButton("Cancel", "cancel-post")
         ]));

         extra.caption = c;

         return extra;
     }

     
     postApprovalCallback() {
         return Extra.markup(Markup.inlineKeyboard([
             Markup.callbackButton("Approve", "approve-post"),
             Markup.callbackButton("Decline", "decline-post")
         ]));
     }


     removeInline() {
         return Extra.markup(
             Markup.removeKeyboard()
         );
     }
 }



 module.exports.Keyboard = Keyboard;
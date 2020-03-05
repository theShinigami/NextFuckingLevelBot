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
             [Strings.shelp, Strings.sabout]
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
 }



 module.exports.Keyboard = Keyboard;
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
 }



 module.exports.Keyboard = Keyboard;
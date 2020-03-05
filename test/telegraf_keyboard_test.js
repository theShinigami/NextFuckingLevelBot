const Telegraf = require('telegraf')
const TelegrafInlineMenu = require('telegraf-inline-menu')
 
console.log("Telegramming...");
const menu = new TelegrafInlineMenu(ctx => `Hey ${ctx.from.first_name}!`)
menu.setCommand('start')
 
menu.simpleButton('I am excited!', 'a', {
  doFunc: ctx => ctx.reply('As am I!')
});

menu.lis
 
 
const bot = new Telegraf("")
 
bot.use(menu.init())
 
bot.startPolling()

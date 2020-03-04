const Telegraf = require('telegraf');
const TelegrafFlow = require('telegraf-flow');
const { Scene } = TelegrafFlow;
const flow = new TelegrafFlow();

const Secrets = require("./src/Secrets");


// bot
const bot = new Telegraf(Secrets.BOT_TOKEN);

console.log("==> Bot Started...");



bot.start((ctx) => ctx.reply('Welcome!'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()
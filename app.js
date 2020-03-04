const Telegraf = require('telegraf');
const TelegrafFlow = require('telegraf-flow');
const flow = new TelegrafFlow();

const Secrets = require("./src/Secrets");
const { Scenes } = require("./src/Scenes");


// bot
const bot = new Telegraf(Secrets.BOT_TOKEN);

console.log("==> Bot Started...");





flow.start((ctx) => {
    ctx.reply("Hello");
    ctx.flow.enter("gretterScene");
})



// register
flow.register(new Scenes().greeterScene());


bot.use(Telegraf.session())
bot.use(flow.middleware())

bot.launch()
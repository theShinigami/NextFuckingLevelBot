const Telegraf = require('telegraf');
const TelegrafFlow = require('telegraf-flow');
const flow = new TelegrafFlow();

const Secrets = require("./src/Secrets");
const { Scenes } = require("./src/Scenes");
const { CommandHandler } = require("./src/CommandHandler");
const { Hear } = require("./src/Hear");
const { ActionHandler } = require("./src/ActionHandler");


// bot
const bot = new Telegraf(Secrets.BOT_TOKEN);

// commandHandler
const commandHandler = new CommandHandler(flow);

// Hear
const hear = new Hear(flow);

// Action
const actionHandler = new ActionHandler(bot);

console.log("==> Bot Started...");


// commands
commandHandler.start();

// Hear
hear.hear();


// action
actionHandler.actions();




// register
flow.register(new Scenes().greeterScene());
flow.register(new Scenes().nextfuckinglevelScene());
flow.register(new Scenes().helpScene());
flow.register(new Scenes().aboutScene());


bot.use(Telegraf.session())
bot.use(flow.middleware())

bot.launch()
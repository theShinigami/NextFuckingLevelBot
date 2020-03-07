const Telegraf = require('telegraf');
const TelegrafFlow = require('telegraf-flow');
const flow = new TelegrafFlow();

const Secrets = require("./src/Secrets");
const { Scenes } = require("./src/Scenes");
const { CommandHandler } = require("./src/CommandHandler");
const { Hear } = require("./src/Hear");
const { ActionHandler } = require("./src/ActionHandler");


// bot
const bot = new Telegraf(process.env.BOT_TOKEN);

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
flow.register(new Scenes().greeterScene2());
flow.register(new Scenes().nextfuckinglevelScene());
flow.register(new Scenes().helpScene());
flow.register(new Scenes().aboutScene());
flow.register(new Scenes().feedbackScene());
flow.register(new Scenes().otherScene());


bot.use(Telegraf.session())
bot.use(flow.middleware())


bot.telegram.setWebhook("https://nextfuckinglevelbot.herokuapp.com/" + process.env.BOT_TOKEN);
bot.startWebhook('/' + process.env.BOT_TOKEN, null, process.env.PORT)

// bot.launch()
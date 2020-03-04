


class CommandHandler {
    constructor(flow) {
        this.flow = flow;
    }


    start() {
        this.flow.start((ctx) => {
            ctx.flow.enter("gretterScene");
        });
    }

    
}



module.exports.CommandHandler = CommandHandler;


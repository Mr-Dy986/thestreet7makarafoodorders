const { Telegraf } = require("telegraf");
const TOKEN = ("5522235076:AAFxi7uTija6AqcbzcqvYwCCXMdiQnJt-TU")
const TOKEN1 = ("5477503092:AAGzUsP5EYzGIZZf4Ng31kyjAodKEbn2Fw8")
const bot = new Telegraf(TOKEN);

const web_link = "http://localhost/Durger-King-Cart/index.html";

bot.start((ctx) =>
    ctx.reply("សូមស្វាគមន៍", {
        reply_markup: {
            keyboard: [[{ text: "កម្មង់ម្ហូប", web_app: { url: web_link } }]],
        },
    })
)

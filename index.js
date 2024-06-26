const TelegramBot = require('node-telegram-bot-api');
const promptAsker = require('./ollama-client')
require('dotenv').config()
// import 'dontenv/config'
console.log(process.env.TELEGRAM_BOT_API);
// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_BOT_API;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
    // var reply=promptAsker(msg);
    console.log("Recieved-> "+msg.text);
    var reply= await promptAsker(msg.text);
    console.log("Replyed-> "+reply);
  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, reply);
});
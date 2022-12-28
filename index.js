const SlackBot = require('slackbots');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const bot = new SlackBot({
    token: `${process.env.SLACK_BOT_TOKEN}`,
    name: 'pizzabot'
});

// Start handler
bot.on('start', () => {
    const params = {
        icon_emoji: ':pizza:'
    }
    bot.postMessageToChannel('test-task', 'Are you ready to make a pizza order?', params);
});
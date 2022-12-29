const { WebClient } = require('@slack/web-api');
const { createEventAdapter } = require('@slack/events-api');
const dotenv = require('dotenv');
dotenv.config();

const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackBotToken = process.env.SLACK_BOT_TOKEN;
const port = process.env.SLACK_BOT_PORT;

const slackEvents = createEventAdapter(slackSigningSecret);
const slackClient = new WebClient(slackBotToken);

slackEvents.on('app_mention', (event) => {
    console.log(`Got message from ${event.user}: ${event.text}`);
    (async () => {
        try {
            await slackClient.chat.postMessage({ channel: event.channel, text: `Hello <@${event.user}>!` });
        } catch (error) {
            console.log(error);
        }
    })();
})

slackEvents.on('error', console.error);

slackEvents.start(port).then(() => {
    console.log(`Server started on port ${port}`);
})
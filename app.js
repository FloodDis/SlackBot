const { WebClient } = require('@slack/web-api');
const { createEventAdapter } = require('@slack/events-api');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackBotToken = process.env.SLACK_BOT_TOKEN;
const port = process.env.SLACK_BOT_PORT;

const slackEvents = createEventAdapter(slackSigningSecret);
const slackClient = new WebClient(slackBotToken);

var pizzaName = 'undefined';
var pizzaSize = 'undefined';
var pizzaSideboard = 'undefined';
var deliveryAddress = 'undefined';

slackEvents.on('app_mention', (event) => {
    console.log(`Got message from ${event.user}: ${event.text}`);
    (async () => {
        try {
            startMessage = `Hello, <@${event.user}>! Are you ready to make an order?`;
            dataMessage = `For making an order you need to enter:\n` +
                `1) Pizza name (Marinara, Margarita, Calzone)\n` +
                `2) Size (Small, Medium, Large)\n` +
                `3) Sideboard (Regular, Cheese, Sausage)\n` +
                `4) Delivery address`;
            if (event.text === `<@U04GXJSM1UL> Hello` ||
                event.text === `<@U04GXJSM1UL> Hi`) {
                await slackClient.chat.postMessage({
                    channel: event.channel,
                    text: startMessage
                });
                await slackClient.chat.postMessage({
                    channel: event.channel,
                    text: dataMessage
                });
            }
            else {
                switch (event.text) {
                    case '<@U04GXJSM1UL> Marinara':
                        {
                            pizzaName = 'Marinara';
                            await slackClient.chat.postMessage({
                                channel: event.channel,
                                text: `Pizza name stored`
                            });
                            break;
                        }
                    case '<@U04GXJSM1UL> Margarita':
                        {
                            pizzaName = 'Margarita';
                            await slackClient.chat.postMessage({
                                channel: event.channel,
                                text: `Pizza name stored`
                            });
                            break;
                        }
                    case '<@U04GXJSM1UL> Calzone':
                        {
                            pizzaName = 'Calzone';
                            await slackClient.chat.postMessage({
                                channel: event.channel,
                                text: `Pizza name stored`
                            });
                            break;
                        }
                    case '<@U04GXJSM1UL> Small':
                        {
                            pizzaSize = 'Small';
                            await slackClient.chat.postMessage({
                                channel: event.channel,
                                text: `Pizza size stored`
                            });
                            break;
                        }
                    case '<@U04GXJSM1UL> Medium':
                        {
                            pizzaSize = 'Medium';
                            await slackClient.chat.postMessage({
                                channel: event.channel,
                                text: `Pizza size stored`
                            });
                            break;
                        }
                    case '<@U04GXJSM1UL> Large':
                        {
                            pizzaSize = 'Large';
                            await slackClient.chat.postMessage({
                                channel: event.channel,
                                text: `Pizza size stored`
                            });
                            break;
                        }
                    case '<@U04GXJSM1UL> Regular':
                        {
                            pizzaSideboard = 'Regular';
                            await slackClient.chat.postMessage({
                                channel: event.channel,
                                text: `Pizza sideboard stored`
                            });
                            break;
                        }
                    case '<@U04GXJSM1UL> Cheese':
                        {
                            pizzaSideboard = 'Cheese';
                            await slackClient.chat.postMessage({
                                channel: event.channel,
                                text: `Pizza sideboard stored`
                            });
                            break;
                        }
                    case '<@U04GXJSM1UL> Sausage':
                        {
                            pizzaSideboard = 'Sausage';
                            await slackClient.chat.postMessage({
                                channel: event.channel,
                                text: `Pizza sideboard stored`
                            });
                            break;
                        }
                    case '<@U04GXJSM1UL> Tomsk':
                        {
                            deliveryAddress = 'Tomsk';
                            await slackClient.chat.postMessage({
                                channel: event.channel,
                                text: `Delivery address stored`
                            });
                            break;
                        }
                    case '<@U04GXJSM1UL> Novokuznetsk':
                        {
                            deliveryAddress = 'Novokuznetsk';
                            await slackClient.chat.postMessage({
                                channel: event.channel,
                                text: `Delivery address stored`
                            });
                            break;
                        }
                    case '<@U04GXJSM1UL> Novosibirsk':
                        {
                            deliveryAddress = 'Novosibirsk';
                            await slackClient.chat.postMessage({
                                channel: event.channel,
                                text: `Delivery address stored`
                            });
                            break;
                        }
                    case '<@U04GXJSM1UL> Save':
                        {
                            order = JSON.stringify({
                                name: pizzaName,
                                size: pizzaSize,
                                sizeboard: pizzaSideboard,
                                address: deliveryAddress
                            })
                            fs.appendFile(path.join(__dirname,'orders.txt'), order, function (err,data){
                                if(err)
                                {
                                    console.log(err);
                                }
                                else
                                {
                                    console.log(data);
                                }
                            });
                            break;
                        }
                        case '<@U04GXJSM1UL> Delete':
                            {
                                fs.rm(path.join(__dirname,'orders.txt'),function (err,data){
                                    if(err)
                                    {
                                        console.log(err);
                                    }
                                    else
                                    {
                                        console.log(data);
                                    }}); 
                                    break;
                            }
                    default:
                        {
                            await slackClient.chat.postMessage({
                                channel: event.channel,
                                text: `Sorry, I do not understand`
                            });
                            break;
                        }
                }
                console.log(`Pizza name: ${pizzaName}`);
                console.log(`Pizza size: ${pizzaSize}`);
                console.log(`Pizza sizeboard: ${pizzaSideboard}`);
                console.log(`Delivery adress: ${deliveryAddress}`);
            }
        } catch (error) {
            console.log(error);
        }
    })();
})

slackEvents.on('error', console.error);

slackEvents.start(port).then(() => {
    console.log(`Server started on port ${port}`);
})
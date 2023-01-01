const { WebClient } = require('@slack/web-api');
const { createEventAdapter } = require('@slack/events-api');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { fileLoader } = require('ejs');
const { F_OK } = require('constants');
dotenv.config();

const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackBotToken = process.env.SLACK_BOT_TOKEN;
const port = process.env.SLACK_BOT_PORT;
const participantID = process.env.PARTICIPANT_ID;

const slackEvents = createEventAdapter(slackSigningSecret);
const slackClient = new WebClient(slackBotToken);

var pizzaName = 'undefined';
var pizzaSize = 'undefined';
var doughThickness = 'undefined';
var pizzaSideboard = 'undefined';
var deliveryAddress = 'undefined';

function ClearOrder() {
    pizzaName = 'undefined';
    pizzaSize = 'undefined';
    doughThickness = 'undefined';
    pizzaSideboard = 'undefined';
    deliveryAddress = 'undefined';
}

slackEvents.on('app_mention', (event) => {
    console.log(`Got message from ${event.user}: ${event.text}`);
    (async () => {
        try {
            startMessage = `Hello, <@${event.user}>! Are you ready to make an order?`;
            dataMessage = `For making an order you need to enter:\n` +
                `1) Pizza name (Marinara, Margarita, Calzone)\n` +
                `2) Size (Small, Medium, Large)\n` +
                `3) Dough thickness (Thin, Normal)\n`+
                `4) Sideboard (Regular, Cheese, Sausage)\n` +
                `5) Delivery address (Tomsk, Novokuznetsk, Novosibirsk)`;
            if (event.text === `<@${participantID}> Hello` ||
                event.text === `<@${participantID}> Hi`) {
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
                    case `<@${participantID}> Marinara`:
                        {
                            pizzaName = 'Marinara';
                            await slackClient.chat.postMessage({
                                channel: event.channel,
                                text: `Pizza name stored`
                            });
                            break;
                        }
                    case `<@${participantID}> Margarita`:
                        {
                            pizzaName = 'Margarita';
                            await slackClient.chat.postMessage({
                                channel: event.channel,
                                text: `Pizza name stored`
                            });
                            break;
                        }
                    case `<@${participantID}> Calzone`:
                        {
                            pizzaName = 'Calzone';
                            await slackClient.chat.postMessage({
                                channel: event.channel,
                                text: `Pizza name stored`
                            });
                            break;
                        }
                    case `<@${participantID}> Small`:
                        {
                            pizzaSize = 'Small';
                            await slackClient.chat.postMessage({
                                channel: event.channel,
                                text: `Pizza size stored`
                            });
                            break;
                        }
                    case `<@${participantID}> Medium`:
                        {
                            pizzaSize = 'Medium';
                            await slackClient.chat.postMessage({
                                channel: event.channel,
                                text: `Pizza size stored`
                            });
                            break;
                        }
                    case `<@${participantID}> Large`:
                        {
                            pizzaSize = 'Large';
                            await slackClient.chat.postMessage({
                                channel: event.channel,
                                text: `Pizza size stored`
                            });
                            break;
                        }
                    case `<@${participantID}> Thin`:
                        {
                            doughThickness = 'Thin';
                            await slackClient.chat.postMessage({
                                channel: event.channel,
                                text: `Dough thickness stored`
                            });
                            break;
                        }
                    case `<@${participantID}> Normal`:
                        {
                            doughThickness = 'Normal';
                            await slackClient.chat.postMessage({
                                channel: event.channel,
                                text: `Dough thickness stored`
                            });
                            break;
                        }
                    case `<@${participantID}> Regular`:
                        {
                            pizzaSideboard = 'Regular';
                            await slackClient.chat.postMessage({
                                channel: event.channel,
                                text: `Pizza sideboard stored`
                            });
                            break;
                        }
                    case `<@${participantID}> Cheese`:
                        {
                            pizzaSideboard = 'Cheese';
                            await slackClient.chat.postMessage({
                                channel: event.channel,
                                text: `Pizza sideboard stored`
                            });
                            break;
                        }
                    case `<@${participantID}> Sausage`:
                        {
                            pizzaSideboard = 'Sausage';
                            await slackClient.chat.postMessage({
                                channel: event.channel,
                                text: `Pizza sideboard stored`
                            });
                            break;
                        }
                    case `<@${participantID}> Tomsk`:
                        {
                            deliveryAddress = 'Tomsk';
                            await slackClient.chat.postMessage({
                                channel: event.channel,
                                text: `Delivery address stored`
                            });
                            break;
                        }
                    case `<@${participantID}> Novokuznetsk`:
                        {
                            deliveryAddress = 'Novokuznetsk';
                            await slackClient.chat.postMessage({
                                channel: event.channel,
                                text: `Delivery address stored`
                            });
                            break;
                        }
                    case `<@${participantID}> Novosibirsk`:
                        {
                            deliveryAddress = 'Novosibirsk';
                            await slackClient.chat.postMessage({
                                channel: event.channel,
                                text: `Delivery address stored`
                            });
                            break;
                        }
                    case `<@${participantID}> Save`:
                        {
                            if (pizzaName == 'undefined'
                                || pizzaSize == 'undefined'
                                || doughThickness == 'undefined'
                                || pizzaSideboard == 'undefined'
                                || deliveryAddress == 'undefined') {
                                await slackClient.chat.postMessage({
                                    channel: event.channel,
                                    text: `Order isn't fully entered`
                                });
                                break;
                            }
                            order = {
                                name: pizzaName,
                                size: pizzaSize,
                                thickness: doughThickness,
                                sizeboard: pizzaSideboard,
                                address: deliveryAddress
                            };
                            var data;
                            try {
                                data = require('./orders.json');
                            } catch (err) {
                                fs.writeFileSync('orders.json', '[]');
                                data = require('./orders.json');
                            }
                            data.push(order);
                            fs.writeFileSync('orders.json', JSON.stringify(data, null, 2), function (err, data) {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    console.log(data);
                                }
                            })
                            await slackClient.chat.postMessage({
                                channel: event.channel,
                                text: `The order has been accepted for processing`
                            });
                            ClearOrder();
                            break;
                        }
                    case `<@${participantID}> Clear order`:
                        {
                            ClearOrder();
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
                var orderState = `Your entered:\n`;
                if (pizzaName !== 'undefined') {
                    orderState += `Pizza name: ${pizzaName}\n`;
                }
                if (pizzaSize !== 'undefined') {
                    orderState += `Pizza size: ${pizzaSize}\n`;
                }
                if (doughThickness !== 'undefined') {
                    orderState += `Dough thickness: ${doughThickness}\n`;
                }
                if (pizzaSideboard !== 'undefined') {
                    orderState += `Pizza sizeboard: ${pizzaSideboard}\n`;
                }
                if (deliveryAddress !== 'undefined') {
                    orderState += `Delivery address: ${deliveryAddress}\n`;
                }
                await slackClient.chat.postMessage({
                    channel: event.channel,
                    text: orderState
                });
                console.log(`Pizza name: ${pizzaName}`);
                console.log(`Pizza size: ${pizzaSize}`);
                console.log(`Dough thickness: ${doughThickness}`)
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
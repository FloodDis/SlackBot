const express = require('express');
const orderList = express();
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.ORDERLIST_PORT;
orderList.listen(port);
console.log(`Listening to the port ${port}`);

orderList.set('view engine', 'ejs');

orderList.get('/', (req, res) => {
    res.render('order-list');
});
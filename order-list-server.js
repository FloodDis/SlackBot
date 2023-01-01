const express = require('express');
const orderList = express();
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.ORDERLIST_PORT;
orderList.listen(port);
console.log(`Listening to the port ${port}`);

orderList.set('view engine', 'ejs');
orderList.set("views", path.join(__dirname, "views"));

orderList.get('/', (req, res) => {
    res.render('order-list');
});
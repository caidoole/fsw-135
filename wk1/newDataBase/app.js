const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const InventoryModel = require('./models/Inventory')

mongoose.connect('mongodb://localhost:27017/ecommercedb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, () => console.log("Connected"));


app.use(morgan('dev'))
app.use(express.json())
//app.use('/', require('./routes/'))
app.listen(3001, ()=> {console.log('Server is running on Port 3001')})
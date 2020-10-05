const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
// const Inventory = require('./models/Inventory')
// const inventoryRouter = require('./routes/inventoryRouter')

app.use(morgan('dev'))
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/ecommercedb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, 
() => console.log("Connected to ecommercedb"));

app.use('/inventory', require('./routes/inventoryRouter'))

app.use((err, req, res, next)=>{
    console.log(err)
    return res.send({errMsg: err.message})
})

app.listen(3001, ()=> {console.log('Server is running on Port 3001')})
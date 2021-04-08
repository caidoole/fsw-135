const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

app.use(morgan('dev'))
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/rockthevote',
 {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, 
() => console.log("Connected too the VOTE"));

app.use('/user', require('./router/authRouter'))

app.use((err, req, res, next)=>{
    console.log(err)
    return res.send({errMsg: err.message})
})

app.listen(3002, ()=> {console.log('Server is running on Port 3002')})
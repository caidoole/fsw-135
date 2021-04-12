const express = require('express');
const server = express();
require('dotenv').config();
const morgan = require('morgan');
const mongoose = require('mongoose');
const expressJwt = require('express-jwt');

server.use(morgan('dev'))
server.use(express.json())

mongoose.connect('mongodb://localhost:27017/rockthevote',
 {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, 
() => console.log("Connected to the VOTE"));

server.use('/auth', require('./router/authRouter.js'))
server.use('/api', expressJwt({ secret: process.env.SECRET, algorithms: ['HS256']}))
server.use('/api/user', require('./router/authRouter.js'))
server.use('/api/comment', require('./router/commentRouter.js'))

server.use((err, req, res, next)=>{
    console.log(err)
    if(err.name === "Unauthorized Error"){
        res.status(err.status);
    }
    return res.send({errMsg: err.message})
})

server.listen(3002, ()=> {console.log('Server is running on Port 3002')})
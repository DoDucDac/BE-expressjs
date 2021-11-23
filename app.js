const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.use(bodyParser.json());
const questionRoute = require('./routers/questions')
const accountRoute = require('./routers/accounts');
app.use('/questions', questionRoute );
app.use('/accounts', accountRoute);
app.use('/', (req,res)=>{
    res.send('Hello world!!');
})

module.exports = app;


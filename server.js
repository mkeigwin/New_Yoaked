'use strict';
const express     = require('express');
const logger      = require('morgan');
const path        = require('path');
const bodyParser  = require('body-parser');
const jwt         = require('jsonwebtoken');
const expressJWT  = require('express-jwt');
const bcrypt      = require('bcryptjs');

const isDev = !('NODE_ENV' in process.env) && require('dotenv').config() && true;

const app         = express();
const PORT        = process.argv[2] || process.env.PORT || 3000;

app.use(logger(isDev ? 'dev' : 'common'));

app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.json());


// added from Dan Pease Auth Temp
app.use(expressJWT({secret: process.env.SECRET}).unless({path: ['/favicon.ico', '/user/login', '/user/signup']}));


app.use('/exercise', require('./routes/exercise'));
const userRouter = require('./routes/user.js');
const apiRouter = require('./routes/api.js');
app.use('/user', userRouter);
app.use('/api', apiRouter);

app.listen(PORT, () => console.log('server here! listening on', PORT));


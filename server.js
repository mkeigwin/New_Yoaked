'use strict';
const express     = require('express');
const logger      = require('morgan');
const path        = require('path');
const bodyParser  = require('body-parser');

const isDev = !('NODE_ENV' in process.env) && require('dotenv').config() && true;

const app         = express();
const PORT        = process.argv[2] || process.env.PORT || 3000;

app.use(logger(isDev ? 'dev' : 'common'));

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'Public')));
app.use(bodyParser.json());

// app.use('/paint', require('./routes/paint'));
// app.use('/users', require('./routes/users'));
// app.use('/auth', require('./routes/auth'));

app.listen(PORT, () => console.log('server here! listening on', PORT));


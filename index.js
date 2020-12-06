'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
const config = require('./config');

const noteRoutes = require('./routes/note-routes');
// const accountRoutes = require('./routes/account-routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api', noteRoutes.routes);

app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));
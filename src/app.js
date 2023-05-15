const express = require('express');
const helloRouter = require('./routes/hello');
const starTrekRouter = require('./routes/star-trek');

const app = express();

app.use(express.json());

app.use('/hello', helloRouter);
app.use('/trekkie', starTrekRouter);

module.exports = app;
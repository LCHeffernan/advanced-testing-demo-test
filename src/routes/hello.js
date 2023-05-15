const express = require('express');
const { sendHello } = require('../controllers/hello');

const helloRouter = express.Router();

helloRouter.get('/', sendHello);

module.exports = helloRouter;

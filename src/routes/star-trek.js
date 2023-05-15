const express = require('express');
const { create } = require('../controllers/star-trek');

const starTrekRouter = express.Router();

starTrekRouter.post('/', create);

module.exports = starTrekRouter;
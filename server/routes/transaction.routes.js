const express = require('express');

const TransactionController = require('../controllers/TransactionController');

const routes = express.Router();

routes.get('/transactions', TransactionController.index);

module.exports = routes;
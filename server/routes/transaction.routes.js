const express = require('express');

const TransactionController = require('../controllers/TransactionController');

const routes = express.Router();

routes.get('/transactions', TransactionController.index);

routes.post('/transactions', TransactionController.store);

routes.get('/transactions/getByProducer', TransactionController.getByProducer);

module.exports = routes;
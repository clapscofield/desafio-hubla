const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config');

const Transaction = require('../models/transaction.model');

const connection = new Sequelize(dbConfig);

Transaction.init(connection);

Transaction.associate(connection.models);

module.exports = connection;
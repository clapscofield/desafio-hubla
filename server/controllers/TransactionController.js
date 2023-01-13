const { Op } = require('sequelize');
const { Sequelize } = require('../models');
const { sequelize } = require('../models');
const Transaction = require('../models/transaction.model')(sequelize, Sequelize);

module.exports = {
  async index(req, res) {
    const transactions = await Transaction.findAll();

    return res.json(transactions);
  }
};
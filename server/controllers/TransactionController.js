const { Op } = require('sequelize');
const { Sequelize } = require('../models');
const { sequelize } = require('../models');
const Transaction = require('../models/transaction.model')(sequelize, Sequelize);

module.exports = {
  async index(req, res) {
    const transactions = await Transaction.findAll();

    return res.json(transactions);
  },

  async store(req, res) {
    const { type, date, product, value, salesman} = req.body;

    const transaction = await Transaction.create({
      type,
      date,
      product,
      value,
      salesman
    });

    return res.json(transaction);
  },

  async getByProducer (req, res) {
    console.log(req.query);
    const transaction = await Transaction.findAll({
      where: {
        salesman: req.query.name
      }
    });

    return res.json(transaction);
  },

};
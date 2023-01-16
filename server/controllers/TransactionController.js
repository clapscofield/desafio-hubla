const { Op } = require('sequelize');
const { Sequelize } = require('../models');
const { sequelize } = require('../models');
const Transaction = require('../models/transaction.model')(sequelize, Sequelize);

module.exports = {
  async index(req, res) {
    try{
        const transactions = await Transaction.findAll();
        return res.json(transactions);

      } catch(error) { 
        return res
            .status(500)
            .json({ message: "Error in invocation of server to get all transactions." })
      }
  },

  async store(req, res) {
    const { type, date, product, value, salesman} = req.body;
    if(type == null || date == null || product == null || value == null || salesman == null){
        return res
            .status(400)
            .json({ message: "Transaction file data is broken or incomplete." })
    }
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
    if(req.query.name == null){
        return res
            .status(400)
            .json({ message: "Invalid producer name to get transactions." })
    }

    try{
        const transaction = await Transaction.findAll({
            where: {
              salesman: req.query.name
            }
          });
      
          return res.json(transaction);
      } catch(error) { 
        return res
            .status(400)
            .json({ message: "Error in trying to get all transactions by producer." })
      }
  },

};
const db = require("../models");
const Transaction = db.transaction.Transaction;
const Op = db.Sequelize.Op;

module.exports = {
    async store(req, res) {
        const { type, date, product, value, salesman } = req.body;
    
        const transaction = await Transaction.create({
          type,
          date,
          product,
          value,
          salesman
        });
    
        return res.json(transaction);
      },
    
    async findAll(req, res) {
        const sales = await Transaction.findAll();
        res.json(sales);
    }

};
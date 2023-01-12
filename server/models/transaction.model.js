module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("transaction", {
      type: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.STRING
      },
      product: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.INTEGER
      },
      salesman: {
        type: Sequelize.STRING
      },
    });
  
    return Transaction;
  };
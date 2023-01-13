const db = require("../models");
const Transaction = db.transaction.Transaction;
const Op = db.Sequelize.Op;

// // Create and Save a new Transaction
// exports.create = (req, res) => {
//     // Validate request
//     if (!req.body.type || !req.body.date || !req.body.product || !req.body.value || !req.doby.salesman) {
//         res.status(400).send({
//           message: "Content can not be empty! Data is missing."
//         });
//         return;
//       }
    
//       // Create a Transaction
//       const transaction = {
//         type: req.body.type,
//         date: req.body.date,
//         product: req.body.product,
//         value: req.body.value,
//         salesman: req.body.salesman
//       };
    
//       // Save Tutorial in the database
//       Transaction.create(transaction)
//         .then(data => {
//           res.send(data);
//         })
//         .catch(err => {
//           res.status(500).send({
//             message:
//               err.message || "Some error occurred while creating the transaction."
//           });
//         });
// };

// // Retrieve all Transactions from the database.
// // exports.findAll = (req, res) => {
// //     Transaction.find({})
// //       .then(data => {
// //         res.send(data);
// //       })
// //       .catch(err => {
// //         res.status(500).send({
// //           message:
// //             err.message || "Some error occurred while retrieving transactions."
// //         });
// //       });
// // };

// // Find a single Transaction with an id
// exports.findOne = (req, res) => {
  
// };

// // Update a Transaction by the id in the request
// exports.update = (req, res) => {
  
// };

// // Delete a Transaction with the specified id in the request
// exports.delete = (req, res) => {
  
// };

// // Delete all Transactions from the database.
// exports.deleteAll = (req, res) => {
  
// };

// // Find all published Transactions
// exports.findAllPublished = (req, res) => {
  
// };

async function findAll(req, res) {
    const sales = await Transaction.findAll();
    res.json(sales);
}

module.exports.findAll = findAll;
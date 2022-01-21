const express = require("express");
const transaction = require("../models/transaction.js");
const transactions = express.Router();
const transactionsArr = require("../models/transaction.js");

// ROUTES
// SENDS THE TRANSACTIONS ARRAY

// GET ALL
transactions.get("/", (req, res) => {
  res.json(transactionsArr);
});

// GET INDIVIDUAL TRANSACTION
// ADD ERROR HANDLING
// PATH PARAM MUST MATCH!!!
transactions.get("/:id", (req, res) => {
  const { id } = req.params;
  if (transactionsArr[id]) {
    res.json(transactionsArr[id]);
  } else {
    res.status(404).json({ error: "Transaction not found." });
  }
});

// CREATE TRANSACTION
// ADD TO END OF ALL TRANSACTIONS
transactions.post("/", (req, res) => {
  transactionsArr.push(req.body);
  res.json(transactionsArr[transactionsArr.length - 1]);
});

// DELETE
transactions.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (transactionsArr[id]) {
    res.json(transactionsArr.splice(id, 1));
  } else {
    res.status(404).json({ error: "Transaction not found." });
  }
});

// UPDATE
transactions.put("/:id", (req, res) => {
  const { id } = req.params;

  if (!transactionsArr[id]) {
    res.status(422).json({ error: "Not found." });
    return;
  }

  let { date, name, amount, from } = req.body
  if(date && name && from !== undefined && amount) {
      transactionsArr[id] = {
          date,
          name,
          amount,
          from,
      }
      res.json(transactionsArr[id])
  } else {
      res.status(422).json({ error: "Please provide all fields!"})
  }
});

module.exports = transactions;

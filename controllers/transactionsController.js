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
transactions.get("/:index", (req, res) => {
  const { index } = req.params;
  if (transactionsArr[index]) {
    res.json(transactionsArr[index]);
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
transactions.delete("/:index", (req, res) => {
  const { index } = req.params;
  if (transactionsArr[index]) {
    res.json(transactionsArr.splice(index, 1));
  } else {
    res.status(404).json({ error: "Transaction not found." });
  }
});

// UPDATE
transactions.put("/:index", (req, res) => {
  const { index } = req.params;

  if (!transactionsArr[index]) {
    res.status(422).json({ error: "Not found." });
    return;
  }

  let { date, name, amount, from, category } = req.body
  if(date && name && from !== undefined && amount && category) {
      transactionsArr[index] = {
          date,
          name,
          amount,
          from,
          category
      }
      res.json(transactionsArr[index])
  } else {
      res.status(422).json({ error: "Please provide all fields!"})
  }
});

module.exports = transactions;

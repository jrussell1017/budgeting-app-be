const express = require("express");
const transactions = express.Router();
const transactionsArr = require("../models/transaction.js");

transactions.get("/", (req, res) => {
  res.json(transactionsArr);
});

module.exports = transactions;

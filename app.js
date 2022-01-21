// DEPENDENCIES
const express = require("express");
const transactionsController = require("./controllers/transactionsController.js");

const cors = require("cors");

// CONFIG
const app = express();
// middleware
app.use(express.json());
app.use(cors());

app.use("/transactions", transactionsController);

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to my Budgeting App!");
});

app.get("*", (req, res) => {
    res.status(404).json({ error: "Page not found."})
})

// EXPORT
module.exports = app;

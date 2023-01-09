const express = require("express");
const router = express.Router();
const path = require("path");
const bodyParser = require("body-parser");
const jsonparser = bodyParser.json();

const expenseController = require("../controller/expense");

router.get("/", expenseController.getExpense);
router.post("/expense/addExpense", jsonparser, expenseController.insertExpense);
router.put(
  "/expense/addExpense/:id",
  jsonparser,
  expenseController.editExpense
);

router.delete(
  "/expense/deleteExpense/:id",
  jsonparser,
  expenseController.deleteExpense
);

module.exports = router;

import express from "express";
import { sql } from "../config/db.js";

const transactionRoute = express.Router();

transactionRoute.post("/transactions", async (req, res) => {
  try {
    const { title, amount, category, user_id } = req.body;

    if (!title || !category || !user_id || amount === undefined) {
      return res.status(400).json({ message: "All field are required!" });
    }

    const transaction = await sql`
    INSERT INTO transactions(user_id, title,amount,category)
    VALUES(${user_id}, ${title}, ${amount}, ${category})
    RETURNING *
    `;
    // console.log(transaction);
    res.status(201).json(transaction[0]);
  } catch (error) {
    console.error("Error creating transactions", error);
    res.status(505).json({ success: false, message: "Server error" });
  }
});

transactionRoute.get("/transactions/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const transactionsId = await sql`
    SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC
    `;

    res.status(200).json(transactionsId);
  } catch (error) {
    console.error("Error getting a single transaction", error);
    res.status(505).json({ success: false, message: "Server error" });
  }
});

transactionRoute.delete("/transactions/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(parseInt(id))) {
      res.status(404).json({ message: "Invalid transaction ID" });
    }

    const result = await sql`
    DELETE FROM transactions WHERE id = ${id} RETURNING *
    `;
    if (result.length === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Error delete the  transaction id", error);
    res.status(505).json({ success: false, message: "Server error" });
  }
});

transactionRoute.get("/transactions/summary/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const balanceResult = await sql`
    SELECT COALESCE(SUM(amount), 0) as balance FROM transactions WHERE user_id = ${userId}
    `;

    const incomeResult = await sql`
    SELECT COALESCE(SUM(amount), 0) as income FROM transactions WHERE user_id = ${userId} AND amount > 0
    `;

    const expensesResult = await sql`
    SELECT COALESCE(SUM(amount), 0) as expenses FROM transactions WHERE user_id = ${userId} AND amount < 0
    `;

    res.status(200).json({
      balance: balanceResult[0].balance,
      income: incomeResult[0].income,
      expenses: expensesResult[0].expenses,
    });
  } catch (error) {
    console.error("Error getting summary", error);
    res.status(505).json({ success: false, message: "Server error" });
  }
});

export default transactionRoute;

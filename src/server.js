import express from "express";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import { initDb } from "./config/db.js";
import transactionRoute from "./routes/transactionRoute.js";

//config
dotenv.config();
const PORT = process.env.PORT;

const app = express();

// middleware
app.use(rateLimiter);
app.use(express.json());

//routes
app.use("/api", transactionRoute);

initDb().then(() => {
  app.listen(PORT, () => {
    console.log("Server is up and running on port -", PORT);
  });
});

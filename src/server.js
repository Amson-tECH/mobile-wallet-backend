import express from "express";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import { initDb } from "./config/db.js";
import transactionRoute from "./routes/transactionRoute.js";
import job from "./config/cron.js";

//config
dotenv.config();
const PORT = process.env.PORT;

const app = express();

if (process.env.NODE_ENV === "production") job.start();

// middleware
app.use(rateLimiter);
app.use(express.json());

//routes
app.get("/api/health", (req, res)=> {
  res.status(200).json({message: "status is ok"})
})
app.use("/api", transactionRoute);

initDb().then(() => {
  app.listen(PORT, () => {
    console.log("Server is up and running on port -", PORT);
  });
});

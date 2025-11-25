import express from "express";
import dotenv from "dotenv";
import { sql } from "./config/db.js";
import transactionRoute from "./routes/transactionRoute.js";

//config
dotenv.config();
const PORT = process.env.PORT;

const app = express();


// middleware  
app.use(express.json());


async function initDb() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions(
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        created_at DATE NOT NULL DEFAULT CURRENT_DATE        
        )`;
    console.log("DB initailised successfully");
  } catch (error) {
    console.log("Error initailizing DB", error);
    process.exit(1); // status code 1 means failure, 0 means success
  }
}


//routes
app.use("/api", transactionRoute);





initDb().then(() => {
  app.listen(PORT, () => {
    console.log("Server is up and running...", PORT);
  });
});

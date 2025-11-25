import express from "express";
import dotenv from "dotenv";

//config
dotenv.config();
const PORT = process.env.PORT;

const app = express();


//routes
app.get("/home", (req, res) => {
  res.json({ message: "Welcome to the home screen" });
});



app.listen(PORT, () => {
  console.log("Server is up and running...",PORT);
});

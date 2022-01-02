import express from "express";
import products from "./data/products.js";
import connectDB from "./config/db.js";
import { config } from "dotenv";
import colors from "colors";
import productRoutes from "./routes/productRoutes.js";

const app = express();
config();

connectDB();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/products", productRoutes);

const PORT = process.env.PORT;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

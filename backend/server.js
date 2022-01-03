import express from "express";
import connectDB from "./config/db.js";
import { config } from "dotenv";
import colors from "colors";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();
config();

connectDB();

app.get("/", (req, res) => {
  res.send("API is running");
});

// base route from productRoutes
app.use("/api/products", productRoutes);

// 404 and error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
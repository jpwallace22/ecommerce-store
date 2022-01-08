import express from "express";
import connectDB from "./config/db.js";
import { config } from "dotenv";
import colors from "colors";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

config(); //for dotenv to access ENV file

connectDB(); // connect mongoose to MongoDB database

app.use(express.json()); // to use json format in the body

app.get("/", (req, res) => {
  res.send("API is running"); // visually see that server is running
});

// base route from productRoutes
app.use("/api/products", productRoutes);
//base route from userRoutes
app.use("/api/users", userRoutes);
//base route from orderRoutes
app.use("/api/orders", orderRoutes);

// 404 and error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

//visual aid in log for server running
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

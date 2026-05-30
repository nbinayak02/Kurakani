dotenv.config();
import dotenv from "dotenv";
import app from "./app/app.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 5000;
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING || "";

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

mongoose
  .connect(MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

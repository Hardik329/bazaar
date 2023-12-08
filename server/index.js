import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import cartRoute from "./routes/cart.js";

import { createClient } from "redis";

const app = express();
// export const redisClient = createClient();
export const redisClient = createClient({
  password: "eYJjFsj54fb6XTEmPAx6PnQdcjlbEV9j",
  socket: {
    host: "redis-18198.c322.us-east-1-2.ec2.cloud.redislabs.com",
    port: 18198,
  },
});

const port = process.env.PORT || 5000;

// if (process.env.NODE_ENV === "production") {
//   console.log = () => {};
// }

dotenv.config();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  console.log("Server pinged successfully");
  res.status(200).send("Server running...");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
      console.log(`Server is runnning at port ${port}`);
    });
  })
  .then(() => {
    redisClient.connect();
  })
  .catch((err) => console.log(err));

redisClient.on("ready", () => {
  console.log("Connected to Redis server!");
});
redisClient.on("error", (err) => {
  console.log("Error connecting to Redis server: ", err);
});

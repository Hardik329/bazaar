import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import cartRoute from "./routes/cart.js";

const app = express();

const port = process.env.PORT || 5000;

// if (process.env.NODE_ENV === "production") {
//   console.log = () => {};
// }

dotenv.config();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

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
  .catch((err) => console.log(err));

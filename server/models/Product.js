// const mongoose = require("mongoose");
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    image_id: { type: String, required: true },
    categories: { type: Array },
    size: { type: Array },
    color: { type: Array },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);

import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        id: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        color: { type: String },
        size: { type: String },
      },
    ],
    quantity: {
      type: Number,
    },
    total: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Cart", CartSchema);

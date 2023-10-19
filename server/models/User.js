import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    lastname: { type: String },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    image_id: { type: String },
    wishlist: { type: Array, default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);

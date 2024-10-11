import mongoose from "mongoose";

const ResetPasswordSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  email: { type: String, required: true },
});

export default mongoose.model("ResetPassword", ResetPasswordSchema);

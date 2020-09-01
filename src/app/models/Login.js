import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UsuarioSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    senha: {
      type: String,
      required: true,
    },
    senha: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Product é o Model
export default mongoose.model("Usuario", UsuarioSchema);

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");

const UsuarioSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    email: {
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

UsuarioSchema.pre("save", async function (next) {
  if (!this.isModified("senha")) {
    return next();
  }
  this.senha = await bcrypt.hash(this.senha, 8);
});

UsuarioSchema.methods = {
  compareSenhaHash(senha) {
    return bcrypt.compare(senha, this.senha);
  },
};

UsuarioSchema.statics = {
  gerarToken({ id }) {
    return jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.ttl,
    });
  },
};

//Product é o Model
export default mongoose.model("Usuario", UsuarioSchema);

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UsuarioSchema = new mongoose.Schema({
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
}, {
  timestamps: true,
});

UsuarioSchema.pre("save", async function (next) {
  if (!this.isModified("nome", "email", "senha")) {
    return next();
  }
  this.nome = await bcrypt.hash(this.nome, 8);
  this.email = await bcrypt.hash(this.email, 8);
  this.senha = await bcrypt.hash(this.senha, 8);
});

UsuarioSchema.methods = {
  compareHash(email) {
    return bcrypt.compare(email, this.email_hash)
  }
}

//Product é o Model
export default mongoose.model("Usuario", UsuarioSchema);
import Usuario from "../models/Usuarios";
import * as Yup from "yup";
import bcrypt from "bcryptjs";

class UsuarioController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string().email().required(),
      senha: Yup.string().required(),
      confirmarSenha: Yup.string().when("senha", (senha, field) =>
        senha ? field.required().oneOf([Yup.ref("senha")]) : field
      ),
    });

    const camposValidos = await schema.isValid(req.body);

    if (!camposValidos) {
      return res.status(400).json({
        error: "Preencha os campos corretamente!",
      });
    }

    const { email } = req.body;

    const usuarioExistente = await Usuario.findOne({
      email,
    });

    if (usuarioExistente) {
      return res.status(400).json({
        error: "Email ja cadastrado",
      });
    }

    try {
      const usuario = await Usuario.create(req.body);

      return res.json(usuario);
    } catch (err) {
      return res.status(500).json({
        error: "erro: ",
        err,
      });
    }
  }

  async show(req, res) {
    const { email } = req.body;

    const emailHash = await bcrypt.hash(email, 8);

    console.log(emailHash);

    debugger;

    const usuario = await Usuario.findOne({
      emailHash,
    });

    return res.json(usuario);

    // const usuario = await Usuario.findOne({
    //   email
    // })
  }
}

export default new UsuarioController();

import Usuario from "../models/Usuarios";
import * as Yup from "yup";

class LoginController {
  async index(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      senha: Yup.string().required(),
    });

    const validacaoSchema = await schema.isValid(req.body);

    if (!validacaoSchema) {
      return res.status(400).json({ erro: "Validção Falhou!" });
    }

    let { email, senha } = req.body;

    const usuarioExistente = await Usuario.findOne({ email });

    if (!usuarioExistente) {
      return res.statu(400).json({ error: "Email não cadastrado" });
    }

    const senhaHash = await usuarioExistente.compareSenhaHash(senha);

    if (!senhaHash) {
      return res.status(400).json({ error: "Senha inválida" });
    }

    return res.json({
      usuarioExistente,
      token: usuarioExistente.gerarToken(usuarioExistente),
    });
  }
}

export default new LoginController();

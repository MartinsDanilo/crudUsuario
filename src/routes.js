import {
  Router
} from "express";

import ControllerUsuario from "./app/controllers/UsuarioController";

const routes = new Router();

routes.post("/usuario", ControllerUsuario.store);
routes.get("/usuarios", ControllerUsuario.show);

export default routes;
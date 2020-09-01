import { Router } from "express";
import LoginController from "./app/controllers/LoginController";

import ControllerUsuario from "./app/controllers/UsuarioController";

const routes = new Router();

routes.post("/usuario", ControllerUsuario.store);
routes.get("/usuarios", ControllerUsuario.show);

routes.post("/login", LoginController.index);

export default routes;

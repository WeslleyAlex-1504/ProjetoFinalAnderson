import { Router } from "express";
import { validateDataMiddleware } from "../middleware/verificarData.middleware";
import { validateTokem } from "../middleware/verificarToken.middleware";
import { createUserSchema, updateUserSchema } from "../schemas/usuario.schema";
import { atualizarUsuarioController, createUserController, deletarUsuarioController, getAllUsuarioControll, retrieveUserController } from "../controller/usuario.controller";


export const usuarioRoutes:Router = Router()

usuarioRoutes.post("",validateDataMiddleware(createUserSchema), createUserController)
usuarioRoutes.delete("/:id", deletarUsuarioController)
usuarioRoutes.get("", getAllUsuarioControll)
usuarioRoutes.patch("/:id",validateDataMiddleware(updateUserSchema), atualizarUsuarioController)
usuarioRoutes.get("/retrieve", validateTokem, retrieveUserController)
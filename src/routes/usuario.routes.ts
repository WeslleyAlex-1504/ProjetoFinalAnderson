import { Router } from "express";
import { validateDataMiddleware } from "../middleware/verificarData.middleware";
import { validateTokem } from "../middleware/verificarToken.middleware";
import { createUserSchema } from "../schemas/usuario.schema";
import { createUserController } from "../controller/usuario.controller";


export const usuarioRoutes:Router = Router()

usuarioRoutes.post("",validateDataMiddleware(createUserSchema), createUserController)

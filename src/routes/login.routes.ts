import { Router } from "express";
import { validateDataMiddleware } from "../middleware/verificarData.middleware";

import { loginController } from "../controller/login.controller";
import { loginSchemas } from "../schemas/login.schema";

export const loginRoutes:Router = Router()

loginRoutes.post("", validateDataMiddleware(loginSchemas), loginController)
import { createFuncionarioSchema, iUpdateFuncionario, updateFuncionarioSchema } from '../schemas/funcionario.schema';
import { Router } from "express";
import { validateDataMiddleware } from "../middleware/verificarData.middleware";
import { atualizarFuncionarioController, createFuncionarioController, deletarFuncionarioController, getAllFuncionarioController } from '../controller/funcionario.controller';

export const funcionarioRoutes:Router = Router()

funcionarioRoutes.post("", validateDataMiddleware(createFuncionarioSchema), createFuncionarioController)
funcionarioRoutes.get("", getAllFuncionarioController)
funcionarioRoutes.patch("/:id", validateDataMiddleware(updateFuncionarioSchema), atualizarFuncionarioController)
funcionarioRoutes.delete("/:id", deletarFuncionarioController)
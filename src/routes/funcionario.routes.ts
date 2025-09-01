import { createFuncionarioSchema, iUpdateFuncionario, updateFuncionarioSchema } from '../schemas/funcionario.schema';
import { Router } from "express";
import { validateDataMiddleware } from "../middleware/verificarData.middleware";
import multer from "multer";
import { atualizarFuncionarioController, createFuncionarioController, deletarFuncionarioController, getAllFuncionarioController } from '../controller/funcionario.controller';

export const funcionarioRoutes:Router = Router()
const upload = multer({ dest: "uploads/" });

funcionarioRoutes.post("",upload.single("imagem"), validateDataMiddleware(createFuncionarioSchema), createFuncionarioController)
funcionarioRoutes.get("", getAllFuncionarioController)
funcionarioRoutes.patch("/:id", upload.single("imagem"),validateDataMiddleware(updateFuncionarioSchema), atualizarFuncionarioController)
funcionarioRoutes.delete("/:id", deletarFuncionarioController)
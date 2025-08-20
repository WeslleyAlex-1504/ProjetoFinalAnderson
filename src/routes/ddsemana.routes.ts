import { Router } from "express";
import { validateDataMiddleware } from "../middleware/verificarData.middleware";
import { createDDSemanaSchema } from "../schemas/ddsemana.schema";
import { createDDSemanaController, deletarDDSemanaController, getAllDDSemanaController } from "../controller/ddsemana.controller";

export const DDSemanaRoutes:Router = Router()

DDSemanaRoutes.post("",validateDataMiddleware(createDDSemanaSchema),createDDSemanaController)
DDSemanaRoutes.get("", getAllDDSemanaController)
DDSemanaRoutes.delete("/:id", deletarDDSemanaController)
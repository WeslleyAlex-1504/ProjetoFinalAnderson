import { Router } from "express";
import { validateDataMiddleware } from "../middleware/verificarData.middleware";
import { createDDSemanaSchema } from "../schemas/ddsemana.schema";
import { createDDSemanaController } from "../controller/ddsemana.controller";

export const DDSemanaRoutes:Router = Router()

DDSemanaRoutes.post("",validateDataMiddleware(createDDSemanaSchema),createDDSemanaController)
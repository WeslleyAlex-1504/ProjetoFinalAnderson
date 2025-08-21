import { Router } from "express";
import { validateDataMiddleware } from "../middleware/verificarData.middleware";
import { createAgendaSchema } from "../schemas/agenda.schema";
import { createAgendaController, deletarAgendaController, getAllAgendaController } from "../controller/agenda.controller";

export const agendaRoutes:Router = Router()

agendaRoutes.post("",validateDataMiddleware(createAgendaSchema),createAgendaController)
agendaRoutes.get("",getAllAgendaController)
agendaRoutes.delete("/:id", deletarAgendaController)
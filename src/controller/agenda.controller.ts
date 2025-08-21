import { query, Request, Response } from "express";
import { returnAgenda } from "../schemas/agenda.schema";
import { createAgendaService } from "../services/agenda/createAgenda.service";

export const createAgendaController = async (req: Request, res: Response): Promise<Response> => {
    const body = req.body
    const user: returnAgenda = await createAgendaService(body)
    return res.status(201).json(user)
}


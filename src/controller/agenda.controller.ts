import { DdSemana } from './../entities/ddsemana.entities';
import { query, Request, Response } from "express";
import { returnAgenda } from "../schemas/agenda.schema";
import { createAgendaService } from "../services/agenda/createAgenda.service";
import { pegarTodosAgendaServices } from '../services/agenda/pegarTodosAgendamentos.service';
import { deletarAgendaService } from '../services/agenda/deletarAgendamento.service';

function parseBool(value: any): boolean | undefined {
  if (typeof value !== "string") return undefined
  if (value.toLowerCase() === "true") return true
  if (value.toLowerCase() === "false") return false
  return undefined
}

export const createAgendaController = async (req: Request, res: Response): Promise<Response> => {
    const body = req.body
    const user: returnAgenda = await createAgendaService(body)
    return res.status(201).json(user)
}

export const getAllAgendaController = async (req: Request, res: Response): Promise<Response> => {
    const hora = req.query.hora as string;
    const diaMes = req.query.diaMes as string;
    const ativo = parseBool(req.query.ativo)
    const mes = req.query.mes as string;
    const ano = req.query.ano as string;
    const usuario = req.query.usuario as string;
    const funcionario = req.query.funcionario as string;
    const ddsemana = req.query.ddsemana as string;
    const limite = Number(req.query.limite);
    const offset = Number(req.query.offset);

    const agenda = await pegarTodosAgendaServices(hora,ativo,diaMes,mes,ano,ddsemana,usuario,funcionario,limite,offset)
    return res.status(200).json(agenda)
}

export const deletarAgendaController = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id
    await deletarAgendaService(parseInt(id))
    return res.status(200).send("Agendamento deletado")
}

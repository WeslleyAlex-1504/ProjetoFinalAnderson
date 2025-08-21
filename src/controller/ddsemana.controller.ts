import { query, Request, Response } from "express";
import { returnDDSemana } from "../schemas/ddsemana.schema";
import { createDDSemanaService } from "../services/ddsemana/createDDSemana.service";
import { pegarTodosDDSemanaServices } from "../services/ddsemana/getAllDDSemana.service";
import { deletarDDsemanaService } from "../services/ddsemana/deletarDDSemana.service";
import { atualizarDDSemanaService } from "../services/ddsemana/atualizarDDSemana.service";


export const createDDSemanaController = async (req:Request,res:Response):Promise<Response> => {
    const body = req.body
    const ddsemana:returnDDSemana = await createDDSemanaService(body)
    return  res.status(201).json(ddsemana)
}

export const getAllDDSemanaController = async (req:Request,res:Response):Promise<Response> => {
    const ddsemana = await pegarTodosDDSemanaServices()
    return res.status(200).json(ddsemana)
}

export const deletarDDSemanaController = async (req:Request,res:Response):Promise<Response> => {
    const id  = req.params.id
    await deletarDDsemanaService(parseInt(id))
    return res.status(200).send("Dia da semana deletado")
}

export const atualizarDDSemanaController = async (req:Request,res:Response):Promise<Response> => {
    const body = req.body
    const id = req.params.id
    const ddsemana = await atualizarDDSemanaService(parseInt(id),body)
    return res.status(200).json(ddsemana)
}
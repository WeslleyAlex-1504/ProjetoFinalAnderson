import { query, Request, Response } from "express";
import { returnDDSemana } from "../schemas/ddsemana.schema";
import { createDDSemanaService } from "../services/ddsemana/createDDSemana.service";


export const createDDSemanaController = async (req:Request,res:Response):Promise<Response> => {
    const body = req.body
    const user:returnDDSemana = await createDDSemanaService(body)
    return  res.status(201).json(user)
}
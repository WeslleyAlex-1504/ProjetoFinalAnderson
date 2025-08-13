import { Request, Response } from "express";
import { returnUser } from "../schemas/usuario.schema";
import { createUserService } from "../services/usuario/createUsuario.service";
import { Usuario } from "../entities/usuario.entities";

export const createUserController = async (req:Request,res:Response):Promise<Response> => {
    const userData = req.body
    const user:returnUser = await createUserService(userData)
    return  res.status(201).json(user)
}

export const retrieveUserController = async (req:Request,res:Response):Promise<Response> => {
    return res.status(200).json(req.usuario)
}
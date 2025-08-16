import { Request, Response } from "express";
import { returnUser } from "../schemas/usuario.schema";
import { createUserService } from "../services/usuario/createUsuario.service";
import { Usuario } from "../entities/usuario.entities";
import { deletarUsuarioService } from "../services/usuario/deltarUsuario.service";
import { pegarTodosClientesServices } from "../services/usuario/pegarTodosClientes.services";

export const createUserController = async (req:Request,res:Response):Promise<Response> => {
    const userData = req.body
    const user:returnUser = await createUserService(userData)
    return  res.status(201).json(user)
}

export const deletarUsuarioController = async (req:Request,res:Response):Promise<Response> => {
    const id  = req.params.id
    await deletarUsuarioService(parseInt(id))
    return res.status(200).send("Despesa deletada")
}

export const getAllUsuarioControll = async (req:Request,res:Response):Promise<Response> => {
    const nome = req.query.nome as string
    const tele = req.query.tele as string
    const usuarios = await pegarTodosClientesServices(nome,tele)
    return res.status(200).json(usuarios)
}

export const retrieveUserController = async (req:Request,res:Response):Promise<Response> => {
    return res.status(200).json(req.usuario)
}
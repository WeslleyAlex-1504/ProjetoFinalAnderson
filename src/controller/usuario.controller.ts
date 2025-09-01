import { query, Request, Response } from "express";
import { returnUser } from "../schemas/usuario.schema";
import { createUserService } from "../services/usuario/createUsuario.service";
import { Usuario } from "../entities/usuario.entities";
import { deletarUsuarioService } from "../services/usuario/deltarUsuario.service";
import { pegarTodosClientesServices } from "../services/usuario/pegarTodosClientes.services";
import { atualizarClienteService } from "../services/usuario/atualizarUsuario.service";
import fs from "fs";

function parseBool(value: any): boolean | undefined {
  if (typeof value !== "string") return undefined
  if (value.toLowerCase() === "true") return true
  if (value.toLowerCase() === "false") return false
  return undefined
}

export const createUserController = async (req:Request,res:Response):Promise<Response> => {
    const userData = req.body
    if (req.file) {
    userData.imagem = fs.readFileSync(req.file.path).toString("base64");
    fs.unlinkSync(req.file.path);
  }
    const user:returnUser = await createUserService(userData)
    return  res.status(201).json(user)
}

export const deletarUsuarioController = async (req:Request,res:Response):Promise<Response> => {
    const id  = req.params.id
    await deletarUsuarioService(parseInt(id))
    return res.status(200).send("Usuario deletado")
}

export const getAllUsuarioControll = async (req:Request,res:Response):Promise<Response> => {
    const nome = req.query.nome as string
    const tele = req.query.tele as string
    const email = req.query.email as string
    const ativo = parseBool(req.query.ativo)
    const limite = Number(req.query.limite)
    const offset = Number(req.query.offset)
    const usuarios = await pegarTodosClientesServices(nome,email,tele,ativo,limite,offset)
    return res.status(200).json(usuarios)
}

export const atualizarUsuarioController = async (req:Request,res:Response):Promise<Response> => {
    const body = req.body
    const id = req.params.id
    if (req.file) {
        body.imagem = fs.readFileSync(req.file.path).toString("base64")
        fs.unlinkSync(req.file.path)
    }
    const usuarios = await atualizarClienteService(body,parseInt(id))
    return res.status(200).json(usuarios)
}

export const retrieveUserController = async (req:Request,res:Response):Promise<Response> => {
    return res.status(200).json(req.usuario)
}



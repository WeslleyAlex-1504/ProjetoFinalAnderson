import { atualizarFuncionarioService } from '../services/funcionario/atualizarFuncionario.services';
import { createFuncionarioService } from '../services/funcionario/criarFuncionario.services';
import { deletarFuncionarioService } from '../services/funcionario/deletarFuncionario.services';
import { pegarTodosFuncionariosServices } from '../services/funcionario/pegarTodosFuncionarios.services';
import { createFuncionarioSchema, returnFuncionario } from '../schemas/funcionario.schema';
import { query, Request, Response } from "express";


export const createFuncionarioController = async (req:Request,res:Response):Promise<Response> => {
    const body = req.body
    const user:returnFuncionario = await createFuncionarioService(body)
    return  res.status(201).json(user)
}

export const deletarFuncionarioController = async (req:Request,res:Response):Promise<Response> => {
    const id  = req.params.id
    await deletarFuncionarioService(parseInt(id))
    return res.status(200).send("Funcionario deletado")
}

export const getAllFuncionarioController = async (req:Request,res:Response):Promise<Response> => {
    const nome = req.query.nome as string
    const limite = Number(req.query.limite) 
    const offset = Number(req.query.offset) 
    const usuarios = await pegarTodosFuncionariosServices(nome,limite,offset)
    return res.status(200).json(usuarios)
}

export const atualizarFuncionarioController = async (req:Request,res:Response):Promise<Response> => {
    const body = req.body
    const id = req.params.id
    const usuarios = await atualizarFuncionarioService(parseInt(id),body)
    return res.status(200).json(usuarios)
}
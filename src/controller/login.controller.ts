import { Request, Response } from "express";
import { loginServices } from "../services/login/login.service";


export const loginController = async (req:Request, res:Response):Promise<Response> => {
    const userData = req.body
    const user = await loginServices(userData)
    return res.status(200).json(user)
}
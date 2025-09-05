import { Request, Response } from "express";
import { loginServices } from "../services/login/login.service";
import { verificarCodigoService } from "../services/login/verificarCodigo.service";


export const loginController = async (req:Request, res:Response):Promise<Response> => {
    const userData = req.body
    const login = await loginServices(userData)
    return res.status(200).json(login)
}

export const verificarCodigoController = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  const token = await verificarCodigoService(email, otp);

  return res.status(200).json({ token });
};
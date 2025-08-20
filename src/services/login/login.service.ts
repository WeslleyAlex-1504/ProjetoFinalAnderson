import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";

import { AppError } from "../../error";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { Usuario } from "../../entities/usuario.entities";
import { loginReturnSchemas, loginUser } from "../../schemas/login.schema";

export const loginServices = async(user:loginUser):Promise<any> => {
    const userRepository: Repository<Usuario> = AppDataSource.getRepository(Usuario)

    const findUser: Usuario | null = await userRepository.findOne({
        where:{
            email: user.email,
        }
    })

    if(!findUser){
        throw new AppError("usuario não encontrado")
    }

        const validador = bcrypt.compare(user.password, findUser.password)

    if(!validador){
        throw new AppError("senha ou e-mail incorreto",409)
    }
    const token = jwt.sign({
        id:findUser.id,nome:findUser.nome,admin:findUser.admin,ativo:findUser.ativo
    },
    process.env.secret_key!,
{
    expiresIn:"24h",
    subject:String(findUser.id)
})

    const user2 = loginReturnSchemas.parse({user:findUser,token})
    return user2
}
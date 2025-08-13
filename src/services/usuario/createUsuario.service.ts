import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"

import { AppError } from "../../error"
import bcrypt from "bcryptjs";
import { Usuario } from "../../entities/usuario.entities";
import { CreateUser, returnUser, returnUserSchema } from "../../schemas/usuario.schema";


export const createUserService=async(userData:CreateUser):Promise<returnUser>=>{
    const userRepository: Repository<Usuario> = AppDataSource.getRepository(Usuario)
    
    const findUser: Usuario | null = await userRepository.findOne({
        where:{
            nome:userData.nome
        },
        
    })
    if(findUser){
        throw new AppError("usuario já existe",409)
    }
    const salt =  bcrypt.genSaltSync(10);
    const hash =  bcrypt.hashSync(userData.password, salt);
    userData.password = hash
    const createUser = userRepository.create(userData)
    await userRepository.save(createUser)
    const user = returnUserSchema.parse(createUser)
    return user

}
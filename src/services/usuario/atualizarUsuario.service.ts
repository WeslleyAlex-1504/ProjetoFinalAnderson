import { iUpdateUser, returnUser, returnUserSchema, updateUserSchema } from './../../schemas/usuario.schema';
import { Repository } from "typeorm"
import { AppError } from "../../error"
import { Usuario } from "../../entities/usuario.entities"
import { AppDataSource } from "../../data-source"

export const atualizarClienteService=async(userData:iUpdateUser, id: number):Promise<returnUser>=>{
    const userRepository: Repository<Usuario> = AppDataSource.getRepository(Usuario)
    
    const findUser: Usuario | null = await userRepository.findOne({
        where:{
            id:id
        }     
    })

    if(!findUser){
        throw new AppError("Cliente não encontrado",400);
    }

    const attCliente = userRepository.create({...findUser,...userData})
    if (attCliente.nome) {
    attCliente.nome = attCliente.nome.toLowerCase()
    }
    await userRepository.save(attCliente)
    return attCliente

}
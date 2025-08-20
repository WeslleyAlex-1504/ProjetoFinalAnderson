import { CreateFuncionario, createFuncionarioSchema, iUpdateFuncionario, returnFuncionario, returnFuncionarioSchema } from '../../schemas/funcionario.schema';
import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Funcionario } from "../../entities/funcionario.entities"
import { AppError } from "../../error"

export const atualizarFuncionarioService=async(id:number,funcionarioData:iUpdateFuncionario):Promise<returnFuncionario>=>{
    const funcionarioRepository: Repository<Funcionario> = AppDataSource.getRepository(Funcionario)
    
    const findFuncionario: Funcionario | null = await funcionarioRepository.findOne({
        where:{
            id:id
        },
        
    })

    if(!findFuncionario){
        throw new AppError("Funcionario não encontrado",409)
    }

    const attFuncionario = funcionarioRepository.create({...findFuncionario,...funcionarioData})
    if (attFuncionario.nome) {
    attFuncionario.nome = attFuncionario.nome.toLowerCase()
    }
    await funcionarioRepository.save(attFuncionario)
    return attFuncionario

}
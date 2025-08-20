import { CreateFuncionario, createFuncionarioSchema, returnFuncionario, returnFuncionarioSchema } from '../../schemas/funcionario.schema';
import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Funcionario } from "../../entities/funcionario.entities"
import { AppError } from "../../error"

export const createFuncionarioService=async(userData:CreateFuncionario):Promise<returnFuncionario>=>{
    const funcionarioRepository: Repository<Funcionario> = AppDataSource.getRepository(Funcionario)
    
    const findFuncionario: Funcionario | null = await funcionarioRepository.findOne({
        where:{
            nome:userData.nome.toLowerCase()
        },
        
    })

    if(findFuncionario){
        throw new AppError("Funcionario já existe",409)
    }

    userData.nome = userData.nome.toLowerCase()
    const createFuncionario = funcionarioRepository.create(userData)
    await funcionarioRepository.save(createFuncionario)
    const user = returnFuncionarioSchema.parse(createFuncionario)
    return user

}
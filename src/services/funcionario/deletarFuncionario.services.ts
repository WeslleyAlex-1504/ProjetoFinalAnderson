import { CreateFuncionario, createFuncionarioSchema, returnFuncionario, returnFuncionarioSchema } from '../../schemas/funcionario.schema';
import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Funcionario } from "../../entities/funcionario.entities"
import { AppError } from "../../error"

export const deletarFuncionarioService=async(id:number)=>{
    const funcionarioRepository: Repository<Funcionario> = AppDataSource.getRepository(Funcionario)
    
    const findFuncionario: Funcionario | null = await funcionarioRepository.findOne({
        where:{
            id:id
        },
        
    })

    if(!findFuncionario){
        throw new AppError("Funcionario não encontrado",409)
    }

    await funcionarioRepository.remove(findFuncionario)

}
import { Repository } from "typeorm"
import { CreateDDSemana, returnDDSemana, returnDDSemanaSchema } from "../../schemas/ddsemana.schema"
import { AppDataSource } from "../../data-source"
import { AppError } from "../../error"
import { DdSemana } from "../../entities/ddsemana.entities"

export const createDDSemanaService=async(userData:CreateDDSemana):Promise<returnDDSemana>=>{
    const DdSemanaRepository: Repository<DdSemana> = AppDataSource.getRepository(DdSemana)
    
    const findFuncionario: DdSemana | null = await DdSemanaRepository.findOne({
        where:{
            nome:userData.nome.toLowerCase()
        },
        
    })

    if(findFuncionario){
        throw new AppError("Dia da semana já existe",409)
    }

    userData.nome = userData.nome.toLowerCase()
    const createFuncionario = DdSemanaRepository.create(userData)
    await DdSemanaRepository.save(createFuncionario)
    const DdSemana2 = returnDDSemanaSchema.parse(createFuncionario)
    return DdSemana2

}
import { Repository } from "typeorm"
import { CreateDDSemana, returnDDSemana, returnDDSemanaSchema } from "../../schemas/ddsemana.schema"
import { AppDataSource } from "../../data-source"
import { AppError } from "../../error"
import { DdSemana } from "../../entities/ddsemana.entities"

export const deletarDDsemanaService=async(id:number)=>{
    const DdSemanaRepository: Repository<DdSemana> = AppDataSource.getRepository(DdSemana)
    
    const findDDSemana: DdSemana | null = await DdSemanaRepository.findOne({
        where:{
            id:id
        },
        
    })

    if(!findDDSemana){
        throw new AppError("Dia da semana não encontrado",409)
    }

    await DdSemanaRepository.remove(findDDSemana)

}
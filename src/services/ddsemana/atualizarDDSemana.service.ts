import { Repository } from "typeorm"
import { CreateDDSemana, iUpdateDDSemana, returnDDSemana, returnDDSemanaSchema } from "../../schemas/ddsemana.schema"
import { AppDataSource } from "../../data-source"
import { AppError } from "../../error"
import { DdSemana } from "../../entities/ddsemana.entities"

export const atualizarDDSemanaService=async(id:number, DDSemanaData:iUpdateDDSemana)=>{
    const DdSemanaRepository: Repository<DdSemana> = AppDataSource.getRepository(DdSemana)
    
    const findDDSemana: DdSemana | null = await DdSemanaRepository.findOne({
        where:{
            id:id
        },
        
    })

    if(!findDDSemana){
        throw new AppError("Dia da semana não encontrado",409)
    }

    const attDDSemana = DdSemanaRepository.create({...findDDSemana,...DDSemanaData})
    if (attDDSemana.nome) {
    attDDSemana.nome = attDDSemana.nome.toLowerCase()
    }
    await DdSemanaRepository.save(attDDSemana)
    return attDDSemana

}
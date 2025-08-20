import { Repository } from "typeorm"
import { CreateDDSemana, returnDDSemana, returnDDSemanaArraySchema, returnDDSemanaSchema } from "../../schemas/ddsemana.schema"
import { AppDataSource } from "../../data-source"
import { AppError } from "../../error"
import { DdSemana } from "../../entities/ddsemana.entities"

export const pegarTodosDDSemanaServices=async()=>{
    const DdSemanaRepository: Repository<DdSemana> = AppDataSource.getRepository(DdSemana)
    
    const DDSemana = await DdSemanaRepository.find();
      
    const DDSemanaFinal = returnDDSemanaArraySchema.parse(DDSemana);
    return DDSemanaFinal;

}
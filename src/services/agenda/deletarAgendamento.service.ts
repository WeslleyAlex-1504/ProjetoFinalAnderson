import { Repository } from "typeorm"
import { CreateDDSemana, returnDDSemana, returnDDSemanaSchema } from "../../schemas/ddsemana.schema"
import { AppDataSource } from "../../data-source"
import { AppError } from "../../error"
import { DdSemana } from "../../entities/ddsemana.entities"
import { CreateAgenda, returnAgenda, returnAgendaSchema } from "../../schemas/agenda.schema"
import { Agenda } from "../../entities/agenda.entities"
import { Funcionario } from "../../entities/funcionario.entities"
import { Usuario } from "../../entities/usuario.entities"

export const deletarAgendaService=async(id:number)=>{
    const AgendaRepository: Repository<Agenda> = AppDataSource.getRepository(Agenda)

        const findAgenda: Agenda | null = await AgendaRepository.findOne({
        where:{
            id:id
        },
        
    })

    if(!findAgenda){
        throw new AppError("Agendamento não encontrado",409)
    }

    await AgendaRepository.remove(findAgenda)

}
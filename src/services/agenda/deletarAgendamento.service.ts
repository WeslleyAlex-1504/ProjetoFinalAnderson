import { Repository } from "typeorm"
import { CreateDDSemana, returnDDSemana, returnDDSemanaSchema } from "../../schemas/ddsemana.schema"
import { AppDataSource } from "../../data-source"
import { AppError } from "../../error"
import { DdSemana } from "../../entities/ddsemana.entities"
import { CreateAgenda, returnAgenda, returnAgendaSchema } from "../../schemas/agenda.schema"
import { Agenda } from "../../entities/agenda.entities"
import { Funcionario } from "../../entities/funcionario.entities"
import { Usuario } from "../../entities/usuario.entities"
import { enviarEmail } from "../../middleware/enviarEmail.middleware"

export const deletarAgendaService=async(id:number,isAdmin:boolean)=>{
    const AgendaRepository: Repository<Agenda> = AppDataSource.getRepository(Agenda)

    const findAgenda: Agenda | null = await AgendaRepository.findOne({
        where: { id },
        relations: ["usuario", "ddsemana"], 
    });

    if(!findAgenda){
        throw new AppError("Agendamento não encontrado",409)
    }

    if (isAdmin && findAgenda.usuario?.email) {
    await enviarEmail(
      findAgenda.usuario.email,
      "Cancelamento de agendamento",
      `Olá ${findAgenda.usuario.nome.toLowerCase().replace(/(^\w|-\w)/g, l => l.toUpperCase())}, o seu horário de ${findAgenda.diaMes} de ${findAgenda.mes} de ${findAgenda.ano} às ${findAgenda.hora} foi cancelado pelo gerente.`
    );
    }

    await AgendaRepository.remove(findAgenda)

}
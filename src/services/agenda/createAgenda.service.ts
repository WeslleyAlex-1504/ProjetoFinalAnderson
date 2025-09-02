import { Repository } from "typeorm"
import { CreateDDSemana, returnDDSemana, returnDDSemanaSchema } from "../../schemas/ddsemana.schema"
import { AppDataSource } from "../../data-source"
import { AppError } from "../../error"
import { DdSemana } from "../../entities/ddsemana.entities"
import { CreateAgenda, returnAgenda, returnAgendaSchema } from "../../schemas/agenda.schema"
import { Agenda } from "../../entities/agenda.entities"
import { Funcionario } from "../../entities/funcionario.entities"
import { Usuario } from "../../entities/usuario.entities"

export const createAgendaService=async(userData:CreateAgenda):Promise<returnAgenda>=>{
    const AgendaRepository: Repository<Agenda> = AppDataSource.getRepository(Agenda)
    const DdSemanaRepository: Repository<DdSemana> = AppDataSource.getRepository(DdSemana)
    const funcionarioRepository: Repository<Funcionario> = AppDataSource.getRepository(Funcionario)
    const userRepository: Repository<Usuario> = AppDataSource.getRepository(Usuario)


    const findDDSemana: DdSemana | null = await DdSemanaRepository.findOne({
        where:{
            id:userData.ddsemana
        },
        
    })
    const findFuncionario: Funcionario | null = await funcionarioRepository.findOne({
        where:{
            id:userData.funcionario
        },
        
    })
    const findUser: Usuario | null = await userRepository.findOne({
        where:{
            id:userData.usuario
        }     
    })

    if(!findUser || !findDDSemana || !findFuncionario){
        throw new AppError("Não foi possivel concluir a criação do agendamento",400)
    }

    
    const findAgenda: Agenda | null = await AgendaRepository.findOne({
        where:{
            hora:userData.hora,
            diaMes:userData.diaMes,
            mes:userData.mes.toLowerCase(),
            ano:userData.ano,
            usuario: { id: userData.usuario },
            funcionario: { id: userData.funcionario },
            ddsemana: { id: userData.ddsemana }
        },
        
    })

    if(findAgenda){
        throw new AppError("Agendamento neste dia e hora já existe",409)
    }

    const userAgendaCount = await AgendaRepository.count({
    where: {
        usuario: { id: userData.usuario, ativo: false }
    }
});

if (userAgendaCount >= 3) {
    throw new AppError("Usuário já possui 3 agendamentos, Cancele seu agendamento caso queira este horario", 400);
}

    
const createAgenda = AgendaRepository.create({
    hora: userData.hora,
    diaMes: userData.diaMes,
    mes: userData.mes.toLowerCase(),
    ano: userData.ano,
    usuario: { id: userData.usuario },
    funcionario: { id: userData.funcionario },
    ddsemana: { id: userData.ddsemana },
    ativo: userData.ativo
});


    await AgendaRepository.save(createAgenda)

const agendaResponse = {
  ...createAgenda,
  usuario: userData.usuario,
  funcionario: userData.funcionario,
  ddsemana: userData.ddsemana
};

    const agenda2 = returnAgendaSchema.parse(agendaResponse)

    return agenda2

}
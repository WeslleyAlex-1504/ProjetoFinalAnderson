import { Usuario } from './../../entities/usuario.entities';
import { ILike, In, Like, Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { DdSemana } from "../../entities/ddsemana.entities"
import { Agenda } from "../../entities/agenda.entities"
import { Funcionario } from "../../entities/funcionario.entities"
import { returnAgendaArraySchema } from '../../schemas/agenda.schema';


export const pegarTodosAgendaServices=async(hora?:string,ativo?:boolean,diaMes?:string,mes?:string,ano?:string,ddsemana?:string,usuario?:string,funcionario?:string,limite?:number,offset?:number)=>{
    const AgendaRepository: Repository<Agenda> = AppDataSource.getRepository(Agenda)
    const DdSemanaRepository: Repository<DdSemana> = AppDataSource.getRepository(DdSemana)
    const funcionarioRepository: Repository<Funcionario> = AppDataSource.getRepository(Funcionario)
    const userRepository: Repository<Usuario> = AppDataSource.getRepository(Usuario)

    const where: any = {};

    if(ddsemana){
        const findDDSemana: DdSemana | null = await DdSemanaRepository.findOne({
            where:{
                nome:ddsemana
            },
            
        })
        if(findDDSemana){
            where.ddsemana = {id: findDDSemana.id}
        }
    }
    
        if (funcionario) {
            const funcionarios = await funcionarioRepository.find({
                where: { nome: ILike(`${funcionario}%`) }
            });

            if (funcionarios.length > 0) {
                where.funcionario = { id: In(funcionarios.map(f => f.id)) };
            } else {
                return [];
            }
        }



        if (usuario) {
            const users = await userRepository.find({
                where: { nome: ILike(`${usuario}%`) }
            });

            if (users.length > 0) {
                where.usuario = { id: In(users.map(u => u.id)) };
            } else {
                return [];
            }
        }


    
      if (mes) {
        where.mes = mes.toLowerCase();
      }

      if (ativo) {
        where.ativo = ativo;
      }
    
      if (hora) {
        where.hora = hora
      }
    
      if (diaMes) {
        where.diaMes = diaMes
      }

      if(ano){
        where.ano = ano
      }
    
      const options: any = { where };
    
      if (limite) {
        options.take = limite
      }
    
      if (offset) {
        options.skip = offset
      }
    
      const agenda2 = await AgendaRepository.find(options);
      
      const agendaFinal = agenda2.map(a => ({
        ...a,
        usuario: a.usuario.id,
        funcionario: a.funcionario.id,
        ddsemana: a.ddsemana.id
    }));
    
      const agendaFinal2 = returnAgendaArraySchema.parse(agendaFinal);
      return agendaFinal2;
    

    return agenda2

}
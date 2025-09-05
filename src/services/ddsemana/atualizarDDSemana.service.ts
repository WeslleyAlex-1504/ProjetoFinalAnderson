import { Repository, LessThan, MoreThan } from "typeorm";
import { iUpdateDDSemana } from "../../schemas/ddsemana.schema";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";
import { DdSemana } from "../../entities/ddsemana.entities";
import { Agenda } from "../../entities/agenda.entities";
import { enviarEmail } from "../../middleware/enviarEmail.middleware"; 
import { groupBy, uniqBy } from "lodash";


export const atualizarDDSemanaService = async (
  id: number,
  DDSemanaData: iUpdateDDSemana
) => {
  const DdSemanaRepository: Repository<DdSemana> = AppDataSource.getRepository(DdSemana);
  const AgendaRepository: Repository<Agenda> = AppDataSource.getRepository(Agenda);

  const findDDSemana = await DdSemanaRepository.findOne({ where: { id } });
  if (!findDDSemana) throw new AppError("Dia da semana não encontrado", 409);

  const attDDSemana = DdSemanaRepository.create({ ...findDDSemana, ...DDSemanaData });

  if (attDDSemana.nome) attDDSemana.nome = attDDSemana.nome.toLowerCase();

  let agendasIniciais: Agenda[] = [];
  if ("horaInicial" in DDSemanaData && DDSemanaData.horaInicial !== findDDSemana.horaInicial) {
    
    agendasIniciais = await AgendaRepository.find({
      where: { ddsemana: { id }, hora: LessThan(DDSemanaData.horaInicial as string) },
      relations: ["usuario"],
    });

    
    await AgendaRepository.delete({
      ddsemana: { id },
      hora: LessThan(DDSemanaData.horaInicial as string),
    });
  }

  let agendasFinais: Agenda[] = [];
  if ("horaFinal" in DDSemanaData && DDSemanaData.horaFinal !== findDDSemana.horaFinal) {
    agendasFinais = await AgendaRepository.find({
      where: { ddsemana: { id }, hora: MoreThan(DDSemanaData.horaFinal as string) },
      relations: ["usuario"],
    });

    await AgendaRepository.delete({
      ddsemana: { id },
      hora: MoreThan(DDSemanaData.horaFinal as string),
    });
  }


  const todasAgendas = [...agendasIniciais, ...agendasFinais].filter(a => a.usuario?.email);

  const agendasPorUsuario = groupBy(todasAgendas, a => a.usuario!.id);

  for (const [usuarioId, agendas] of Object.entries(agendasPorUsuario)) {
    const usuario = agendas[0].usuario!;
    const horariosCancelados = agendas.map(a => `${a.diaMes}/${a.mes}/${a.ano} às ${a.hora}`).join(", ");

    await enviarEmail(
      usuario.email,
      "Alteração na sua agenda",
      `Olá ${usuario.nome.toLowerCase().replace(/(^\w|-\w)/g, l => l.toUpperCase())}, os seguintes horários de ${attDDSemana.nome} foram cancelados devido a uma atualização na disponibilidade: ${horariosCancelados}.`
    );
  }


  await DdSemanaRepository.save(attDDSemana);
  return attDDSemana;
};

import { Repository, LessThan, MoreThan } from "typeorm";
import { iUpdateDDSemana } from "../../schemas/ddsemana.schema";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";
import { DdSemana } from "../../entities/ddsemana.entities";
import { Agenda } from "../../entities/agenda.entities";

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


  if ("horaInicial" in DDSemanaData && DDSemanaData.horaInicial !== findDDSemana.horaInicial) {
    await AgendaRepository.delete({
      ddsemana: { id },
      hora: LessThan(DDSemanaData.horaInicial as string),
    });
  }


  if ("horaFinal" in DDSemanaData && DDSemanaData.horaFinal !== findDDSemana.horaFinal) {
    await AgendaRepository.delete({
      ddsemana: { id },
      hora: MoreThan(DDSemanaData.horaFinal as string),
    });
  }

  await DdSemanaRepository.save(attDDSemana);
  return attDDSemana;
};

import { AppDataSource } from "../../data-source";
import { Agenda } from "../../entities/agenda.entities";

export const atualizarCortesParaConcluidos = async () => {
  try {

    const meses: Record<string, string> = {
        janeiro: "01",
        fevereiro: "02",
        março: "03",
        abril: "04",
        maio: "05",
        junho: "06",
        julho: "07",
        agosto: "08",
        setembro: "09",
        outubro: "10",
        novembro: "11",
        dezembro: "12"
    };


    const agendaRepository = AppDataSource.getRepository(Agenda);


    const agora = new Date();


    const cortesPendentes = await agendaRepository.find({
      where: { ativo: false },
      select: ["id", "ano", "mes", "diaMes", "hora"]
    });


    const cortesParaAtualizar = cortesPendentes.filter(corte => {
      const horarioCorte = new Date(`${corte.ano}-${meses[corte.mes.toLowerCase()]}-${corte.diaMes.padStart(2, '0')}T${corte.hora}`);
      return horarioCorte < agora;
    });

    if (cortesParaAtualizar.length === 0) {
      console.log("Nenhum corte pendente para atualizar.");
      return;
    }


    const idsParaAtualizar = cortesParaAtualizar.map(corte => corte.id);
    await agendaRepository.createQueryBuilder().update(Agenda).set({ ativo: true }).whereInIds(idsParaAtualizar).execute();

    console.log(`Cortes atualizados automaticamente: ${idsParaAtualizar.join(", ")}`);
  } catch (error) {
    console.error("Erro ao atualizar cortes:", error);
  }
};

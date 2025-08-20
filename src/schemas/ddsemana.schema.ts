import { DeepPartial } from "typeorm";
import z from "zod";


export const createDDSemanaSchema = z.object({
    nome: z.string().min(5,"nome é obrigatório"),
    horaInicial: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Hora inválida"),
    horaFinal: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Hora inválida")
})

export const returnDDSemanaSchema = createDDSemanaSchema.extend({
    id: z.number()
})

export const updateDDSemanaSchema = createDDSemanaSchema.partial()
export const returnDDSemanaArraySchema = z.array(returnDDSemanaSchema)

export type CreateDDSemana = z.infer<typeof createDDSemanaSchema>
export type returnDDSemana = z.infer<typeof returnDDSemanaSchema>
export type returnAllDDSemana = z.infer<typeof returnDDSemanaArraySchema>
export type iUpdateDDSemana = DeepPartial<typeof createDDSemanaSchema>

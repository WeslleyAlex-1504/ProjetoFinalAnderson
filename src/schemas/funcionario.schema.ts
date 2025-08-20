import { DeepPartial } from "typeorm";
import z from "zod";


export const createFuncionarioSchema = z.object({
    nome: z.string().min(2,"nome é obrigatório"),

})

export const returnFuncionarioSchema = createFuncionarioSchema.extend({
    id: z.number()
})


export const updateFuncionarioSchema = createFuncionarioSchema.partial()
export const returnFuncionarioArraySchema = z.array(returnFuncionarioSchema)

export type CreateFuncionario = z.infer<typeof createFuncionarioSchema>
export type returnFuncionario = z.infer<typeof returnFuncionarioSchema>
export type returnAllFuncionario = z.infer<typeof returnFuncionarioArraySchema>
export type iUpdateFuncionario = DeepPartial<typeof createFuncionarioSchema>
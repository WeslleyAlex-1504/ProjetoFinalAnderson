import { CreateFuncionario, createFuncionarioSchema, returnAllFuncionario, returnFuncionario, returnFuncionarioArraySchema, returnFuncionarioSchema } from '../../schemas/funcionario.schema';
import { Like, Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Funcionario } from "../../entities/funcionario.entities"
import { AppError } from "../../error"

export const pegarTodosFuncionariosServices=async(nome?:string,ativo?:boolean,limite?:number,offset?:number) =>{
    const funcionarioRepository: Repository<Funcionario> = AppDataSource.getRepository(Funcionario)
    
  const where: any = {};

  if (nome) {
    where.nome = Like(`${nome.toLowerCase()}%`);
  }

  if (ativo !== undefined) {
    where.ativo = ativo
  }

  const options: any = { where };

  if (limite) {
    options.take = limite
  }

  if (offset) {
    options.skip = offset
  }

  const funcionario = await funcionarioRepository.find(options);
  
  const funcionarioFinal = returnFuncionarioArraySchema.parse(funcionario);
  return funcionarioFinal;

}

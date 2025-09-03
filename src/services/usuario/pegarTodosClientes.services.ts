import { AppDataSource } from '../../data-source';
import { ILike, Like, Repository } from "typeorm"
import { Usuario } from '../../entities/usuario.entities';
import { returnUserArraySchema } from '../../schemas/usuario.schema';

export const pegarTodosClientesServices = async (name?: string,id?:number,email?:string,telefone2?: string,ativo?:boolean,limite?:number,offset?:number) => {
  const usuarioRepository: Repository<Usuario> = AppDataSource.getRepository(Usuario);

  const where: any = {};

  if (name) {
    where.nome = Like(`${name.toLowerCase()}%`);
  }

  if (email) {
    where.email = ILike(`${email}%`);
  }

  if (id) {
    where.id = id;
  }

  if (telefone2) {
    where.telefone = Like(`%${telefone2}%`);
  }

  if (ativo !== undefined) {
    where.ativo = ativo
  }

  const options: any = { where, order: { id: "DESC" } };

  if (limite) {
    options.take = limite
  }

  if (offset) {
    options.skip = offset
  }

  const usuario = await usuarioRepository.find(options);

  const usuarioFinal = returnUserArraySchema.parse(usuario);
  return usuarioFinal;
};
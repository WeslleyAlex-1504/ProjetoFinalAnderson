import { AppDataSource } from '../../data-source';
import { Like, Repository } from "typeorm"
import { Usuario } from '../../entities/usuario.entities';
import { returnUserArraySchema } from '../../schemas/usuario.schema';

export const pegarTodosClientesServices = async (name?: string,telefone2?: string) => {
  const usuarioRepository: Repository<Usuario> = AppDataSource.getRepository(Usuario);

  const where: any = {};

  if (name) {
    where.nome = Like(`${name}%`);
  }

  if (telefone2) {
    where.telefone = Like(`${telefone2}%`);
  }

const options: any = { where };

  const usuario = await usuarioRepository.find(options);

  const usuarioFinal = returnUserArraySchema.parse(usuario);
  return usuarioFinal;
};
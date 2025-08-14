import { AppDataSource } from '../../data-source';
import { Usuario } from '../../entities/usuario.entities';
import { AppError } from '../../error';
import { Repository } from "typeorm"

export const deletarUsuarioService = async (id:number) => {
     const usuarioRepository: Repository<Usuario> = AppDataSource.getRepository(Usuario)

    const FindUsuario:Usuario|null =await usuarioRepository.findOne({
             where: {
                 id: id
             }
         })

    if (!FindUsuario){
        throw new AppError("Despesa não encontrada", 400);
    }     

    await usuarioRepository.remove(FindUsuario)
}
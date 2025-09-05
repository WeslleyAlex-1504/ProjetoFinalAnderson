import { AppDataSource } from "../../data-source";
import { Usuario } from "../../entities/usuario.entities";
import { AppError } from "../../error";
import { otpStore } from "../../middleware/gerarCodigo.middleware";
import jwt from "jsonwebtoken";

export const verificarCodigoService = async (email: string, otp: string) => {
  const userRepository = AppDataSource.getRepository(Usuario);
  const user = await userRepository.findOne({ where: { email } });

  if (!user) throw new AppError("Usuário não encontrado", 404);

  const entry = otpStore.get(email);
  if (!entry) throw new AppError("Código expirado ou inválido", 400);

  if (entry.expires < Date.now()) {
    otpStore.delete(email);
    throw new AppError("Código expirado", 400);
  }

  if (entry.code !== otp) throw new AppError("Código inválido", 400);

  otpStore.delete(email);

  
  const token = jwt.sign(
    { id: user.id, nome: user.nome, admin: user.admin, ativo: user.ativo },
    process.env.secret_key!,
    { expiresIn: "24h", subject: String(user.id) }
  );

  return token;
};
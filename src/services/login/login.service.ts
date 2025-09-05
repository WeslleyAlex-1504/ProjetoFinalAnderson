import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { Usuario } from "../../entities/usuario.entities";
import { loginReturnSchemas, loginUser } from "../../schemas/login.schema";
import { enviarEmail } from "../../middleware/enviarEmail.middleware";
import { otpStore } from "../../middleware/gerarCodigo.middleware";


const gerarCodigoOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export const loginServices = async (user: loginUser): Promise<{ email: string }> => {
  const userRepository: Repository<Usuario> = AppDataSource.getRepository(Usuario);

  const findUser: Usuario | null = await userRepository.findOne({
    where: { email: user.email },
  });

  if (!findUser) throw new AppError("usuario não encontrado");

  const validador = await bcrypt.compare(user.password, findUser.password);
  if (!validador) throw new AppError("senha ou e-mail incorreto", 409);


  const codigoOTP = gerarCodigoOTP();
  otpStore.set(findUser.email, {
    code: codigoOTP,
    expires: Date.now() + 5 * 60 * 1000, 
  });


  await enviarEmail(
    findUser.email,
    "Código de verificação",
    `Olá ${findUser.nome}, seu código de verificação é: ${codigoOTP}. Expira em 5 minutos.`
  );

  return { email: findUser.email }; 
};
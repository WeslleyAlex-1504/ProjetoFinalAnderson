import { enviarEmail } from "./src/middleware/enviarEmail.middleware";

const main = async () => {
  const destinatario = "weslleyalex@outlook.com"; // coloque seu email de teste
  const assunto = "Teste de envio";
  const mensagem = "Olá! Este é um teste do Nodemailer.";

  const resultado = await enviarEmail(destinatario, assunto, mensagem);

  if (resultado) {
    console.log("Email enviado com sucesso!");
  } else {
    console.log("Falha ao enviar o email.");
  }
};

main();
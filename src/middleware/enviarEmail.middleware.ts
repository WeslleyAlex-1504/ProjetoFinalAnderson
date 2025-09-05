const nodemailer = require("nodemailer");

export const enviarEmail = async (destinatario: string, assunto: string, mensagem: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "weslleyalexdasiuva@gmail.com",
        pass: "juidpetkprwbqvor", 
      },
    });

    const mailOptions = {
      from: "weslleyalexdasiuva@gmail.com",
      to: destinatario,
      subject: assunto,
      text: mensagem,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("E-mail enviado:", info.messageId);
    return true;
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return false;
  }
};

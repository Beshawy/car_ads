import nodemailer from "nodemailer";

export class EmailService {
  static async sendEmail(to: string, subject: string, text: string) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Cars Platform" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
    });
  }
}
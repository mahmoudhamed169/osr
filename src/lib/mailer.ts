import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 465),
  secure: Number(process.env.SMTP_PORT ?? 465) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const MAIL_FROM = process.env.SMTP_FROM ?? `OSR Website <${process.env.SMTP_USER}>`;
export const MAIL_TO   = process.env.MAIL_TO   ?? (process.env.SMTP_USER as string);

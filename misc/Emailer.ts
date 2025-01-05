import assert from "assert";
import * as nodemailer from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

/**
 * Emailer class to send emails through smtp
 */
export class Emailer {
  private transporter: nodemailer.Transporter;
  private SMTPHost?: string;
  private SMTPPort?: number;
  private SMTPUser?: string;
  private SMTPPass?: string;
  private SMTPFrom?: string;

  constructor() {
    this.SMTPHost = process.env.SMTP_HOST;
    this.SMTPPort = parseInt(process.env.SMTP_PORT ?? "");
    this.SMTPUser = process.env.SMTP_USER;
    this.SMTPPass = process.env.SMTP_PASS;
    this.SMTPFrom = process.env.SMTP;

    assert(this.SMTPHost, "SMTP_HOST is required");
    assert(this.SMTPPort, "SMTP_PORT is required");
    assert(this.SMTPUser, "SMTP_USER is required");
    assert(this.SMTPPass, "SMTP_PASS is required");
    assert(this.SMTPFrom, "SMTP_FROM is required. e.g. 'noreply@example.com'");

    this.transporter = nodemailer.createTransport({
      // @ts-ignore its set in env
      host: this.SMTPHost,
      port: this.SMTPPort,
      secure: true,
      auth: {
        user: this.SMTPUser,
        pass: this.SMTPPass,
      },
    });
  }

  async sendEmail({ to, subject, html }: EmailOptions) {
    await this.transporter.sendMail({
      from: this.SMTPFrom,
      to,
      subject,
      html,
    });
  }
}

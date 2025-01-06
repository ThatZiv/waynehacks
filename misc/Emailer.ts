import { emailTemplate } from "./templates";
import constants, { events } from "@/misc/constants";
import assert from "assert";
import * as nodemailer from "nodemailer";
import { generateICS } from "@/misc/events";
import { Notifier } from "@/misc/webhook/WebhookService";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

/**
 * Emailer class to send emails through smtp
 */
export class EmailerService {
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
    this.SMTPFrom = process.env.SMTP_FROM;

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

    this.transporter.verify((error) => {
      if (error) {
        console.error("SMTP connection error: ", error);
      } else {
        console.log("SMTP connection ready");
      }
    });
  }

  async sendEmail({ to, subject, html }: EmailOptions): Promise<void> {
    if (process.env.NODE_ENV === "development") {
      console.log(`Not sending email in dev, to ${to} `);
      throw new Error(`Email to ${to} not sent in dev`);
    }
    try {
      await this.transporter.sendMail({
        from: this.SMTPFrom,
        to,
        subject: `WayneHacks: ${subject}`,
        cc: constants.supportEmail,
        html: emailTemplate(subject, html),
        // icalEvent: {
        //   method: "request",
        //   content: generateICS(events) as string,
        // },
      });
      await Notifier.send(`Email sent to ${to}`, subject);
    } catch (err) {
      let error = err as Error;
      console.error(`Failed to send email to ${to},`, error.message);
      await Notifier.send(
        `Email send failed to ${to}`,
        `Failed to send email to ${to} due to: ${error.message}`
      );
      throw err;
    }
  }
}

const Emailer = new EmailerService();

export default Emailer;

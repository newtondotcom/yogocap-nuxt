import nodemailer from "nodemailer";
import getMailTemplate from "~/lib/mails/videoready";
import prisma from "./prisma";

const config = useRuntimeConfig();

const MAIL_HOST = config.MAIL_HOST;
const MAIL_PORT = config.MAIL_PORT;
const MAIL_SSL = config.MAIL_SSL;
const MAIL_USER = config.MAIL_USER;
const MAIL_PWD = config.MAIL_PWD;

const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: MAIL_SSL,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PWD,
  },
  tls: {
    rejectUnauthorized: false
  }
});

export async function sendEmailOnVideoDone(user_id: any, video_id: any) {
  try {
    const video_name = await prisma.video.findUnique({
      where: {
        id: video_id
      },
      select: {
        name: true
      }
    });
    const emailO = await prisma.account.findUnique({
      where: {
        user_id: user_id
      },
      select: {
        email: true
      }
    });
    const email = emailO?.email;
    const { body, subject } = getMailTemplate(video_id, "https://app.yogocap.com/pvideos");
    console.log("Sending email to user: ", user_id, " for video: ", video_id);
    const info = await transporter.sendMail({
      from: '"Robin from Yogocap 👻" <robin@yogocap.com>',
      to: email,
      subject: subject,
      html: body,
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error: any) {
    throw new Error(`Error sending email: ${error.message}`);
  }
}
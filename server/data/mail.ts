import nodemailer from "nodemailer";

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
    console.log("Sending email to user: ", user_id, " for video: ", video_id);
  } catch (error: any) {
    throw new Error(`Error sending email: ${error.message}`);
  }
}
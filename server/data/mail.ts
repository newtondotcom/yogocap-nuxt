import nodemailer from "nodemailer";

const MAIL_HOST = "smtp.gmail.com";
const MAIL_PORT = 465;
const MAIL_SSL = true;
const MAIL_USER = "";
const MAIL_PWD = "password";

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

export async function sendEmailOnVideoDone(user_id: any,video_id: any) {
  try {
    console.log("Sending email to user: ", user_id, " for video: ", video_id);
  } catch (error : any) {
    throw new Error(`Error sending email: ${error.message}`);
  }
}
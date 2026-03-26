const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT) || 587,
      secure: String(process.env.MAIL_SECURE).toLowerCase() === "true",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    })

    const info = await transporter.sendMail({
      from:
        process.env.MAIL_FROM ||
        `"StudyNotion" <${process.env.MAIL_USER || "no-reply@studynotion.com"}>`,
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    })
    console.log(info)
    return info
  } catch (error) {
    console.log(error.message)
    throw error
  }
}


module.exports = mailSender;
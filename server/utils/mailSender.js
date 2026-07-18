// const nodemailer = require("nodemailer");

// const mailSender = async (email, title, body) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: process.env.MAIL_HOST,
//       port: Number(process.env.MAIL_PORT) || 465,
//       secure: String(process.env.MAIL_SECURE).toLowerCase() === "true",
//       auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS,
//       },
//     });

//     await transporter.verify();
//     console.log("SMTP Connected Successfully");

//     const info = await transporter.sendMail({
//       from:
//         process.env.MAIL_FROM ||
//         `"StudyNotion" <${process.env.MAIL_USER || "no-reply@studynotion.com"}>`,
//       to: `${email}`,
//       subject: `${title}`,
//       html: `${body}`,
//     })
//     console.log(info)
//     return info
//   } catch (error) {
//     console.log(error.message)
//     throw error
//   }
// }
// module.exports = mailSender;

const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT) || 2525,
      secure: String(process.env.MAIL_SECURE).toLowerCase() === "true", // Will evaluate to false for port 2525
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.verify();
    console.log("SMTP Connected Successfully");

    const info = await transporter.sendMail({
      // The 'from' email must be the one you used to register your Brevo account
      from: `"StudyNotion" <adityakale6805@gmail.com>`, 
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });
    
    console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Error occurred while sending email:", error.message);
    throw error;
  }
};

module.exports = mailSender;

// // Load environment variables immediately in this file
// require("dotenv").config();
// const { Resend } = require('resend');

// // Initialize Resend using your API key from the environment variables
// const resend = new Resend(process.env.RESEND_API_KEY);

// const mailSender = async (email, title, body) => {
//   try {
//     /* ======================================================================
//       WHY WE USE AN HTTP EMAIL SERVICE (RESEND) INSTEAD OF STANDARD SMTP:
//       ======================================================================
//       1. The Render Port Block: Cloud hosting platforms like Render strictly 
//          block outbound network traffic on standard SMTP ports (25, 465, and 587) 
//          on their Free Tier to prevent their servers from being used by spammers.
      
//       2. The ETIMEDOUT Error: When Nodemailer tries to connect to Gmail's SMTP 
//          server on those blocked ports, the Render firewall silently drops the 
//          connection. This causes the API request to hang ("Loading...") until 
//          it eventually crashes with a connection timeout error.
      
//       3. The HTTPS Solution: Services like Resend do not use standard SMTP to 
//          dispatch the email from your server. Instead, they accept an API request 
//          over standard HTTPS (Port 443). Because web hosting platforms never block 
//          standard web traffic (HTTPS), the email sends instantly and reliably in 
//          production environments.
//       ======================================================================
//     */

//     const { data, error } = await resend.emails.send({
//       from: 'StudyNotion <onboarding@resend.dev>', 
//       to: email,
//       subject: title,
//       html: body,
//     });

//     // Manually throw an error if Resend populates the error object
//     if (error) {
//       console.error("Resend API blocked the email:", error.message);
//       throw new Error(error.message);
//     }

//     console.log("Email sent successfully via Resend:", data);
//     return data;
    
//   } catch (error) {
//     console.error("Error occurred while sending email:", error.message);
//     throw error;
//   }
// }

// module.exports = mailSender;
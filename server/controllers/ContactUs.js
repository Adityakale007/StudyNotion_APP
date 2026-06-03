const { contactUsEmail } = require("../mail/templates/contactFormRes")
const mailSender = require("../utils/mailSender")

exports.contactUsController = async (req, res) => {
  const { email, firstname, lastname, message, phoneNo, countrycode } = req.body
  console.log(req.body)
  try {
    // 1. Send the details to YOU (The Admin) using your custom template
    const adminEmailRes = await mailSender(
      process.env.MAIL_USER, // <-- This sends it to kingchess219@gmail.com
      `New Contact Us Message from ${firstname} ${lastname}`,
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    )
    console.log("Admin Email Res ", adminEmailRes)

    // 2. Send a quick auto-reply to the USER who filled out the form
    const userEmailRes = await mailSender(
      email, // <-- This sends it to the user
      "We received your message - StudyNotion",
      `<div>
        <h2>Hello ${firstname},</h2>
        <p>Thank you for reaching out! We have received your message and our team will get back to you shortly.</p>
        <p>Best Regards,<br/>The StudyNotion Team</p>
      </div>`
    )
    console.log("User Email Res ", userEmailRes)

    return res.json({
      success: true,
      message: "Email send successfully",
    })
  } catch (error) {
    console.log("Error", error)
    console.log("Error message :", error.message)
    return res.json({
      success: false,
      message: "Something went wrong...",
    })
  }
}
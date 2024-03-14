const nodemailer = require("nodemailer");

const sendMail = async (to, subject, text, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "3b60d730b3151a",
        pass: "88a19f0869c7ef",
      },
    });

    const info = await transporter.sendMail({
      from: '"Hospital Management System" < uYn3T@example.com>',
      to: to,
      subject: subject,
      text: text,
      html: html,
    });

    console.log("Message sent: %s", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
};

module.exports = sendMail;

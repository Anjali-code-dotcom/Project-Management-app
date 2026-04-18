const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  try {
    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

   
    const mailOptions = {
      from: `"Bug Tracker" <${process.env.EMAIL}>`,
      to,
      subject,
      text,
    };

    
    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent:", info.response);

  } catch (error) {
    console.error("❌ Email error:", error.message);
    throw error; 
  }
};

module.exports = sendEmail;
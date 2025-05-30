// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "Gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// async function sendCertificationEmail(to, username, certName) {
//   const mailOptions = {
//     from: `Your App Name <${process.env.EMAIL_USER}>`,
//     to,
//     subject: "Certification Completed 🎓",
//     html: `<p>Hi ${username},</p><p>Congratulations! You've successfully completed the <strong>${certName}</strong> certification.</p><p>Keep learning!</p>`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log(`Email sent to ${to}`);
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw error;
//   }
// }

// module.exports = { sendCertificationEmail };
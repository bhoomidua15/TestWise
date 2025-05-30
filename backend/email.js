require("dotenv").config();
const nodemailer = require("nodemailer");
const {jsPDF} = require("jspdf");

const transporter = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});

const generateCertificatePDF = (username, testTitle, score, date) => {
	const doc = new jsPDF();

	// Background
	doc.setFillColor("#f8f9fa");
	doc.rect(0, 0, 210, 297, "F");

	// Border
	doc.setDrawColor("#000");
	doc.setLineWidth(1);
	doc.rect(10, 10, 190, 277);

	// Title
	doc.setFontSize(24);
	doc.setTextColor("#2c3e50");
	doc.text("Certificate of Achievement", 105, 40, { align: "center" });

	// Subtitle
	doc.setFontSize(16);
	doc.text("This is to certify that", 105, 70, { align: "center" });

	// Name
	doc.setFontSize(20);
	doc.setTextColor("#34495e");
	doc.text(username, 105, 90, { align: "center" });

	// Achievement text
	doc.setFontSize(16);
	doc.setTextColor("#2c3e50");
	doc.text("has successfully completed the test", 105, 110, {
		align: "center",
	});

	// Test title
	doc.setFontSize(18);
	doc.text("${testTitle}", 105, 130, { align: "center" });

	// Score
	doc.setFontSize(16);
	doc.text(`with a perfect score of ${score}%`, 105, 150, { align: "center" });

	// Date
	doc.setFontSize(14);
	doc.text(`Date: ${new Date(date).toLocaleDateString()}`, 105, 180, {
		align: "center",
	});

	// Signature line
	doc.line(70, 230, 140, 230);
	doc.setFontSize(12);
	doc.text("Authorized Signature", 105, 240, { align: "center" });

	return doc;
};

async function sendCertificationEmail(to, username, testTitle) {
	try {
		// Generate the certificate PDF
		const certificate = generateCertificatePDF(
			username,
			testTitle,
			100,
			new Date()
		);
		const pdfBuffer = certificate.output("arraybuffer");

		const mailOptions = {
			from: `TestWise <${process.env.EMAIL_USER}>`,
			to,
			subject: "🎉 TestWise Perfect Score Achievement Certificate!",
			html: `
				<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; border-radius: 10px;">
					<div style="text-align: center; margin-bottom: 20px;">
						<h1 style="color: #2c3e50; margin: 0;">TestWise</h1>
						<p style="color: #7f8c8d; margin: 5px 0;">Excellence in Assessment</p>
					</div>
					<h2 style="color: #2c3e50; text-align: center;">Congratulations ${username}! 🎉</h2>
					<p style="font-size: 16px; color: #34495e; text-align: center;">
						You have achieved a perfect score of 100% on the test: <strong>${testTitle}</strong>
					</p>
					<p style="font-size: 16px; color: #34495e; text-align: center;">
						Your certificate is attached to this email. Keep up the great work!
					</p>
					<div style="margin-top: 20px; padding: 15px; background-color: #ffffff; border-radius: 5px; text-align: center;">
						<p style="margin: 0; color: #7f8c8d;">
							Best regards,<br>
							The TestWise Team
						</p>
					</div>
					<div style="margin-top: 20px; text-align: center; font-size: 12px; color: #95a5a6;">
						<p>This is an automated message from TestWise Platform. Please do not reply to this email.</p>
					</div>
				</div>
			`,
			attachments: [
				{
					filename: `TestWise-${username}-${testTitle}-Certificate.pdf`,
					content: `Buffer.from(pdfBuffer)`,
					contentType: "application/pdf",
				},
			],
		};

		await transporter.sendMail(mailOptions);
		console.log("Email sent:", mailOptions);
		console.log(`Certificate email sent to ${to}`);
	} catch (error) {
		console.error("Error sending certificate email:", error);
		throw error;
	}
}

module.exports = { sendCertificationEmail };


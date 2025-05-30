// const { sendCertificationEmail } = require('./sendmail');

// // Ensure this middleware is set earlier in your app.js or index.js
// // app.use(express.json());

// app.post("/api/certifications/complete", async (req, res) => {
//   try {
//     const { userId, certificationId } = req.body;

//     // ✅ Step 1: Validate input
//     if (!userId || !certificationId) {
//       console.error("Missing userId or certificationId in request body");
//       return res.status(400).send("userId and certificationId are required");
//     }

//     // ✅ Step 2: Log incoming request
//     console.log("Received certification completion request:");
//     console.log("UserId:", userId);
//     console.log("CertificationId:", certificationId);

//     // ✅ Step 3: Fetch certification
//     const certification = await Certification.findById(certificationId);
//     if (!certification) {
//       console.error("Certification not found with ID:", certificationId);
//       return res.status(404).send("Certification not found");
//     }

//     // ✅ Step 4: Mark as completed
//     certification.status = "completed";
//     await certification.save();
//     console.log("Certification marked as completed:", certification.title);

//     // ✅ Step 5: Fetch user
//     const user = await User.findById(userId);
//     if (!user) {
//       console.error("User not found with ID:", userId);
//       return res.status(404).send("User not found");
//     }

//     console.log("User Email:", user.email);
//     console.log("User Name:", user.name);
//     console.log("Certification Title:", certification.title);

//     // ✅ Step 6: Send certification email
//     try {
//       await sendCertificationEmail(user.email, user.name, certification.title);
//       console.log("✅ Email sent successfully to:", user.email);
//     } catch (emailErr) {
//       console.error("❌ Error sending email:", emailErr.message, emailErr.response || '');
//       return res.status(500).send("Failed to send email");
//     }

//     // ✅ Step 7: Send response to client
//     res.send({ message: "Certification marked as completed and email sent." });

//   } catch (err) {
//     console.error("🔥 Internal server error in /api/certifications/complete:", err);
//     res.status(500).send("Something went wrong");
//   }
// });

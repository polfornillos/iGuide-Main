require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// POST Route to Handle Form Submission
app.post("/send-email", async (req, res) => {
    const formData = req.body; // Get form data from request

    // Validate required fields (basic validation)
    if (!formData.firstName || !formData.lastName || !formData.emailAddress) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    // Email Setup (replace with your credentials or use environment variables)
    const transporter = nodemailer.createTransport({
        service: "gmail", 
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS,
        },
    });

    // Format email message
    const mailOptions = {
        from: `"iACADEMY Admissions" <${process.env.EMAIL_USER || "your-email@gmail.com"}>`,
        to: "fornillospaul@gmail.com", // Default recipient
        subject: `New Admission Form Submission: ${formData.firstName} ${formData.lastName}`,
        html: `
            <h2>New Application Received</h2>
            <p><b>Name:</b> ${formData.firstName} ${formData.lastName}</p>
            <p><b>Email:</b> ${formData.emailAddress}</p>
            <p><b>Phone:</b> ${formData.mobileNumber}</p>
            <p><b>Applying For:</b> ${formData.firstChoice || "Not Provided"}</p>
            <p><b>Applicant Type:</b> ${formData.applicantType || "Not Provided"}</p>
            <p><b>Birthdate:</b> ${formData.dateOfBirth}</p>
            <p><b>Gender:</b> ${formData.gender}</p>
            <p><b>Citizenship:</b> ${formData.citizenship}</p>
            <p><b>Address:</b> ${formData.address}, ${formData.city}, ${formData.country}</p>
            <p><b>Parent Details:</b> ${formData.motherName} (Mother), ${formData.fatherName} (Father)</p>
            <p><b>Educational Background:</b> ${formData.lastSchool} - ${formData.programStrand}</p>
            <p><b>Other Info:</b> Good Moral: ${formData.goodMoral}, Illegal Activity: ${formData.illegalActivity}</p>
            <p><b>Health Issues:</b> ${formData.healthConcerns || "None"}</p>
            <p><b>Referral Source:</b> ${formData.referralSource || "Not Provided"}</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error sending email" });
    }
});

app.listen(5001, () => {
    console.log("Server running on port 5001");
});

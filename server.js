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
        from: `"iACADEMY Admissions" <${process.env.EMAIL_USER}>`,
        to: `<${formData.recipientEmail}>`,
        subject: `New Admission Form Submission: ${formData.firstName} ${formData.lastName}`,
        html: `
            <h3>Application Details</h3>
            <p><b>Applicant Type:</b> ${formData.applicantType}</p>
            <p><b>Term Selection:</b> ${formData.termSelection}</p>
            <p><b>First Choice:</b> ${formData.firstChoice}</p>
            <p><b>Second Choice:</b> ${formData.secondChoice}</p>
            <p><b>Third Choice:</b> ${formData.thirdChoice}</p>

            <h3>Basic Information</h3>
            <p><b>Name:</b> ${formData.firstName} ${formData.middleName || ""} ${formData.lastName} ${formData.suffix || ""}</p>
            <p><b>Date of Birth:</b> ${formData.dateOfBirth}</p>
            <p><b>Place of Birth:</b> ${formData.placeOfBirth}</p>
            <p><b>Gender:</b> ${formData.gender}</p>
            <p><b>Citizenship:</b> ${formData.citizenship}</p>

            <h3>Contact Information</h3>
            <p><b>Email:</b> ${formData.emailAddress}</p>
            <p><b>Mobile Number:</b> ${formData.mobileNumber}</p>

            <h3>Address</h3>
            <p><b>Complete Address:</b> ${formData.address}, ${formData.barangay}, ${formData.city}, ${formData.stateProvince}, ${formData.country}</p>

            <h3>Parent/Guardian Information</h3>
            <p><b>Mother:</b> ${formData.motherName} (${formData.motherOccupation}) - ${formData.motherEmail} | ${formData.motherMobile}</p>
            <p><b>Father:</b> ${formData.fatherName} (${formData.fatherOccupation}) - ${formData.fatherEmail} | ${formData.fatherMobile}</p>
            <p><b>Guardian:</b> ${formData.guardianName} (${formData.guardianOccupation}) - ${formData.guardianEmail} | ${formData.guardianMobile}</p>

            <h3>Educational Background</h3>
            <p><b>Last School Attended:</b> ${formData.lastSchool}, ${formData.educationalCity}, ${formData.educationalState}, ${formData.educationalCountry}</p>
            <p><b>Grade/Year Level:</b> ${formData.gradeYearLevel}</p>
            <p><b>Program/Strand:</b> ${formData.programStrand}</p>
            <p><b>LRN (if applicable):</b> ${formData.lrn || "Not Provided"}</p>

            <h3>Additional Information</h3>
            <p><b>Good Moral Standing:</b> ${formData.goodMoral}</p>
            <p><b>Involved in Illegal Activities:</b> ${formData.illegalActivity}</p>

            <h3>Health Information</h3>
            <p><b>Hospitalized Before:</b> ${formData.hospitalized}</p>
            <p><b>Health Concerns:</b> ${formData.healthConcerns || "None"}</p>
            <p><b>Health Issues:</b> ${formData.healthIssues?.join(", ") || "None"}</p>
            <p><b>Other Health Details:</b> ${formData.otherHealthDetails || "None"}</p>

            <h3>Referral Information</h3>
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

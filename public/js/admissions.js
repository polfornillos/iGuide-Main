const degreePrograms = [
    "Bachelor of Science in Real Estate Management (Fast Track) Business", "2D - Animation", 
    "2D - Multimedia Arts", "2D - Fashion Design", "2D - Film & Visual Effects", 
    "Bachelor of Science in Accountancy (Fast Track) Business", "2D - Marketing Management", 
    "2D - Psychology", "2D - Software Engineering", "2D - Game Development", "2D - Web Development", 
    "2D - Cloud Computing", "2D - Data Science", "2D - Music Production and Sound Design", 
    "Bachelor of Science in Real Estate Management (Fast Track) Non-Business", 
    "Bachelor of Science in Accountancy (Fast Track) Non-Business", 
    "Bachelor of Science in Accountancy (Fast Track) Bridging"
];

const generalPrograms = [
    "Bachelor of Science in Computer Science with Specialization in Software Engineering", 
    "Bachelor of Science in Entertainment and Multimedia Computing with Specialization in Game Development", 
    "Bachelor of Science in Animation", "Bachelor of Arts in Multimedia Arts and Design", 
    "Bachelor of Science in Computer Science with Specialization in Cloud Computing", 
    "Bachelor of Science in Computer Science with Specialization in Data Science", 
    "Bachelor of Science in Information Technology with Specialization in Web Development", 
    "Bachelor of Science in Business Administration Major in Marketing Management", 
    "Bachelor of Science in Business Administration Major in eManagement", 
    "Bachelor of Science in Real Estate Management", "Bachelor of Science in Accountancy", 
    "Bachelor of Arts in Fashion Design and Technology", "Bachelor of Arts in Music Production and Sound Design", 
    "Bachelor of Arts in Psychology", "Bachelor of Arts in Film and Visual Effects"
];

// Updates dropdown based on selected applicant type
document.addEventListener("DOMContentLoaded", function () {
    initializeDropdowns();

    document.querySelectorAll('input[name="applicant_type"]').forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === "iAcademy College Graduate" || this.value === "Degree from other college") {
                updateProgramDropdowns(degreePrograms); // Use degree programs
            } else {
                updateProgramDropdowns(generalPrograms); // Use general programs
            }
        });
    });
});

function initializeDropdowns() {
    ["firstChoice", "secondChoice", "thirdChoice"].forEach(id => {
        const select = document.getElementById(id);
        select.innerHTML = `<option value="" disabled selected>--Select Option--</option>`;
    });
}

function updateProgramDropdowns(programList) {
    initializeDropdowns(); // Reset dropdowns

    ["firstChoice", "secondChoice", "thirdChoice"].forEach(id => {
        const select = document.getElementById(id);
        programList.forEach(program => {
            select.appendChild(new Option(program, program));
        });
    });
}

// Populates country and country code
document.addEventListener("DOMContentLoaded", function () {
    // Country Code & Country Data
    const countries = [
        { name: "Philippines", code: "+63" },
        { name: "United States", code: "+1" },
        { name: "United Kingdom", code: "+44" },
        { name: "India", code: "+91" },
        { name: "Australia", code: "+61" },
        { name: "Japan", code: "+81" },
        { name: "South Korea", code: "+82" },
        { name: "Germany", code: "+49" },
        { name: "France", code: "+33" },
        { name: "Italy", code: "+39" },
        { name: "China", code: "+86" },
        { name: "Spain", code: "+34" },
        { name: "Russia", code: "+7" },
        { name: "Brazil", code: "+55" },
        { name: "South Africa", code: "+27" },
        { name: "United Arab Emirates", code: "+971" },
        { name: "Canada", code: "+1" },
        { name: "Mexico", code: "+52" },
        { name: "Malaysia", code: "+60" },
        { name: "Singapore", code: "+65" },
        { name: "Thailand", code: "+66" },
        { name: "Vietnam", code: "+84" },
        { name: "Indonesia", code: "+62" },
        { name: "Pakistan", code: "+92" },
        { name: "Bangladesh", code: "+880" },
        { name: "Sri Lanka", code: "+94" },
        { name: "Netherlands", code: "+31" },
        { name: "Sweden", code: "+46" },
        { name: "Switzerland", code: "+41" },
        { name: "Portugal", code: "+351" },
        { name: "Qatar", code: "+974" },
        { name: "Saudi Arabia", code: "+966" }
    ];

    // Function to populate dropdown
    function populateDropdown(selectId, defaultValue, isCountry = false) {
        const dropdown = document.getElementById(selectId);
        if (!dropdown) return; // Prevent errors if the element doesn't exist

        countries.forEach(country => {
            let option = document.createElement("option");
            option.value = isCountry ? country.name : country.code;
            option.textContent = isCountry ? country.name : `${country.code} (${country.name})`;
            dropdown.appendChild(option);
        });
        dropdown.value = defaultValue;
    }

    // Populate Country Code Dropdowns
    populateDropdown("countryCodeMobile", "+63");
    populateDropdown("countryCodeConfirm", "+63");

    // Populate Country Dropdowns
    populateDropdown("country", "Philippines", true);
    populateDropdown("educationalCountry", "Philippines", true);
});

// Changes the makati to cebu and vice versa
document.addEventListener("DOMContentLoaded", function () {
    const campusName = document.getElementById("campusName");
    const campusNote = document.getElementById("campusNote");
    const changeCampus = document.getElementById("changeCampus");
    const schoolCampus = document.getElementById("schoolCampus");
    const recipientEmail = document.getElementById("recipientEmail");

    let isMakati = true; 

    // Set default email to Makati on page load
    recipientEmail.value = "iguide2025@gmail.com";

    changeCampus.addEventListener("click", function (event) {
        event.preventDefault();

        if (isMakati) {
            // Switch to Cebu
            campusName.textContent = "CEBU";
            schoolCampus.textContent = "iAcademy Cebu ";
            campusNote.textContent = "iACADEMY Cebu Campus";
            recipientEmail.value = "fornillospaul@gmail.com"; 
            changeCampus.textContent = "click here";
        } else {
            // Switch back to Makati
            campusName.textContent = "MAKATI";
            schoolCampus.textContent = "iAcademy Makati ";
            campusNote.textContent = "iACADEMY Makati Campus";
            recipientEmail.value = "iguide2025@gmail.com";
            changeCampus.textContent = "click here";
        }

        isMakati = !isMakati;
    });
});

// Submits the form
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("submitAdmissionForm").addEventListener("click", async function (event) {
        event.preventDefault();

        // Reset previous error styles
        document.querySelectorAll(".error-message").forEach(el => el.remove());
        document.querySelectorAll(".form-control, .form-select").forEach(el => el.style.border = "");
        document.querySelectorAll(".radio-box").forEach(el => el.classList.remove("radio-box-error"));

        let formData = {
            recipientEmail: document.getElementById("recipientEmail").value.trim(),

            // Basic Information
            firstName: document.getElementById("firstName").value.trim(),
            middleName: document.getElementById("middleName").value.trim(),
            lastName: document.getElementById("lastName").value.trim(),
            suffix: document.getElementById("suffix").value.trim(),
            dateOfBirth: document.getElementById("dateOfBirth").value,
            placeOfBirth: document.getElementById("placeOfBirth").value.trim(),
            gender: document.getElementById("gender").value,
            citizenship: document.getElementById("citizenship").value.trim(),

            // Contact Information
            emailAddress: document.getElementById("emailAddress").value.trim(),
            confirmEmailAddress: document.getElementById("confirmEmailAddress").value.trim(),
            mobileNumber: document.getElementById("mobileNumber").value.trim(),
            confirmMobileNumber: document.getElementById("confirmMobileNumber").value.trim(),

            // Address
            address: document.getElementById("address").value.trim(),
            barangay: document.getElementById("barangay").value.trim(),
            city: document.getElementById("city").value.trim(),
            country: document.getElementById("country").value,
            stateProvince: document.getElementById("stateProvince").value.trim(),

            // Parent Information
            motherName: document.getElementById("motherName").value.trim(),
            motherOccupation: document.getElementById("motherOccupation").value.trim(),
            motherEmail: document.getElementById("motherEmail").value.trim(),
            motherMobile: document.getElementById("motherMobile").value.trim(),

            fatherName: document.getElementById("fatherName").value.trim(),
            fatherOccupation: document.getElementById("fatherOccupation").value.trim(),
            fatherEmail: document.getElementById("fatherEmail").value.trim(),
            fatherMobile: document.getElementById("fatherMobile").value.trim(),

            guardianName: document.getElementById("guardianName").value.trim(),
            guardianOccupation: document.getElementById("guardianOccupation").value.trim(),
            guardianEmail: document.getElementById("guardianEmail").value.trim(),
            guardianMobile: document.getElementById("guardianMobile").value.trim(),

            // Educational Background
            lastSchool: document.getElementById("lastSchool").value.trim(),
            educationalCity: document.getElementById("educationalCity").value.trim(),
            educationalState: document.getElementById("educationalState").value.trim(),
            educationalCountry: document.getElementById("educationalCountry").value,
            gradeYearLevel: document.getElementById("gradeYearLevel").value.trim(),
            programStrand: document.getElementById("programStrand").value.trim(),
            lrn: document.getElementById("lrn").value.trim(),

            // Additional Information
            goodMoral: document.querySelector("input[name='goodMoral']:checked")?.value,
            illegalActivity: document.querySelector("input[name='illegalActivity']:checked")?.value,

            // Health Conditions
            hospitalized: document.querySelector("input[name='hospitalized']:checked")?.value,
            healthConcerns: document.getElementById("healthConcerns").value.trim(),
            healthIssues: Array.from(document.querySelectorAll("input[name='healthIssues']:checked")).map(el => el.value),
            otherHealthDetails: document.getElementById("otherHealthDetails").value.trim(),


            // Referral Source
            referralSource: Array.from(document.querySelectorAll("input[name='referralSource']:checked")).map(el => el.value).join(", "),

            // Term 
            termSelection: document.getElementById("termSelection").value,
            applicantType: document.querySelector("input[name='applicant_type']:checked")?.value,
            firstChoice: document.getElementById("firstChoice").value,
            secondChoice: document.getElementById("secondChoice").value,
            thirdChoice: document.getElementById("thirdChoice").value
        };

        // Validate Required Fields
        let requiredFields = [
            "firstName", "lastName", "dateOfBirth", "placeOfBirth", "gender", "citizenship", "address", "city", "country",
            "emailAddress", "confirmEmailAddress", "mobileNumber", "confirmMobileNumber", "barangay", "stateProvince",
            "motherName", "motherOccupation", "motherEmail", "motherMobile", "fatherName", "fatherOccupation", "fatherEmail", "fatherMobile",
            "guardianName", "guardianOccupation", "guardianEmail", "guardianMobile", "lastSchool", "educationalCity", "educationalState", "gradeYearLevel",
            "programStrand", "termSelection", "firstChoice", "secondChoice", "thirdChoice","healthConcerns"
        ];

        let missingFields = [];

         // Validate if Confirm Email Matches
        if (formData.emailAddress !== formData.confirmEmailAddress) {
            missingFields.push("confirmEmailAddress");
            document.getElementById("confirmEmailAddress").classList.add("is-invalid");
            Swal.fire({
                icon: "error",
                title: "Email Mismatch",
                text: "Your confirmed email address does not match your primary email.",
                confirmButtonColor: "#dc3545",
            });
            return;
        }

        // Validate if Confirm Mobile Matches
        if (formData.mobileNumber !== formData.confirmMobileNumber) {
            missingFields.push("confirmMobileNumber");
            document.getElementById("confirmMobileNumber").classList.add("is-invalid");
            Swal.fire({
                icon: "error",
                title: "Mobile Number Mismatch",
                text: "Your confirmed mobile number does not match your primary mobile number.",
                confirmButtonColor: "#dc3545",
            });
            return;
        }

        // Validate sections with radio boxes
        document.querySelectorAll(".radio-box").forEach(radioBox => {
            let radioInputs = radioBox.querySelectorAll("input[type='radio']");
            let isChecked = Array.from(radioInputs).some(input => input.checked);
        
            if (!isChecked) {
                missingFields.push(radioBox);
                radioBox.classList.add("radio-box-error");
            }
        });

        // Validate input fields
        requiredFields.forEach(id => {
            let input = document.getElementById(id);
            
            if (!formData[id] || formData[id] === "null" || formData[id] === "undefined") {
                missingFields.push(id);
                input.classList.add("is-invalid"); // Add Bootstrap's invalid class
            } else {
                input.classList.remove("is-invalid"); // Remove error if input is valid
            }
        });
        
        // Reset border color when typing/selecting an option
        requiredFields.forEach(id => {
            let input = document.getElementById(id);
            input.addEventListener("input", function () {
                this.classList.remove("is-invalid");
            });
        });
        
 
        // Validate Health Concerns (Textbox must not be empty)
        if (!formData.healthConcerns) {
            missingFields.push("healthConcerns");
            document.getElementById("healthConcerns").style.border = "1px solid red";
        }

        // Validate Health Issues (At least one must be checked)
        let healthIssuesChecked = document.querySelectorAll("input[name='healthIssues']:checked").length > 0;
        let healthIssuesContainer = document.querySelector("input[name='healthIssues']")?.closest(".shadow");

        if (!healthIssuesChecked) {
            missingFields.push("healthIssues");
            if (healthIssuesContainer) {
                healthIssuesContainer.classList.add("radio-box-error"); 
            }
        }

        // Validate "Others" Health Details (Must be filled if "Others" is checked)
        let otherHealthChecked = document.getElementById("otherHealth").checked;
        let otherHealthDetails = document.getElementById("otherHealthDetails").value.trim();

        if (otherHealthChecked && otherHealthDetails === "") {
            missingFields.push("otherHealthDetails");
            document.getElementById("otherHealthDetails").style.border = "1px solid red";
        }

        // Validate Referral Source (At least one must be checked)
        let referralChecked = document.querySelectorAll("input[name='referralSource']:checked").length > 0;
        let referralContainer = document.querySelector("input[name='referralSource']")?.closest(".shadow"); 

        if (!referralChecked) {
            missingFields.push("referralSource");
            if (referralContainer) {
                referralContainer.classList.add("radio-box-error"); 
            }
        }

        if (missingFields.length > 0) {
            Swal.fire({
                icon: "error",
                title: "Missing Required Fields",
                text: "Please fill in all required fields before submitting.",
                confirmButtonText: "OK",
                confirmButtonColor: "#6c757d",
            });
            return;
        }

        try {
            let response = await fetch("http://localhost:5001/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            let result = await response.json();
            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Your application has been submitted!",
                    confirmButtonColor: "#28a745",
                }).then(() => {
                    location.reload(); 
                });
            } else {
                Swal.fire("Error!", result.message, "error");
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire("Error", "Something went wrong. Try again later.", "error");
        }
    });

    // Reset radio button error when selecting an option
    document.querySelectorAll("input[name='applicant_type']").forEach(input => {
        input.addEventListener("change", function () {
            document.querySelectorAll("input[name='applicant_type']").forEach(el => el.parentElement.style.border = "");
        });
    });

    // Remove red border when a radio button is selected
    document.querySelectorAll("input[type='radio']").forEach(input => {
        input.addEventListener("change", function () {
            this.closest(".radio-box").classList.remove("radio-box-error");
        });
    });

    // Remove red border when typing/selecting checkboxes
    document.querySelectorAll(".form-control, input[type='checkbox']").forEach(input => {
        input.addEventListener("input", function () {
            this.style.border = "";
        });

        input.addEventListener("change", function () {
            this.closest(".shadow")?.classList.remove("radio-box-error");
        });
    });

    // Disable "Others" text field unless "Others" checkbox is selected
    document.getElementById("otherHealth").addEventListener("change", function () {
        document.getElementById("otherHealthDetails").disabled = !this.checked;
        if (!this.checked) {
            document.getElementById("otherHealthDetails").value = ""; // Clear input when unchecked
        }
    });

    document.getElementById("confirmEmailAddress").addEventListener("input", function() {
        this.classList.remove("is-invalid");
    });
    
    document.getElementById("confirmMobileNumber").addEventListener("input", function() {
        this.classList.remove("is-invalid");
    });
});

//Function to Sync Country Code Selection
document.addEventListener("DOMContentLoaded", function () {
    const countryCodeMobile = document.getElementById("countryCodeMobile");
    const countryCodeConfirm = document.getElementById("countryCodeConfirm");

    // Function to sync and disable the confirm country code
    function syncCountryCode(source, target) {
        target.value = source.value;
        target.disabled = true;
    }

    countryCodeMobile.addEventListener("change", function () {
        syncCountryCode(this, countryCodeConfirm);
    });

    countryCodeConfirm.addEventListener("change", function () {
        syncCountryCode(this, countryCodeMobile);
    });

    syncCountryCode(countryCodeMobile, countryCodeConfirm);
});


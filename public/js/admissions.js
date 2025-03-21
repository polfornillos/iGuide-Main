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
            updateProgramDropdowns(this.value.includes('degree') ? degreePrograms : generalPrograms);
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
    const changeCampusLink = document.getElementById("changeCampus");
    const campusName = document.getElementById("campusName");
    const campusNote = document.getElementById("campusNote");

    if (changeCampusLink && campusName && campusNote) {
        changeCampusLink.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default link behavior

            // Toggle between Makati and Cebu
            if (campusName.textContent.trim() === "MAKATI") {
                campusName.textContent = "CEBU";
                campusNote.textContent = "iACADEMY Cebu Campus";
            } else {
                campusName.textContent = "MAKATI";
                campusNote.textContent = "iACADEMY Makati Campus";
            }
        });
    }
});

// Submits the form
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("submitAdmissionForm").addEventListener("click", async function (event) {
        event.preventDefault();

        let formData = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            emailAddress: document.getElementById("emailAddress").value,
            mobileNumber: document.getElementById("mobileNumber").value,
            firstChoice: document.getElementById("firstChoice").value,
            applicantType: document.querySelector("input[name='applicant_type']:checked")?.value,
            dateOfBirth: document.getElementById("dateOfBirth").value,
            gender: document.getElementById("gender").value,
            citizenship: document.getElementById("citizenship").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            country: document.getElementById("country").value,
            motherName: document.getElementById("motherName").value,
            fatherName: document.getElementById("fatherName").value,
            lastSchool: document.getElementById("lastSchool").value,
            programStrand: document.getElementById("programStrand").value,
            goodMoral: document.querySelector("input[name='goodMoral']:checked")?.value,
            illegalActivity: document.querySelector("input[name='illegalActivity']:checked")?.value,
            healthConcerns: document.getElementById("healthConcerns").value,
            referralSource: document.querySelector("input[name='referralSource']:checked")?.value,
        };

        try {
            let response = await fetch("http://localhost:5001/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            let result = await response.json();
            if (response.ok) {
                Swal.fire("Success!", "Your application has been submitted!", "success");
            } else {
                Swal.fire("Error!", result.message, "error");
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire("Error", "Something went wrong. Try again later.", "error");
        }
    });
});

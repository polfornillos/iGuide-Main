document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("programs-container");

    if (!container) {
        console.error("Error: programs-container not found in the DOM.");
        return; // Stop execution
    }

    fetch("http://localhost:5000/programs/shs")
        .then(response => response.json())
        .then(data => {
            data.forEach((program, index) => {
                const isEven = index % 2 === 0;

                const programHTML = `
                    <div class="row align-items-center mb-5">
                        ${isEven ? `
                            <div class="col-md-6">
                                <img src="${program.cover_image}" class="img-fluid w-100 rounded-4" alt="${program.program_name}" style="height: 900px; object-fit: cover;">
                            </div>
                            <div class="col-md-6 text-white d-flex flex-column" style="gap:40px">
                        ` : `
                            <div class="col-md-6 text-white d-flex flex-column" style="gap:40px">
                        `}
                            <div class="mb-4 text-start">
                                <h4 class="fw-light mb-1 text-shs">${program.program_name}</h4>
                                <h1 class="fw-bold mb-5">${program.program_specialization}</h1>
                                <p class="mt-2" style="text-align:justify">${program.program_description}</p>
                            </div>
                            <div class="rounded-4 text-start">
                                <p><strong>Number of Terms:</strong> ${program.number_of_terms} terms</p>
                                <p><strong>Internship Duration:</strong> ${program.internship}</p>
                                <p><strong>Careers:</strong> ${program.careers}</p>
                            </div>
                        </div>
                        ${!isEven ? `
                            <div class="col-md-6">
                                <img src="${program.cover_image}" class="img-fluid w-100 rounded-4" alt="${program.program_name}" style="height: 900px; object-fit: cover;">
                            </div>
                        ` : ''}
                    </div>

                    <!-- Spacer -->
                    <div class="container" style="height: 40px;"></div>
                `;

                container.innerHTML += programHTML;
            });
        })
        .catch(error => console.error("Error fetching programs:", error));
});

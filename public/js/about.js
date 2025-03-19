// Populates the page with about
document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:5000/partners/active")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("partners-container");
            let row; // Variable to store the current row

            data.forEach((partner, index) => {
                // Create a new row every 5 items
                if (index % 5 === 0) {
                    row = document.createElement("div");
                    row.className = "row justify-content-center  mb-lg-4 mb-0";
                    container.appendChild(row);
                }

                const col = document.createElement("div");
                col.className = "col-auto px-2 mb-lg-0 mb-3";

                col.innerHTML = `
                    <a href="${partner.company_link}" target="_blank" class="partner-link">
                        <div class="partner-box">
                            <img src="${partner.company_logo}" class="logo" alt="Partner Logo">
                        </div>
                    </a>
                `;

                row.appendChild(col); // Append column to the current row
            });
        })
        .catch(error => console.error("Error fetching partners:", error));
});

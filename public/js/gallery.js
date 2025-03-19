// Populates the page with artworks
document.addEventListener("DOMContentLoaded", function () {
    let artworks = [];
    let visibleCount = 6; // Initially display 6 artworks

    function fetchArtworks() {
        fetch("http://localhost:5000/artworks/active")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Server Error: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (!Array.isArray(data) || data.length === 0) {
                    throw new Error("No artworks available.");
                }
                artworks = data;
                renderArtworks();
            })
            .catch(error => {
                console.error("Error fetching artworks:", error.message);

                document.getElementById("artGallery").innerHTML = `
                    <div class="text-center text-white fs-4 py-5">
                        No artworks available at the moment.
                    </div>
                `;
                document.getElementById("seeMoreBtn").style.display = "none";
            });
    }

    function renderArtworks() {
        const gallery = document.getElementById("artGallery");
        gallery.innerHTML = ""; // Clear previous content

        const displayedArtworks = artworks.slice(0, visibleCount);

        displayedArtworks.forEach(art => {
            const artworkHTML = `
                <div class="col-12 col-md-4 text-wrap position-relative">
                    <div class="gallery-container">
                        <img src="${art.artwork}" class="gallery-img img-fluid rounded" alt="${art.title}">
                        <div class="social-icons">
                            <a href="${art.facebook_link}" target="_blank"><i class="fab fa-facebook"></i></a>
                            <a href="${art.instagram_link}" target="_blank"><i class="fab fa-instagram"></i></a>
                            <a href="${art.twitter_link}" target="_blank"><i class="fab fa-twitter"></i></a>
                        </div>
                    </div>
                    <p class="mt-2 mb-0 fs-5 text-start text-soc fw-bold">${art.title}</p>
                    <p class="fs-5 text-start text-white">By ${art.student_name}</p>
                </div>
            `;
            gallery.innerHTML += artworkHTML;
        });

        // Hide the "See More" button if all artworks are displayed
        if (visibleCount >= artworks.length) {
            document.getElementById("seeMoreBtn").style.display = "none";
        }
    }

    // Load more artworks when the "See More" button is clicked
    document.getElementById("seeMoreBtn").addEventListener("click", function () {
        visibleCount += 6;
        renderArtworks();
    });

    fetchArtworks();
});


// Populates the artworks carousel
document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:5000/artworks/active")  // Make sure the URL matches your backend route
        .then(response => response.json())
        .then(data => {
            const carouselInner = document.getElementById("carouselInner");
            const carouselIndicators = document.getElementById("carouselIndicators");
            const artistName = document.getElementById("artist-name");

            carouselInner.innerHTML = "";
            carouselIndicators.innerHTML = "";

            data = data.slice(0, 4);

            data.forEach((artwork, index) => {
                let activeClass = index === 0 ? "active" : "";

                // Create carousel item
                let carouselItem = `
                    <div class="carousel-item ${activeClass}" data-artist="${artwork.student_name}">
                        <img src="${artwork.artwork}" class="d-block w-100 artwork-img" alt="Artwork ${index + 1}">
                    </div>
                `;
                carouselInner.innerHTML += carouselItem;

                // Create carousel indicator
                let indicator = `
                    <button type="button" data-bs-target="#artworkCarousel" data-bs-slide-to="${index}" class="${activeClass}"></button>
                `;
                carouselIndicators.innerHTML += indicator;
            });

            // Set the artist name dynamically when the slide changes
            const carousel = document.getElementById("artworkCarousel");
            carousel.addEventListener("slid.bs.carousel", function () {
                const activeItem = document.querySelector("#artworkCarousel .carousel-item.active");
                if (activeItem) {
                    artistName.textContent = activeItem.getAttribute("data-artist");
                }
            });

            // Set initial artist name
            artistName.textContent = data[0].student_name;
        })
        .catch(error => console.error("Error fetching artworks:", error));
});

// Populates the news carousel
document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:5000/news/active")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Server Error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const carouselInner = document.querySelector("#newsCarousel .carousel-inner");
            const seeMoreBtn = document.getElementById("seeMoreBtn");
            const newsModal = new bootstrap.Modal(document.getElementById("newsModal"));

            carouselInner.innerHTML = ""; // Clear existing content

            if (!Array.isArray(data) || data.length === 0) {
                throw new Error("No news available.");
            }

            const totalNews = data.length; // Get the total available news
            const maxItems = 6; // Maximum items to display initially
            const newsToShow = data.slice(0, maxItems); // Only show the first 6

            let chunkSize = 3;
            let numSlides = Math.ceil(newsToShow.length / chunkSize);

            for (let i = 0; i < numSlides; i++) {
                let chunk = newsToShow.slice(i * chunkSize, (i + 1) * chunkSize);
                let activeClass = i === 0 ? "active" : "";

                let carouselItem = `
                    <div class="carousel-item ${activeClass}">
                        <div class="row">
                            ${chunk
                                .map(
                                    (news) => `
                                        <div class="col-md-4 text-center news-item" style="cursor:pointer;">
                                            <img src="${news.thumbnail}" 
                                                class="news-img img-fluid rounded clickable-news" 
                                                alt="${news.title}" 
                                                data-bs-toggle="modal" 
                                                data-bs-target="#newsModal"
                                                data-id="${news.id}"
                                                data-title="${news.title}" 
                                                data-description="${news.description}"
                                                data-thumbnail="${news.thumbnail}">
                                            <p class="text-white mt-2 fs-5 title-text">${news.title}</p>
                                        </div>
                                    `
                                )
                                .join("")}
                        </div>
                    </div>
                `;
                carouselInner.innerHTML += carouselItem;
            }

            // Show "See More" button only if there are more than 6 news items
            if (totalNews > maxItems) {
                seeMoreBtn.style.display = "inline-block";
            } else {
                seeMoreBtn.style.display = "none";
            }

            // Attach click event listener to dynamically added elements
            document.querySelectorAll(".clickable-news").forEach(item => {
                item.addEventListener("click", function () {
                    document.getElementById("articleNumber").textContent = this.dataset.id;
                    document.getElementById("modalTitle").textContent = this.dataset.title;
                    document.getElementById("modalDescription").textContent = this.dataset.description;
                    document.getElementById("modalImage").src = this.dataset.thumbnail;

                    newsModal.show(); // Show the modal
                });
            });
        })
        .catch(error => {
            console.error("Error fetching news:", error.message);
            
            const carouselInner = document.querySelector("#newsCarousel .carousel-inner");
            carouselInner.innerHTML = `
                <div class="carousel-item active">
                    <div class="text-center text-white fs-4 py-5">
                        No news available at the moment. Stay tuned for updates!
                    </div>
                </div>
            `;

            document.getElementById("seeMoreBtn").style.display = "none"; // Hide button on failure
        });
});





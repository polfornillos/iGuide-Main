// Populates the artworks carousel
document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:5001/home/artworks")  // Make sure the URL matches your backend route
        .then(response => response.json())
        .then(data => {
            const carouselInner = document.getElementById("carouselInner");
            const carouselIndicators = document.getElementById("carouselIndicators");
            const artistName = document.getElementById("artist-name");

            carouselInner.innerHTML = "";
            carouselIndicators.innerHTML = "";

            data = data.slice(0, 4);

            if (data.length === 0) {
                carouselInner.innerHTML = `
                    <div class="carousel-item active">
                        <div class="text-center text-white fs-4 py-5">
                            No artworks available at the moment. Stay tuned for updates!
                        </div>
                    </div>
                `;
                return;
            }

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
    fetch("http://localhost:5001/home/news") 
        .then(response => response.json())
        .then(data => {
            const carouselInner = document.querySelector("#newsCarousel .carousel-inner");
            const seeMoreBtn = document.getElementById("seeMoreBtn");
            const newsModal = new bootstrap.Modal(document.getElementById("newsModal")); // Initialize Bootstrap modal

            carouselInner.innerHTML = ""; 

            // Limit the data to a maximum of 9 items
            data = data.slice(0, 9);

            if (data.length === 0) {
                carouselInner.innerHTML = `
                    <div class="carousel-item active">
                        <div class="text-center text-white fs-4 py-5">
                            No news available at the moment. Stay tuned for updates!
                        </div>
                    </div>
                `;
                seeMoreBtn.style.display = "none";
                return;
            }

            let chunkSize = 3;
            let totalItems = data.length;
            let numSlides = Math.ceil(totalItems / chunkSize);

            for (let i = 0; i < numSlides; i++) {
                let chunk = data.slice(i * chunkSize, (i + 1) * chunkSize);
                let activeClass = i === 0 ? "active" : "";

                let carouselItem = `
                    <div class="carousel-item ${activeClass}">
                        <div class="row">
                            ${chunk
                                .map(
                                    (news, index) => `
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

            // Show "See More" button if there is news
            seeMoreBtn.style.display = "inline-block";

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
        .catch(error => console.error("Error fetching news:", error));
});





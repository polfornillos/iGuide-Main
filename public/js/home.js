// Changes the name of the artist based on the art displayed
document.addEventListener("DOMContentLoaded", function () {
    var carousel = document.getElementById("artworkCarousel");
    var artistName = document.getElementById("artist-name");

    carousel.addEventListener("slide.bs.carousel", function (event) {
        var nextSlide = event.relatedTarget;
        var artist = nextSlide.getAttribute("data-artist");
        artistName.textContent = artist;
    });
});

// Populates the news carousel
document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:5001/home") 
        .then(response => response.json())
        .then(data => {
            const carouselInner = document.querySelector("#newsCarousel .carousel-inner");
            const seeMoreBtn = document.getElementById("seeMoreBtn");

            carouselInner.innerHTML = ""; 

            if (data.length === 0) {
                // If no news, display a fallback message and hide the "See More" button
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
                                    (news) => `
                                        <div class="col-md-4 text-center">
                                            <img src="${news.thumbnail}" class="news-img img-fluid rounded" alt="${news.title}">
                                            <p class="text-white mt-2 fs-5 news-title">${news.title}</p>
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
        })
        .catch(error => console.error("Error fetching news:", error));
});



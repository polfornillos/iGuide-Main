// Populates the page with news
document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:5000/news/active")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Server Error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const newsContainer = document.getElementById("newsContainer");
            const newsModal = new bootstrap.Modal(document.getElementById("newsModal"));
            const seeMoreNewsBtn = document.getElementById("seeMoreNewsBtn");

            newsContainer.innerHTML = ""; // Clear existing content

            if (!Array.isArray(data) || data.length === 0) {
                throw new Error("No news available.");
            }

            // Show only 6 items initially
            data.slice(0, 6).forEach((news, index) => {
                const newsCard = document.createElement("div");
                newsCard.className = "news-card-container col-lg-4 col-md-6 col-12 mb-4";
                newsCard.innerHTML = `
                    <div class="news-card d-flex flex-column">
                        <img src="${news.thumbnail}" 
                            alt="News Thumbnail" 
                            class="news-thumbnail" 
                            data-id="${news.id}" 
                            data-title="${news.title}" 
                            data-description="${news.description}" 
                            data-thumbnail="${news.thumbnail}">
                        <div class="news-content d-flex flex-column w-100 p-3">
                            <div class="news-text">
                                <h3 class="news-title fs-4 text-start mb-1 text-white">${news.title}</h3>
                                <p class="news-description text-start text-white">
                                    ${news.description}
                                </p>
                            </div>
                            <a href="#" class="read-more text-end mt-4 clickable-news"
                                data-id="${news.id}" 
                                data-title="${news.title}" 
                                data-description="${news.description}" 
                                data-thumbnail="${news.thumbnail}">
                                Read More
                            </a>
                        </div>
                    </div>
                `;
                newsContainer.appendChild(newsCard);
            });

            // Show "See More" button only if there are more than 6 items
            if (data.length > 6) {
                seeMoreNewsBtn.style.display = "inline-block";
            } else {
                seeMoreNewsBtn.style.display = "none";
            }

            // Handle "See More" button click
            seeMoreNewsBtn.addEventListener("click", () => {
                data.slice(6).forEach(news => {
                    const newsCard = document.createElement("div");
                    newsCard.className = "news-card-container col-lg-4 col-md-6 col-12 mb-4";
                    newsCard.innerHTML = `
                        <div class="news-card d-flex flex-column">
                            <img src="${news.thumbnail}" 
                                alt="News Thumbnail" 
                                class="news-thumbnail"
                                data-id="${news.id}" 
                                data-title="${news.title}" 
                                data-description="${news.description}" 
                                data-thumbnail="${news.thumbnail}">
                            <div class="news-content d-flex flex-column w-100 p-3">
                                <div class="news-text">
                                    <h3 class="news-title fs-4 text-start mb-1 text-white">${news.title}</h3>
                                    <p class="news-description text-start text-white">${news.description}</p>
                                </div>
                                <a href="#" class="read-more text-end mt-4 clickable-news"
                                    data-id="${news.id}" 
                                    data-title="${news.title}" 
                                    data-description="${news.description}" 
                                    data-thumbnail="${news.thumbnail}">
                                    Read More
                                </a>
                            </div>
                        </div>
                    `;
                    newsContainer.appendChild(newsCard);
                });

                seeMoreNewsBtn.style.display = "none"; // Hide button after showing all

                // Re-attach click event listener to the newly added news items
                document.querySelectorAll(".clickable-news").forEach(item => {
                    item.addEventListener("click", function () {
                        document.getElementById("articleNumber").textContent = this.dataset.id;
                        document.getElementById("modalTitle").textContent = this.dataset.title;
                        document.getElementById("modalDescription").textContent = this.dataset.description;
                        document.getElementById("modalImage").src = this.dataset.thumbnail;

                        newsModal.show();
                    });
                });
            });


            // Attach click event listener to all news items
            document.querySelectorAll(".clickable-news").forEach(item => {
                item.addEventListener("click", function () {
                    document.getElementById("articleNumber").textContent = this.dataset.id;
                    document.getElementById("modalTitle").textContent = this.dataset.title;
                    document.getElementById("modalDescription").textContent = this.dataset.description;
                    document.getElementById("modalImage").src = this.dataset.thumbnail;

                    newsModal.show();
                });
            });
        })
        .catch(error => {
            console.error("Error fetching news:", error.message);

            document.getElementById("newsContainer").innerHTML = `
                <div class="text-center text-white fs-4 py-5">
                    No news available at the moment. Stay tuned for updates!
                </div>
            `;

            document.getElementById("seeMoreNewsBtn").style.display = "none";
        });
});

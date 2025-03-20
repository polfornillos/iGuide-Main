function convertToEmbedUrl(url) {
    if (!url.includes("watch?v=")) return url; // Return if already an embed link
    const videoId = url.split("v=")[1]?.split("&")[0]; // Extract video ID
    return `https://www.youtube.com/embed/${videoId}`;
}

document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:5000/videos/active")
        .then(response => response.json())
        .then(data => {
            const videoContainer = document.getElementById("videoArchive");
            videoContainer.innerHTML = ""; // Clear previous content

            data.forEach((video, index) => {
                const embedUrl = convertToEmbedUrl(video.video_link);

                const videoRow = document.createElement("div");
                videoRow.className = "row justify-content-center align-items-center mb-4";
                
                // Alternate positioning (video left, then right)
                videoRow.innerHTML = `
                    <div class="col-md-8 ${index % 2 === 0 ? '' : 'order-md-2'}">
                        <div class="ratio ratio-16x9">
                            <iframe src="${embedUrl}" title="${video.title}" allowfullscreen></iframe>
                        </div>
                    </div>
                    <div class="col-md-4 text-start text-white ${index % 2 === 0 ? '' : 'order-md-1'}">
                        <h2 class="fw-bold">${video.title}</h2>
                        <div class="video-description mt-3">${video.description}</div>
                    </div>
                `;

                videoContainer.appendChild(videoRow);
            });
        })
        .catch(error => console.error("Error fetching videos:", error));
});

// Function to create HTML structure for videos
function createVideoHTML(videoArray) {
    return videoArray
        .map((video, index) => {
            const isEven = index % 2 === 0;
            return `
                <div class="row justify-content-center align-items-center my-4">
                    ${isEven ? `
                        <!-- Video -->
                        <div class="col-md-6">
                            <div class="ratio ratio-16x9">
                                <iframe src="${video.video_link}" title="YouTube Video" allowfullscreen></iframe>
                            </div>
                        </div>
                        <!-- Title & Description -->
                        <div class="col-md-6 text-start text-white">
                            <h2 class="fw-bold">${video.title}</h2>
                            <p class="mt-3">${video.description}</p>
                        </div>
                    ` : `
                        <!-- Title & Description -->
                        <div class="col-md-6 text-start text-white">
                            <h2 class="fw-bold">${video.title}</h2>
                            <p class="mt-3">${video.description}</p>
                        </div>
                        <!-- Video -->
                        <div class="col-md-6">
                            <div class="ratio ratio-16x9">
                                <iframe src="${video.video_url}" title="YouTube Video" allowfullscreen></iframe>
                            </div>
                        </div>
                    `}
                </div>
            `;
        })
        .join(""); // Convert array to string
}
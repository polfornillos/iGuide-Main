document.addEventListener("DOMContentLoaded", function () {
    const tourFrame = document.getElementById("tourFrame");
    const floorSelection = document.getElementById("floorSelection");
    const thumbnailsContainer = document.getElementById("thumbnailsContainer");
    const tourTitle = document.getElementById("tourTitle");
    const tourLocation = document.getElementById("tourLocation");
    const tourDescription = document.getElementById("tourDescription");

    // Data structure for floors and their locations
    const floorData = {
        "gf": [
            {
                "img": "image_assets/school_tour/GL.png",
                "name": "Gaming Lounge",
                "location": "Ground Floor",
                "description": "A gaming lounge in a school provides students with a space to unwind, socialize, and enjoy games in a structured and positive environment.",
                "url": "https://momento360.com/e/u/0f9460c3965b4dc5a518b21f26081931"
            },
            {
                "img": "image_assets/school_tour/CN.png",
                "name": "Clinic",
                "location": "Ground Floor",
                "description": "The school clinic offers first aid and medical assistance to students, ensuring their health and safety throughout the day.",
                "url": "https://momento360.com/e/u/6a8fcafbf9e04ed2a96ba1d33180e6f4"
            }
        ],
        "m": [
        {
            "img": "image_assets/school_tour/OS.png",
            "name": "Mezzanine",
            "location": "Mezzanine",
            "description": "A quiet and resourceful space for students to study, read, and collaborate on academic projects.",
            "url": "https://momento360.com/e/u/82fe4ece8ee848e19959c857de6f1d11"
        },
        {
            "img": "image_assets/school_tour/MZ.png",
            "name": "Office of Student Affairs and Services (OSAS)",
            "location": "Mezzanine",
            "description": "The Office of Student Affairs and Services (OSAS) supports student development by providing guidance, extracurricular engagement, and essential services for a well-rounded academic experience.",
            "url": "https://momento360.com/e/u/9e7ffc4997b345f59c166d3a86f3f187"
        }
        ],
        "5th": [
            {
                "img": "image_assets/school_tour/GAC.png",
                "name": "Grass Area Cafeteria",
                "location": "5th Floor",
                "description": "An open-air dining space where students can relax and enjoy meals while socializing with peers.",
                "url": "https://momento360.com/e/u/7744571dc0444e08a2a761f26fcad84f"
            },
            {
                "img": "image_assets/school_tour/TAC.png",
                "name": "Table Area Cafeteria",
                "location": "5th Floor",
                "description": "A spacious dining area with tables, perfect for group meals and study sessions over lunch.",
                "url": "https://momento360.com/e/u/d07d8a640ffc4c539d24958825adb965"
            }
        ],
        "6th": [
            {
                "img": "image_assets/school_tour/EC.png",
                "name": "Exterior Classroom",
                "location": "6th Floor",
                "description": "A well-ventilated classroom with large windows, offering a conducive learning environment with natural light.",
                "url": "https://momento360.com/e/u/02d4028d84ea40e18323b3d0ea63b6a6"
            },
            {
                "img": "image_assets/school_tour/IC.png",
                "name": "Interior Classroom",
                "location": "6th Floor",
                "description": "A modern classroom equipped with digital learning tools to enhance student engagement and participation.",
                "url": "https://momento360.com/e/u/eeecb5ea71ac4f4d9d84886fe0ae3eca"
            }
        ],
        "7th": [
            {
                "img": "image_assets/school_tour/SR.png",
                "name": "Sewing Room",
                "location": "7th Floor",
                "description": "A dedicated space for fashion and textile students to practice their sewing and design skills.",
                "url": "https://momento360.com/e/u/a120fc7d83c84f3c81d63bbfecba03e8"
            },
            {
                "img": "image_assets/school_tour/DR.png",
                "name": "Dance Room",
                "location": "7th Floor",
                "description": "A mirrored studio designed for dance practice, performances, and rehearsals.",
                "url": "https://momento360.com/e/u/2541a0c9cebf45c7bfb6f1a3c1df370d"
            },
            {
                "img": "image_assets/school_tour/LR.png",
                "name": "Lightbox Room",
                "location": "7th Floor",
                "description": "A specialized space for photography and design students to experiment with lighting techniques.",
                "url": "https://momento360.com/e/u/8b252e25f9f74370b810aedfebe341ed"
            },
            {
                "img": "image_assets/school_tour/GS.png",
                "name": "Green Screen Room",
                "location": "7th Floor",
                "description": "A professional studio setup for media production and digital content creation using green screen technology.",
                "url": "https://momento360.com/e/u/e0aa96edfa4b4bdb8b32ad9892594d6a"
            }
        ],
        "8th": [
            {
                "img": "image_assets/school_tour/CL.png",
                "name": "Computer Labs",
                "location": "8th Floor",
                "description": "State-of-the-art computer labs equipped with the latest technology to support programming, design, and digital media courses.",
                "url": "https://momento360.com/e/u/0cb64e2c99c548dcb5025012a24dfabc"
            },
            {
                "img": "image_assets/school_tour/SDR.png",
                "name": "Sound Room",
                "location": "8th Floor",
                "description": "A professional soundproofed space dedicated to audio production, music recording, and sound design projects.",
                "url": "https://momento360.com/e/u/df7023618ef24b45bc5ec159067b4647"
            }
        ],
        "9th": [
            {
                "img": "image_assets/school_tour/CL.png",
                "name": "Computer Labs",
                "location": "9th Floor",
                "description": "Modern computer labs offering advanced computing resources and high-speed internet for students.",
                "url": "https://momento360.com/e/u/0cb64e2c99c548dcb5025012a24dfabc"
            }
        ],
        "10th": [
            {
                "img": "image_assets/school_tour/CL.png",
                "name": "Computer Labs",
                "location": "10th Floor",
                "description": "Fully-equipped computer labs for software development, game design, and digital art students.",
                "url": "https://momento360.com/e/u/0cb64e2c99c548dcb5025012a24dfabc"
            }
        ],
        "12th": [
            {
                "img": "image_assets/school_tour/AD.png",
                "name": "Auditorium",
                "location": "12th Floor",
                "description": "A spacious auditorium designed for school events, performances, and guest lectures, providing an immersive experience for audiences.",
                "url": "https://momento360.com/e/u/e33a4ff89df144e7b70e07ef61c3160b"
            },
            {
                "img": "image_assets/school_tour/GR.png",
                "name": "Gallery Room",
                "location": "12th Floor",
                "description": "An elegant exhibition space showcasing student artwork, projects, and other creative displays.",
                "url": "https://momento360.com/e/u/cf90748b2f9643daa5789e232c209333"
            }
        ],
        "LP": [
            {
                "img": "image_assets/school_tour/BC.png",
                "name": "Basketball Court",
                "location": "Lower Penthouse",
                "description": "A full-sized basketball court where students can practice, compete, and engage in recreational activities.",
                "url": "https://momento360.com/e/u/5900de9e76ac4b0aa0111905059ae72a"
            }
        ],
        "UP": [
            {
                "img": "image_assets/school_tour/TF.png",
                "name": "Track & Field",
                "location": "Upper Penthouse",
                "description": "An outdoor track and field area designed for running, training, and various athletic events.",
                "url": "https://momento360.com/e/u/31b2d082abab42fdb10c290a59424d40"
            },
            {
                "img": "image_assets/school_tour/L.png",
                "name": "Library",
                "location": "Upper Penthouse",
                "description": "A well-stocked library providing students with academic resources, study areas, and digital research materials.",
                "url": "https://momento360.com/e/u/c15cd14fa2024b95b0d483bfbce98aab"
            }
        ]
    };

    // Function to update thumbnails based on selected floor
    function updateThumbnails(floor) {
        const locations = floorData[floor] || [];
        thumbnailsContainer.innerHTML = ""; // Clear previous thumbnails

        locations.forEach((location, index) => {
            const div = document.createElement("div");
            div.className = "col-3";

            const img = document.createElement("img");
            img.src = location.img;
            img.alt = location.name;
            img.className = "img-fluid rounded clickable-thumbnail";
            img.dataset.url = location.url;
            img.dataset.name = location.name;
            img.dataset.location = location.location;
            img.dataset.description = location.description;

            div.appendChild(img);
            thumbnailsContainer.appendChild(div);

            // Add click event to new thumbnails
            img.addEventListener("click", function () {
                tourFrame.src = this.dataset.url;
                updateTourDetails(this);
                animateThumbnail(this);
            });

            // Apply opacity dimming on load
            img.style.opacity = index === 0 ? "1" : "0.5";
        });

        // Auto-select the first location on the floor if available
        if (locations.length > 0) {
            const firstThumbnail = thumbnailsContainer.querySelector(".clickable-thumbnail");
            tourFrame.src = locations[0].url;
            updateTourDetails(firstThumbnail);
            animateThumbnail(firstThumbnail);
        }
    }

    // Function to update title, location, and description
    function updateTourDetails(thumbnail) {
        if (thumbnail) {
            tourTitle.textContent = thumbnail.dataset.name;
            tourLocation.textContent = `LOCATION: ${thumbnail.dataset.location}`;
            tourDescription.textContent = thumbnail.dataset.description;
        }
    }

    // Function to animate thumbnail click
    function animateThumbnail(selectedThumbnail) {
        const thumbnails = document.querySelectorAll(".clickable-thumbnail");

        thumbnails.forEach(thumbnail => {
            if (thumbnail === selectedThumbnail) {
                thumbnail.style.opacity = "1";
                thumbnail.style.transform = "scale(1.1)";
                setTimeout(() => thumbnail.style.transform = "scale(1)", 300);
            } else {
                thumbnail.style.opacity = "0.5";
            }
        });
    }

    // Function to update active floor styling
    function updateActiveFloor() {
        document.querySelectorAll("#floorSelection label").forEach(label => {
            label.classList.remove("text-soc");
        });

        const selectedRadio = document.querySelector("#floorSelection input[name='floor']:checked");
        if (selectedRadio) {
            const selectedLabel = selectedRadio.parentElement;
            selectedLabel.classList.add("text-soc");
        }
    }

    // Event listener for floor selection
    floorSelection.addEventListener("change", function (event) {
        updateThumbnails(event.target.value);
        updateActiveFloor();
    });

    // Initialize with default floor (Ground Floor)
    updateThumbnails("gf");
    updateActiveFloor();
});

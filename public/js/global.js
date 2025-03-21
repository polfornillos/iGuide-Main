// Function to support dropdown menu for our programs
document.addEventListener("DOMContentLoaded", function () {
    let dropdown = document.querySelector(".dropdown");
    let dropdownToggle = document.querySelector(".dropdown-toggle");
    let dropdownMenu = document.querySelector(".dropdown-menu");

    function isMobile() {
        return window.innerWidth < 992; // Bootstrap lg breakpoint
    }

    dropdownToggle.addEventListener("click", function (e) {
        if (isMobile()) {
            e.preventDefault();
            dropdownMenu.classList.toggle("show");
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (e) {
        if (isMobile() && !dropdown.contains(e.target)) {
            dropdownMenu.classList.remove("show");
        }
    });

    // Ensure it closes when toggler is clicked again
    document.querySelector(".navbar-toggler").addEventListener("click", function () {
        dropdownMenu.classList.remove("show");
    });
});

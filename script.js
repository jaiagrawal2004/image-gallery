// ===============================
// Select Elements
// ===============================

const filterButtons = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".card");
const searchInput = document.getElementById("searchInput");

const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.querySelector(".close");

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

const downloadBtn = document.getElementById("downloadBtn");

const themeBtn = document.getElementById("themeBtn");

let currentIndex = 0;
let imageArray = [];

// ===============================
// Store all images
// ===============================

cards.forEach(card => {
    imageArray.push(card.querySelector("img"));
});

// ===============================
// Category Filter
// ===============================

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        document
            .querySelector(".filter.active")
            .classList.remove("active");

        button.classList.add("active");

        const filter = button.dataset.filter;

        cards.forEach(card => {

            if (
                filter === "all" ||
                card.classList.contains(filter)
            ) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    });

});

// ===============================
// Search Images
// ===============================

searchInput.addEventListener("keyup", () => {

    const value = searchInput.value.toLowerCase();

    cards.forEach(card => {

        const name = card.dataset.name.toLowerCase();

        if (name.includes(value)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

});

// ===============================
// Open Lightbox
// ===============================

cards.forEach((card, index) => {

    card.addEventListener("click", () => {

        currentIndex = index;

        showImage();

        lightbox.style.display = "flex";

    });

});

// ===============================
// Show Image
// ===============================

function showImage() {

    const img = imageArray[currentIndex];

    lightboxImg.src = img.src;

    downloadBtn.href = img.src;

}

// ===============================
// Next Button
// ===============================

nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= imageArray.length) {
        currentIndex = 0;
    }

    showImage();

});

// ===============================
// Previous Button
// ===============================

prevBtn.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = imageArray.length - 1;
    }

    showImage();

});

// ===============================
// Close Lightbox
// ===============================

closeBtn.addEventListener("click", () => {

    lightbox.style.display = "none";

});

// ===============================
// Close by clicking outside image
// ===============================

lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {
        lightbox.style.display = "none";
    }

});

// ===============================
// Keyboard Controls
// ===============================

document.addEventListener("keydown", (e) => {

    if (lightbox.style.display === "flex") {

        if (e.key === "ArrowRight") {

            currentIndex++;

            if (currentIndex >= imageArray.length) {
                currentIndex = 0;
            }

            showImage();
        }

        if (e.key === "ArrowLeft") {

            currentIndex--;

            if (currentIndex < 0) {
                currentIndex = imageArray.length - 1;
            }

            showImage();
        }

        if (e.key === "Escape") {

            lightbox.style.display = "none";

        }
    }

});

// ===============================
// Dark / Light Mode
// ===============================

if (localStorage.getItem("theme") === "light") {

    document.body.classList.add("light");

    themeBtn.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {

        localStorage.setItem("theme", "light");

        themeBtn.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    } else {

        localStorage.setItem("theme", "dark");

        themeBtn.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

    }

});

// ===============================
// Smooth Animation on Scroll
// ===============================

window.addEventListener("scroll", () => {

    cards.forEach(card => {

        const top = card.getBoundingClientRect().top;

        if (top < window.innerHeight - 100) {

            card.style.opacity = "1";
            card.style.transform = "translateY(0)";

        }

    });

});

// Initial State

cards.forEach(card => {

    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "0.6s";

});
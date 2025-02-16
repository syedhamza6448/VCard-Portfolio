const showContacts = document.getElementById("showContacts");
const contactInfo = document.getElementById("contactInfo");
const allDetails = document.getElementById("allDetails");

function toggleContactInfo() {
    if (window.innerWidth <= 800) {
        if (contactInfo.style.maxHeight === "0px") {
            contactInfo.style.maxHeight = "500px";
            contactInfo.style.opacity = "1";
            showContacts.textContent = "^";
            allDetails.style.top = "650px";
        } else {
            contactInfo.style.maxHeight = "0px";
            contactInfo.style.opacity = "0";
            showContacts.textContent = ">";
            showContacts.style.transform = "rotate(deg)";
            allDetails.style.top = "210px";
        }
    } else if (window.innerWidth <= 1000) {
        if (contactInfo.style.maxHeight === "0px") {
            contactInfo.style.maxHeight = "500px";
            contactInfo.style.opacity = "1";
            showContacts.textContent = "Hide Contacts";
            allDetails.style.top = "550px";
        } else {
            contactInfo.style.maxHeight = "0px";
            contactInfo.style.opacity = "0";
            showContacts.textContent = "Show Contacts";
            allDetails.style.top = "250px";
        }
    } else {
        allDetails.style.top = "30px";
        contactInfo.style.maxHeight = "none";
        showContacts.style.display = "none";
    }
}

toggleContactInfo();
window.addEventListener('resize', toggleContactInfo);

function handleNavClick() {
    const mainSections = document.querySelectorAll('main');
    const navLinks = document.querySelectorAll('.all-details-nav ul li, .bottom-nav ul li');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const sectionName = link.textContent.toLowerCase();

            mainSections.forEach(section => {
                if (section.classList.contains(sectionName)) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });

            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

function initializeSections() {
    const mainSections = document.querySelectorAll('main');
    const navLinks = document.querySelectorAll('.all-details-nav ul li, .bottom-nav ul li');

    mainSections.forEach(section => {
        if (section.classList.contains('about')) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });

    navLinks.forEach(nav => {
        if (nav.textContent.toLowerCase() === 'about') {
            nav.classList.add('active');
        } else {
            nav.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeSections();
    handleNavClick();
});

function filterProjects(category) {
    const projectLinks = document.querySelectorAll('.projects-section a');

    projectLinks.forEach(link => {
        const projectCategory = link.querySelector('b').textContent.trim();

        if (category === 'All' || projectCategory === category) {
            link.style.display = 'block';
        } else {
            link.style.display = 'none';
        }
    });
}

function handleNavFilter() {
    const navItems = document.querySelectorAll('.projects-nav li');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const category = item.textContent.trim();

            filterProjects(category);

            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });
}

function handleDropdownFilter() {
    const selectCategory = document.getElementById('selectCategory');

    selectCategory.addEventListener('change', () => {
        const category = selectCategory.value;

        filterProjects(category);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    handleNavFilter();
    handleDropdownFilter();
});

const form = document.getElementById('contactForm');
const inputs = form.querySelectorAll('input, textarea');
const submitButton = document.getElementById('submitButton');

const patterns = {
    name: /^[a-zA-Z\s]{3,50}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: /^.{10,500}$/
};

function validateInput(input) {
    const pattern = patterns[input.name];
    const isValid = pattern.test(input.value.trim());

    if (isValid) {
        input.classList.add('valid');
        input.classList.remove('invalid');
    } else {
        input.classList.add('invalid');
        input.classList.remove('valid');
    }

    return isValid;
}

function checkFormValidity() {
    const allValid = Array.from(inputs).every(input => validateInput(input));
    if (allValid) {
        submitButton.classList.add('enabled');
        submitButton.style.pointerEvents = 'auto';
    } else {
        submitButton.classList.remove('enabled');
        submitButton.style.pointerEvents = 'none';
    }
}

inputs.forEach(input => {
    input.addEventListener('input', () => {
        validateInput(input);
        checkFormValidity();
    });

    input.addEventListener('focus', () => validateInput(input));
    input.addEventListener('blur', () => validateInput(input));
});

form.addEventListener('submit', event => {
    if (!Array.from(inputs).every(input => validateInput(input))) {
        event.preventDefault();
    }
});



let currentIndex = 0;
const image = document.querySelectorAll('.profile .profile-img');
const circles = document.querySelectorAll('.slider-controls .circle');
const autoChangeInterval = 10000;

function updateSlider(index) {
    image.forEach((img, i) => {
        img.classList.toggle('hidden', i !== index);
    });
    circles.forEach((circle, i) => {
        circle.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlider(currentIndex);
}

circles.forEach((circle, index) => {
    circle.addEventListener('click', () => {
        currentIndex = index;
        updateSlider(currentIndex);
    });
});

let autoChange = setInterval(nextSlide, autoChangeInterval);

let startX = 0;

document.querySelector('figure').addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

document.querySelector('figure').addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    if (endX < startX - 50) {
        nextSlide();
    } else if (endX > startX + 50) {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateSlider(currentIndex);
    }
});


const galleryContainer = document.querySelector(".gallery-container")
const fullscreenPreview = document.getElementById("fullscreen-preview")
const previewImage = document.getElementById("preview-image")
const closePreview = document.getElementById("close-preview")
const prevImage = document.getElementById("prev-image")
const nextImage = document.getElementById("next-image")

// Sample photo URLs (replace with your own photos)
const photos = [
    "Assets/images/me.png",
    "Assets/images/me-2.png",
    "Assets/images/me-3.png",
    "Assets/images/me-4.png",
    "Assets/images/me-5.png",
    "Assets/images/me-6.png",
    "Assets/images/me-7.png",
    "Assets/images/me-8.png",
    "Assets/images/me-9.png",
    "Assets/images/me-10.png",
    "Assets/images/me-11.png",
]

let currentImageIndex = 0

// Function to create gallery items
function createGalleryItem(photoUrl, index) {
    const item = document.createElement("div")
    item.className = "gallery-item"

    const img = document.createElement("img")
    img.src = photoUrl
    img.alt = "Gallery image"
    img.loading = "lazy" // Enable lazy loading for better performance

    // Add click event listener to show full-screen preview
    img.addEventListener("click", () => {
        showFullscreenPreview(index)
    })

    item.appendChild(img)
    return item
}

// Function to show full-screen preview
function showFullscreenPreview(index) {
    currentImageIndex = index
    previewImage.src = photos[index]
    fullscreenPreview.style.display = "flex"
}

// Function to close full-screen preview
function closeFullscreenPreview() {
    fullscreenPreview.style.display = "none"
}

// Function to show next image
function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % photos.length
    previewImage.src = photos[currentImageIndex]
}

// Function to show previous image
function showPreviousImage() {
    currentImageIndex = (currentImageIndex - 1 + photos.length) % photos.length
    previewImage.src = photos[currentImageIndex]
}

// Populate the gallery
photos.forEach((photoUrl, index) => {
    const item = createGalleryItem(photoUrl, index)
    galleryContainer.appendChild(item)
})

// Event listeners for full-screen preview controls
closePreview.addEventListener("click", closeFullscreenPreview)
nextImage.addEventListener("click", showNextImage)
prevImage.addEventListener("click", showPreviousImage)

// Close preview when clicking outside the image
fullscreenPreview.addEventListener("click", (e) => {
    if (e.target === fullscreenPreview) {
        closeFullscreenPreview()
    }
})

// Keyboard navigation
document.addEventListener("keydown", (e) => {
    if (fullscreenPreview.style.display === "flex") {
        if (e.key === "ArrowRight") {
            showNextImage()
        } else if (e.key === "ArrowLeft") {
            showPreviousImage()
        } else if (e.key === "Escape") {
            closeFullscreenPreview()
        }
    }
})
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


// Function to handle navigation clicks
// Function to handle navigation clicks
function handleNavClick() {
    // Select all main sections and navigation links
    const mainSections = document.querySelectorAll('main');
    const navLinks = document.querySelectorAll('.all-details-nav ul li, .bottom-nav ul li');

    // Add click event to all navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Get the section name from the clicked link's text
            const sectionName = link.textContent.toLowerCase();

            // Show the corresponding section and hide others
            mainSections.forEach(section => {
                if (section.classList.contains(sectionName)) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });

            // Add "active" class to the clicked link and remove from others
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

// Function to initialize visibility of sections and active effect
function initializeSections() {
    const mainSections = document.querySelectorAll('main');
    const navLinks = document.querySelectorAll('.all-details-nav ul li, .bottom-nav ul li');

    // Show only the "about" section initially
    mainSections.forEach(section => {
        if (section.classList.contains('contact')) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });

    // Set "active" class for "About" in both nav menus initially
    navLinks.forEach(nav => {
        if (nav.textContent.toLowerCase() === 'about') {
            nav.classList.add('active');
        } else {
            nav.classList.remove('active');
        }
    });
}

// Call the functions when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeSections();
    handleNavClick();
});


// Function to display projects based on the selected category
function filterProjects(category) {
    const projectLinks = document.querySelectorAll('.projects-section a');
    
    projectLinks.forEach(link => {
        const projectCategory = link.querySelector('b').textContent.trim();

        if (category === 'All' || projectCategory === category) {
            link.style.display = 'block'; // Show matching projects
        } else {
            link.style.display = 'none'; // Hide non-matching projects
        }
    });
}

// Event listeners for the navigation items
function handleNavFilter() {
    const navItems = document.querySelectorAll('.projects-nav li');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Get the selected category
            const category = item.textContent.trim();

            // Filter projects
            filterProjects(category);

            // Update active state
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });
}

// Event listener for the dropdown
function handleDropdownFilter() {
    const selectCategory = document.getElementById('selectCategory');
    
    selectCategory.addEventListener('change', () => {
        // Get the selected category
        const category = selectCategory.value;

        // Filter projects
        filterProjects(category);
    });
}

// Initialize functionality on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    filterProjects('All'); // Show all projects initially
    handleNavFilter();
    handleDropdownFilter();
});

// Select form and elements
const form = document.getElementById('contactForm');
const inputs = form.querySelectorAll('input, textarea');
const submitButton = document.getElementById('submitButton');

// Validation patterns
const patterns = {
    name: /^[a-zA-Z\s]{3,50}$/, // Letters and spaces, 3-50 characters
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Valid email format
    message: /^.{10,500}$/ // Between 10 and 500 characters
};

// Function to validate individual input
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

// Check form validity and toggle the submit button
function checkFormValidity() {
    const allValid = Array.from(inputs).every(input => validateInput(input));
    if (allValid) {
        submitButton.classList.add('enabled');
        submitButton.style.pointerEvents = 'auto'; // Enable button
    } else {
        submitButton.classList.remove('enabled');
        submitButton.style.pointerEvents = 'none'; // Disable button
    }
}

// Add event listeners to inputs for validation
inputs.forEach(input => {
    input.addEventListener('input', () => {
        validateInput(input);
        checkFormValidity();
    });

    // Ensure validation styling is applied even on focus/blur
    input.addEventListener('focus', () => validateInput(input));
    input.addEventListener('blur', () => validateInput(input));
});

// Prevent submission if form is invalid
form.addEventListener('submit', event => {
    if (!Array.from(inputs).every(input => validateInput(input))) {
        event.preventDefault(); // Block form submission
    }
});
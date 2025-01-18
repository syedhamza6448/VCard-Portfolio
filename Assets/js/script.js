const showContacts = document.getElementById("showContacts");
const contactInfo = document.getElementById("contactInfo");
const allDetails = document.getElementById("allDetails");

function toggleContactInfo() {
    if (window.innerWidth <= 800) {
        if (contactInfo.style.maxHeight === "0px" || contactInfo.style.maxHeight === "") {
            contactInfo.style.maxHeight = "500px";
            contactInfo.style.opacity = "1";
            showContacts.textContent = "Hide Contacts";
            allDetails.style.top = "650px";
        } else {
            contactInfo.style.maxHeight = "0px";
            contactInfo.style.opacity = "0";
            showContacts.textContent = "Show Contacts";
            allDetails.style.top = "210px";
        }
    } else if (window.innerWidth <= 1000) {
        if (contactInfo.style.maxHeight === "0px" || contactInfo.style.maxHeight === "") {
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
// Profile Picture and Dropdown Menu Logic
const profilePic = document.getElementById('profile-pic');
const dropdownMenu = document.getElementById('dropdown-menu');
const defaultProfilePic = 'me.jpg'; // Path to the default profile picture

// Set default profile picture on page load
if (localStorage.getItem('profilePic')) {
    profilePic.src = localStorage.getItem('profilePic');
} else {
    profilePic.src = defaultProfilePic;
}

profilePic.addEventListener('click', () => {
    dropdownMenu.classList.toggle('visible');
});

// Single window event listener to handle outside clicks
window.addEventListener('click', (event) => {
    // Close dropdown if clicking outside
    if (!event.target.closest('.profile-container')) {
        dropdownMenu.classList.remove('visible');
    }

    // Close modal if clicked outside
    if (event.target === profileModal) {
        profileModal.style.display = 'none';
    }

    // Close settings modal if clicked outside
    if (event.target === settingsModal) {
        settingsModal.style.display = 'none';
    }
});

// Profile Modal Functionality
const profileModal = document.getElementById('profile-modal');
const profileBtn = document.getElementById('profile-btn');
const closeProfileModal = document.getElementById('close-profile-modal');
const profileSaveBtn = document.getElementById('profile-save-btn');
const profilePicUpload = document.getElementById('profile-pic-upload');

let uploadedProfilePic = null;

// Show Profile Modal
profileBtn.addEventListener('click', () => {
    profileModal.style.display = 'flex';
    dropdownMenu.classList.remove('visible');
});

// Close Profile Modal
closeProfileModal.addEventListener('click', () => {
    profileModal.style.display = 'none';
});

// Save Profile Picture
profileSaveBtn.addEventListener('click', () => {
    if (uploadedProfilePic) {
        profilePic.src = uploadedProfilePic;
        localStorage.setItem('profilePic', uploadedProfilePic); // Store the updated profile picture in localStorage
        alert('Profile picture updated successfully!');
    } else {
        alert('No new profile picture selected. Keeping the current one.');
    }
    profileModal.style.display = 'none';
});

// Handle image upload
profilePicUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please upload a valid image file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            uploadedProfilePic = e.target.result; // Store the uploaded image data
        };
        reader.readAsDataURL(file);
    }
});

// Logout Functionality
const logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', () => {
    alert('Logged out successfully!'); // Alert before redirection

    // Close any open modals (if applicable)
    profileModal.style.display = 'none'; // Close the profile modal if it's open

    // Remove profile picture from localStorage when logging out
    localStorage.removeItem('profilePic');

    // Redirect to index.html (not login.html)
    window.location.href = 'index.html'; // Ensure this file exists
});

// Settings Modal Functionality
const settingsModal = document.getElementById('settings-modal');
const settingsBtn = document.getElementById('settings-btn');
const closeSettingsModal = document.getElementById('close-settings-modal');
const settingsSaveBtn = document.getElementById('settings-save-btn');

// Open Settings Modal
settingsBtn.addEventListener('click', () => {
    settingsModal.style.display = 'flex';
});

// Close Settings Modal
closeSettingsModal.addEventListener('click', () => {
    settingsModal.style.display = 'none';
});

// Save Settings (Validate password change)
settingsSaveBtn.addEventListener('click', () => {
    const oldPassword = document.getElementById('old-password').value;
    const newPassword = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Example validation (you can expand this as per your requirement)
    if (newPassword !== confirmPassword) {
        alert('New passwords do not match!');
    } else if (oldPassword === "") {
        alert('Please enter your old password!');
    } else {
        // Handle save (you can send data to the server, update local storage, etc.)
        alert('Settings saved successfully!');
        settingsModal.style.display = 'none';
    }
});

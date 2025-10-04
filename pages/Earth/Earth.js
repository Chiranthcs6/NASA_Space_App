/**
 * Earth page specific functionality
 * Optimized for performance and maintainability
 */

// Character navigation mapping for better maintainability
const characterRoutes = {
    grandpa: '../Grandpa/Grandpa.html',
    skywave: '../Captian/Captian.html',
    professor: '../ProfessorClass/ProfessorClass.html',
    kiran: '../Kiran/Kiran.html'
};

/**
 * Navigate back to Sun page
 */
function goBackToSun() {
    navigateToPage('../Sun/Sun.html');
}

/**
 * Follow a specific character with optimized routing
 * @param {string} character - Character name to follow
 */
function followCharacter(character) {
    console.log('Following character:', character);
    
    // Validate input
    if (!character || typeof character !== 'string') {
        console.error('Invalid character parameter:', character);
        alert('Please choose a valid character to follow!');
        return;
    }
    
    // Get route from mapping
    const route = characterRoutes[character.toLowerCase()];
    
    if (!route) {
        console.error('Unknown character:', character);
        alert('Choose a character to follow!');
        return;
    }
    
    // Navigate with error handling
    try {
        console.log(`Navigating to ${character} page:`, route);
        navigateToPage(route);
    } catch (error) {
        console.error('Navigation error for character:', character, error);
        alert(`Error: Could not navigate to ${character} page. Please try again.`);
    }
}

/**
 * Initialize Earth page with proper error handling
 */
document.addEventListener('DOMContentLoaded', function() {
    try {
        console.log('Earth page loaded');
        setProgress(100);
    } catch (error) {
        console.error('Earth page initialization error:', error);
    }
});

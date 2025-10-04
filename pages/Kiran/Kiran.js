/**
 * Kiran page specific functionality
 * Optimized for performance and maintainability
 */

/**
 * Navigate back to Earth page
 */
function goBackToEarth() {
    navigateToPage('../Earth/Earth.html');
}

/**
 * Navigate to SpaceDemo page to help Kiran
 */
function helpKiran() {
    navigateToPage('SpaceDemo.html');
}

/**
 * Initialize Kiran page with proper error handling
 */
document.addEventListener('DOMContentLoaded', function() {
    try {
        setProgress(100);
    } catch (error) {
        console.error('Kiran page initialization error:', error);
    }
});

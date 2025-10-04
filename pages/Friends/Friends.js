/**
 * Friends page specific functionality
 * Optimized for performance and maintainability
 */

/**
 * Navigate to family page with error handling
 */
function navigateToFamily() {
    navigateToPage('../Family/Family.html');
}

/**
 * Navigate to sun page with error handling
 */
function navigateToSun() {
    navigateToPage('../Sun/Sun.html');
}

/**
 * Initialize friends page with proper error handling
 */
document.addEventListener('DOMContentLoaded', function() {
    try {
        setProgress(100);
    } catch (error) {
        console.error('Friends page initialization error:', error);
    }
});

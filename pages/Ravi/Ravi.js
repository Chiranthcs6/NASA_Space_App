/**
 * Ravi page specific functionality
 * Optimized for performance and maintainability
 */

/**
 * Navigate to family page with error handling
 */
function continueStory() {
    navigateToPage('../Family/Family.html');
}

/**
 * Initialize Ravi page with proper error handling
 */
document.addEventListener('DOMContentLoaded', function() {
    try {
        setProgress(25);
    } catch (error) {
        console.error('Ravi page initialization error:', error);
    }
});

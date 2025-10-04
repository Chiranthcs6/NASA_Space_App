/**
 * Family page specific functionality
 * Optimized for performance and maintainability
 */

/**
 * Navigate to friends page with error handling
 */
function navigateToFriends() {
    navigateToPage('../Friends/Friends.html');
}

/**
 * Initialize family page with proper error handling
 */
document.addEventListener('DOMContentLoaded', function() {
    try {
        setProgress(63);
    } catch (error) {
        console.error('Family page initialization error:', error);
    }
});

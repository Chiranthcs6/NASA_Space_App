/**
 * Sun page specific functionality
 * Optimized for performance and maintainability
 */

// Cache DOM elements for better performance
const domElements = {
    sun: null,
    cloud: null,
    flare: null,
    btn: null,
    result: null,
    nextBtn: null,
    
    /**
     * Get DOM elements with caching
     */
    getElements() {
        if (!this.sun) {
            this.sun = document.getElementById("sunFace");
            this.cloud = document.getElementById("sneezeCloud");
            this.flare = document.getElementById("flareBlast");
            this.btn = document.getElementById("sneezeBtn");
            this.result = document.getElementById("sneezeResult");
            this.nextBtn = document.getElementById("nextEarthBtn");
        }
        return {
            sun: this.sun,
            cloud: this.cloud,
            flare: this.flare,
            btn: this.btn,
            result: this.result,
            nextBtn: this.nextBtn
        };
    }
};

/**
 * Navigate to friends page with error handling
 */
function navigateToFriends() {
    navigateToPage('../Friends/Friends.html');
}

/**
 * Animation for Sunny's Sneeze with optimized timing and error handling
 */
function doSunSneeze() {
    const elements = domElements.getElements();
    
    // Validate elements exist
    if (!elements.sun || !elements.cloud || !elements.flare || !elements.btn) {
        console.error('Required animation elements not found');
        return;
    }
    
    // Disable button to prevent multiple clicks
    elements.btn.disabled = true;
    elements.btn.style.opacity = "0.65";
    
    // Trigger sun shake animation
    elements.sun.style.animation = "none";
    // Force reflow to ensure animation reset
    void elements.sun.offsetWidth;
    elements.sun.style.animation = "sunShakeAnim 0.55s";
    
    // Start sneeze sequence
    setTimeout(() => {
        // Resume normal sun animation
        elements.sun.style.animation = "sunshinePulse 1.9s infinite alternate";
        
        // Activate sneeze effects
        elements.cloud.classList.add('active');
        elements.flare.classList.add('active');
        
        // Clean up effects and show results
        setTimeout(() => {
            elements.cloud.classList.remove('active');
            elements.flare.classList.remove('active');
            
            if (elements.result) {
                elements.result.style.display = "block";
            }
            if (elements.nextBtn) {
                elements.nextBtn.style.display = "block";
            }
        }, 1300);
    }, 400);
}

/**
 * Navigate to Earth effects page
 */
function showEffects() {
    navigateToPage('../Earth/Earth.html');
}

/**
 * Initialize sun page with proper error handling
 */
document.addEventListener('DOMContentLoaded', function() {
    try {
        setProgress(100);
    } catch (error) {
        console.error('Sun page initialization error:', error);
    }
});

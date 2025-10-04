/**
 * Captain Skywave page specific functionality
 * Optimized for performance and maintainability
 */

// Modal configuration constants
const LANDING_MODAL_CONFIG = {
    background: 'linear-gradient(to bottom, #87CEEB 0%, #98FB98 100%)',
    boxBackground: 'rgba(255,255,255,0.95)',
    boxBorder: '3px solid #1E90FF',
    boxShadow: '0 0 30px rgba(30,144,255,0.5)',
    zIndex: 1000
};

/**
 * Navigate back to Earth page
 */
function goBackToEarth() {
    navigateToPage('../Earth/Earth.html');
}

/**
 * Continue adventure with confirmation dialog
 */
function continueAdventure() {
    if (confirm('🌍 Ready to check on other family members?\n\nSee how the solar flare affects Grandpa, Professor Pixel, or Kiran!')) {
        navigateToPage('../Earth/Earth.html');
    }
}

/**
 * Create emergency landing modal with optimized styling
 */
function createLandingModal() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: ${LANDING_MODAL_CONFIG.background};
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: ${LANDING_MODAL_CONFIG.zIndex};
    `;
    
    const landingBox = document.createElement('div');
    landingBox.style.cssText = `
        background: ${LANDING_MODAL_CONFIG.boxBackground};
        border: ${LANDING_MODAL_CONFIG.boxBorder};
        color: #333;
        padding: 40px 50px;
        border-radius: 24px;
        box-shadow: ${LANDING_MODAL_CONFIG.boxShadow};
        font-size: 1.3em;
        text-align: center;
        max-width: 600px;
    `;
    
    landingBox.innerHTML = `
        <div style="font-size: 3em; margin-bottom: 15px;">✈️</div>
        <h2 style="color: #1E90FF; margin-bottom: 20px;">Emergency Landing in Progress...</h2>
        <p>Captain Skywave switches to manual navigation using:</p>
        <ul style="text-align: left; margin: 20px 0; font-size: 1.1em;">
            <li>🧭 Magnetic compass for direction</li>
            <li>👁️ Visual landmarks on the ground</li>
            <li>📻 Emergency radio frequencies</li>
            <li>🛫 Years of flying experience</li>
        </ul>
        <div style="color: #228B22; font-weight: bold; margin: 20px 0;">
            ✅ SUCCESSFUL LANDING!
        </div>
        <p style="font-style: italic; color: #666;">
            "Sometimes the best technology is a skilled pilot's experience and training!"<br>
            - Captain Skywave
        </p>
        <button id="closeLandingBtn" style="margin-top:20px; padding:12px 30px; background:#1E90FF; color:white; border:none; border-radius:20px; cursor:pointer; font-weight:bold; font-size:1.1em;">Continue</button>
    `;
    
    modal.appendChild(landingBox);
    document.body.appendChild(modal);
    
    // Add event listener with proper cleanup
    const closeBtn = landingBox.querySelector('#closeLandingBtn');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    return modal;
}

/**
 * Watch emergency landing simulation
 */
function watchLanding() {
    createLandingModal();
}

/**
 * Initialize Captain Skywave page with proper error handling
 */
document.addEventListener('DOMContentLoaded', function() {
    try {
        setProgress(100);
    } catch (error) {
        console.error('Captain Skywave page initialization error:', error);
    }
});

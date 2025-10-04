/**
 * Grandpa page specific functionality
 * Optimized for performance and maintainability
 */

// Configuration constants
const STAR_CONFIG = {
    count: 33,
    minSize: 1.5,
    maxSize: 4.0,
    minDuration: 1,
    maxDuration: 3,
    maxTop: 95,
    maxLeft: 98
};

const MODAL_CONFIG = {
    background: 'rgba(246, 65, 108, 0.65)',
    boxBackground: '#1a237e',
    boxBorder: '2px solid #ffd600',
    boxShadow: '0 2px 12px 2px #f500574a',
    animationDelay: 1800
};

/**
 * Navigate back to Earth page
 */
function goBackToEarth() {
    navigateToPage('../Earth/Earth.html');
}

/**
 * Create twinkling stars with optimized DOM manipulation
 */
function createStars() {
    const fragment = document.createDocumentFragment();
    
    for (let i = 0; i < STAR_CONFIG.count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Set random properties
        const size = Math.random() * (STAR_CONFIG.maxSize - STAR_CONFIG.minSize) + STAR_CONFIG.minSize;
        const duration = Math.random() * (STAR_CONFIG.maxDuration - STAR_CONFIG.minDuration) + STAR_CONFIG.minDuration;
        
        star.style.cssText = `
            top: ${Math.random() * STAR_CONFIG.maxTop}vh;
            left: ${Math.random() * STAR_CONFIG.maxLeft}vw;
            width: ${size}px;
            height: ${size}px;
            animation-duration: ${duration}s;
        `;
        
        fragment.appendChild(star);
    }
    
    document.body.appendChild(fragment);
}

/**
 * Create modal with optimized styling and event handling
 */
function createModal() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: ${MODAL_CONFIG.background};
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
    `;
    
    const box = document.createElement('div');
    box.style.cssText = `
        background: ${MODAL_CONFIG.boxBackground};
        border: ${MODAL_CONFIG.boxBorder};
        color: #fff;
        padding: 40px 50px;
        border-radius: 24px;
        box-shadow: ${MODAL_CONFIG.boxShadow};
        font-size: 1.23em;
        text-align: center;
    `;
    box.innerHTML = "<strong>Fixing GPS signals…</strong><br><br>Solar flare effects detected!<br>Attempting error correction…";
    
    modal.appendChild(box);
    document.body.appendChild(modal);
    
    return { modal, box };
}

/**
 * Handle GPS fixing simulation with optimized modal management
 */
function fixGPS() {
    const { modal, box } = createModal();
    
    setTimeout(() => {
        box.innerHTML = `
            <strong>GPS signals stabilized!</strong><br><br>
            Grandfather Orbit can now plant straight rows.<br>
            Keep an eye on space weather!<br><br>
            <div style="display: flex; gap: 10px; justify-content: center; margin-top: 20px;">
                <button id="viewAnimationBtn" style="padding:10px 20px; background:#ff6b35; color:white; border:none; border-radius:20px; cursor:pointer; font-weight:bold;">📺 Watch Animation</button>
                <button id="continueStoryBtn" style="padding:10px 20px; background:#ffd600; color:#1a237e; border:none; border-radius:20px; cursor:pointer; font-weight:bold;">Continue Adventure</button>
            </div>
        `;
        
        // Add event listeners with proper cleanup
        const viewBtn = box.querySelector('#viewAnimationBtn');
        const continueBtn = box.querySelector('#continueStoryBtn');
        
        viewBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
            navigateToPage('FarmerAnimation.html');
        });
        
        continueBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
            if (confirm('🎉 Great job! Grandfather\'s farm is back to normal!\n\nWould you like to check on other family members?')) {
                navigateToPage('../Earth/Earth.html');
            }
        });
    }, MODAL_CONFIG.animationDelay);
}

/**
 * Initialize grandpa page with proper error handling
 */
document.addEventListener('DOMContentLoaded', function() {
    try {
        setProgress(100);
        createStars();
    } catch (error) {
        console.error('Grandpa page initialization error:', error);
    }
});

/**
 * Global navigation and utility functions
 * Optimized for performance and maintainability
 */

// Cache DOM elements to avoid repeated queries
const domCache = {
    progressBars: null,
    getProgressBars() {
        if (!this.progressBars) {
            this.progressBars = [
                document.getElementById('progressbar'),
                document.getElementById('progressbar2')
            ].filter(Boolean);
        }
        return this.progressBars;
    }
};

/**
 * Set progress bar width with optimized DOM manipulation
 * @param {number} percent - Progress percentage (0-100)
 */
function setProgress(percent) {
    const progressBars = domCache.getProgressBars();
    progressBars.forEach(bar => {
        bar.style.width = `${percent}%`;
    });
}

/**
 * Navigate to a specific page with error handling
 * @param {string} url - Target URL
 */
function navigateToPage(url) {
    try {
        window.location.href = url;
    } catch (error) {
        console.error('Navigation error:', error);
        alert('Unable to navigate. Please try again.');
    }
}

/**
 * Show exit message with consistent styling
 */
function showExitMessage() {
    alert('Maybe next time!');
}

/**
 * Navigate back to main page
 */
function goHome() {
    navigateToPage('/index.html');
}

/**
 * Handle main page adventure start with input validation
 * @param {string} answer - User's answer ('yes' or 'no')
 */
function startAdventure(answer) {
    if (answer === 'yes') {
        navigateToPage('/pages/Ravi/Ravi.html');
    } else {
        showExitMessage();
    }
}

/**
 * Solar system animation with optimized rendering
 * Uses requestAnimationFrame for smooth 60fps animation
 */
function initSolarSystem() {
    const canvas = document.getElementById("solar-canvas");
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    let animationId = null;
    
    // Optimized resize handler with debouncing
    let resizeTimeout;
    const resizeCanvas = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }, 16); // ~60fps
    };
    
    // Add resize listener with cleanup
    window.addEventListener("resize", resizeCanvas, { passive: true });
    resizeCanvas();
    
    // Cache center calculations
    const getCenter = () => ({
        x: canvas.width / 2,
        y: canvas.height / 2
    });
    
    // Planet configuration with optimized properties
    const planets = [
        { radius: 20, distance: 0, speed: 0, color: "yellow", shadowBlur: 22, shadowColor: "yellow" },
        { radius: 6, distance: 80, speed: 1.2, color: "gray", shadowBlur: 8, shadowColor: "black" },
        { radius: 7, distance: 120, speed: 0.95, color: "#e2bb7b", shadowBlur: 8, shadowColor: "black" },
        { radius: 9, distance: 170, speed: 0.8, color: "#52aaff", shadowBlur: 8, shadowColor: "black" },
        { radius: 7, distance: 220, speed: 0.6, color: "red", shadowBlur: 8, shadowColor: "black" },
        { radius: 16, distance: 300, speed: 0.4, color: "orange", shadowBlur: 8, shadowColor: "black" },
        { radius: 13, distance: 370, speed: 0.3, color: "#f1f17e", shadowBlur: 8, shadowColor: "black" },
        { radius: 10, distance: 440, speed: 0.23, color: "#7ef2e6", shadowBlur: 8, shadowColor: "black" },
        { radius: 10, distance: 500, speed: 0.18, color: "#2d7aff", shadowBlur: 8, shadowColor: "black" }
    ];
    
    let angle = 0;
    const ANGLE_INCREMENT = 0.01;
    const EARTH_INDEX = 3;
    const MOON_DISTANCE = 22;
    const MOON_RADIUS = 3;
    
    /**
     * Optimized solar system rendering
     */
    function drawSolarSystem() {
        const center = getCenter();
        
        // Clear canvas efficiently
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw orbits (skip sun)
        ctx.strokeStyle = "rgba(255,255,255,0.13)";
        ctx.lineWidth = 1;
        for (let i = 1; i < planets.length; i++) {
            ctx.beginPath();
            ctx.arc(center.x, center.y, planets[i].distance, 0, 2 * Math.PI);
            ctx.stroke();
        }
        
        // Draw planets with optimized rendering
        planets.forEach((planet, i) => {
            const planetAngle = angle * planet.speed;
            let x = center.x;
            let y = center.y;
            
            // Calculate planet position
            if (planet.distance > 0) {
                x += Math.cos(planetAngle) * planet.distance;
                y += Math.sin(planetAngle) * planet.distance;
            }
            
            // Draw planet with shadow
            ctx.shadowColor = planet.shadowColor;
            ctx.shadowBlur = planet.shadowBlur;
            ctx.fillStyle = planet.color;
            ctx.beginPath();
            ctx.arc(x, y, planet.radius, 0, 2 * Math.PI);
            ctx.fill();
            
            // Draw Earth's moon
            if (i === EARTH_INDEX) {
                const moonAngle = angle * 2;
                const moonX = x + Math.cos(moonAngle) * MOON_DISTANCE;
                const moonY = y + Math.sin(moonAngle) * MOON_DISTANCE;
                
                ctx.shadowBlur = 0; // Reset shadow for moon
                ctx.fillStyle = "#ddd";
                ctx.beginPath();
                ctx.arc(moonX, moonY, MOON_RADIUS, 0, 2 * Math.PI);
                ctx.fill();
            }
        });
        
        // Reset shadow for next frame
        ctx.shadowBlur = 0;
        
        angle += ANGLE_INCREMENT;
        animationId = requestAnimationFrame(drawSolarSystem);
    }
    
    // Start animation
    drawSolarSystem();
    
    // Return cleanup function
    return () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        window.removeEventListener("resize", resizeCanvas);
    };
}

/**
 * Initialize application when DOM is ready
 * Optimized with proper cleanup and error handling
 */
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Initialize solar system animation (only on main page)
        if (document.getElementById('solar-canvas')) {
            const cleanup = initSolarSystem();
            // Store cleanup function for potential use
            window.solarSystemCleanup = cleanup;
        }
        
        // Set initial progress
        setProgress(10);
    } catch (error) {
        console.error('Initialization error:', error);
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
    if (window.solarSystemCleanup) {
        window.solarSystemCleanup();
    }
});

// Skywave page specific functionality
function goBackToEarth() {
    window.location.href = '../Earth/Earth.html';
}

function continueAdventure() {
    if (confirm('🌍 Ready to check on other family members?\n\nSee how the solar flare affects Grandpa, Professor Pixel, or Kiran!')) {
        window.location.href = '../Earth/Earth.html';
    }
}

function watchLanding() {
    // Create emergency landing simulation
    let modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = 0;
    modal.style.left = 0;
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'linear-gradient(to bottom, #87CEEB 0%, #98FB98 100%)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = 1000;
    
    let landingBox = document.createElement('div');
    landingBox.style.background = 'rgba(255,255,255,0.95)';
    landingBox.style.border = '3px solid #1E90FF';
    landingBox.style.color = '#333';
    landingBox.style.padding = '40px 50px';
    landingBox.style.borderRadius = '24px';
    landingBox.style.boxShadow = '0 0 30px rgba(30,144,255,0.5)';
    landingBox.style.fontSize = '1.3em';
    landingBox.style.textAlign = 'center';
    landingBox.style.maxWidth = '600px';
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
        <button onclick='closeLanding()' style='margin-top:20px; padding:12px 30px; background:#1E90FF; color:white; border:none; border-radius:20px; cursor:pointer; font-weight:bold; font-size:1.1em;'>Continue</button>
    `;
    
    modal.appendChild(landingBox);
    document.body.appendChild(modal);
    
    // Add close function
    window.closeLanding = function() {
        document.body.removeChild(modal);
    };
}

// Initialize skywave page
document.addEventListener('DOMContentLoaded', function() {
    setProgress(100);
});

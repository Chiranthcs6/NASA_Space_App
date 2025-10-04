// Solution page specific functionality
function goBackToSpaceDemo() {
    window.location.href = 'SpaceDemo.html';
}

function activateAurora() {
    // Create aurora light show modal
    let modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = 0;
    modal.style.left = 0;
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'linear-gradient(45deg, #000428 0%, #004e92 50%, #009ffd 100%)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = 1000;
    modal.style.animation = 'auroraAnimation 3s ease-in-out infinite';
    
    let auroraBox = document.createElement('div');
    auroraBox.style.background = 'rgba(0,0,0,0.8)';
    auroraBox.style.border = '3px solid #ef6c1b';
    auroraBox.style.color = '#fff';
    auroraBox.style.padding = '40px 50px';
    auroraBox.style.borderRadius = '24px';
    auroraBox.style.boxShadow = '0 0 50px #ef6c1b';
    auroraBox.style.fontSize = '1.3em';
    auroraBox.style.textAlign = 'center';
    auroraBox.style.maxWidth = '600px';
    auroraBox.innerHTML = `
        <h2 style="color: #ef6c1b; margin-bottom: 20px;">🌌 Kiran's Aurora View from Space! ✨</h2>
        <p>From the safety of his shelter, Kiran watched the most spectacular aurora display ever seen! The same solar storm that created the danger also painted the Earth with brilliant green and blue lights.</p>
        <p>🎆 "Mission Control, you should see this view! The aurora is absolutely incredible from up here!" - Kiran</p>
        <p style="font-style: italic; color: #88ffaa; font-size: 0.9em;">Space Fact: Astronauts on the ISS get the best views of auroras because they're above the atmosphere where the lights occur!</p>
        <button onclick='closeAurora()' style='margin-top:20px; padding:12px 30px; background:#ef6c1b; color:white; border:none; border-radius:20px; cursor:pointer; font-weight:bold; font-size:1.1em;'>Continue Mission</button>
    `;
    
    modal.appendChild(auroraBox);
    document.body.appendChild(modal);
    
    // Add aurora animation styles
    let style = document.createElement('style');
    style.innerHTML = `
        @keyframes auroraAnimation {
            0% { background: linear-gradient(45deg, #000428 0%, #004e92 50%, #009ffd 100%); }
            25% { background: linear-gradient(45deg, #ff0844 0%, #ffb199 50%, #ef6c1b 100%); }
            50% { background: linear-gradient(45deg, #8360c3 0%, #2ebf91 50%, #ff6b6b 100%); }
            75% { background: linear-gradient(45deg, #667eea 0%, #764ba2 50%, #ef6c1b 100%); }
            100% { background: linear-gradient(45deg, #000428 0%, #004e92 50%, #009ffd 100%); }
        }
    `;
    document.head.appendChild(style);
    
    // Add close function
    window.closeAurora = function() {
        document.body.removeChild(modal);
        document.head.removeChild(style);
    };
    
    // Auto close after 8 seconds
    setTimeout(() => {
        if (document.body.contains(modal)) {
            closeAurora();
        }
    }, 8000);
}

function continueToDinner() {
        window.location.href = '../FamilyDinner/FamilyDinner.html';
    }

// Initialize Solution page
document.addEventListener('DOMContentLoaded', function() {
    setProgress(100);
});

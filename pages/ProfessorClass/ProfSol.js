// Professor Solution page specific functionality
function goBackToClass() {
    window.location.href = 'ProfessorClass.html';
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
    auroraBox.style.border = '3px solid #ffe066';
    auroraBox.style.color = '#fff';
    auroraBox.style.padding = '40px 50px';
    auroraBox.style.borderRadius = '24px';
    auroraBox.style.boxShadow = '0 0 50px #ffe066';
    auroraBox.style.fontSize = '1.3em';
    auroraBox.style.textAlign = 'center';
    auroraBox.style.maxWidth = '600px';
    auroraBox.innerHTML = `
        <h2 style="color: #ffe066; margin-bottom: 20px;">🌌 Professor's Aurora Light Show! ✨</h2>
        <p>Beautiful northern lights dance across the sky as Professor Pixel's lesson continues uninterrupted via fiber optic connection!</p>
        <p>🎆 The same solar storm that disrupted satellites creates this magical display, but underground cables keep working!</p>
        <p style="font-style: italic; color: #88ffaa; font-size: 0.9em;">Educational Fact: Fiber optic cables use light signals instead of electrical signals, making them immune to electromagnetic interference from solar storms!</p>
        <button onclick='closeAurora()' style='margin-top:20px; padding:12px 30px; background:#ffe066; color:#282828; border:none; border-radius:20px; cursor:pointer; font-weight:bold; font-size:1.1em;'>Continue Learning</button>
    `;
    
    modal.appendChild(auroraBox);
    document.body.appendChild(modal);
    
    // Add aurora animation styles
    let style = document.createElement('style');
    style.innerHTML = `
        @keyframes auroraAnimation {
            0% { background: linear-gradient(45deg, #000428 0%, #004e92 50%, #009ffd 100%); }
            25% { background: linear-gradient(45deg, #ff0844 0%, #ffb199 50%, #ffe066 100%); }
            50% { background: linear-gradient(45deg, #8360c3 0%, #2ebf91 50%, #ff6b6b 100%); }
            75% { background: linear-gradient(45deg, #667eea 0%, #764ba2 50%, #ffe066 100%); }
            100% { background: linear-gradient(45deg, #000428 0%, #004e92 50%, #009ffd 100%); }
        }
    `;
    document.head.appendChild(style);
    
    // Add close function
    window.closeAurora = function() {
        document.body.removeChild(modal);
        document.head.removeChild(style);
    };
    
    // Auto close after 6 seconds
    setTimeout(() => {
        if (document.body.contains(modal)) {
            closeAurora();
        }
    }, 6000);
}

function nextFamilyMember() {
    if (confirm('🧑‍🏫 Excellent! Professor Pixel successfully switched to fiber optic connection and continued teaching!\n\nReady to check on other family members?')) {
        window.location.href = '../Earth/Earth.html';
    }
}

// Initialize solution page
document.addEventListener('DOMContentLoaded', function() {
    setProgress(100);
});

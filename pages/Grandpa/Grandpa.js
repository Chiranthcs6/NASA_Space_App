// Grandpa page specific functionality
function goBackToEarth() {
    window.location.href = '../Earth/Earth.html';
}

// Create twinkling stars randomly positioned on the page
function createStars() {
    for(let i = 0; i < 33; i++) {
        let star = document.createElement('div');
        star.className = 'star';
        star.style.top = Math.random() * 95 + 'vh';
        star.style.left = Math.random() * 98 + 'vw';
        star.style.width = star.style.height = Math.random() * 2.5 + 1.5 + 'px';
        star.style.animationDuration = (Math.random() * 2 + 1) + 's';
        document.body.appendChild(star);
    }
}

// Button interaction to simulate fixing GPS
function fixGPS() {
    let modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = 0;
    modal.style.left = 0;
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(246, 65, 108, 0.65)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = 10;
    
    let box = document.createElement('div');
    box.style.background = '#1a237e';
    box.style.border = '2px solid #ffd600';
    box.style.color = '#fff';
    box.style.padding = '40px 50px';
    box.style.borderRadius = '24px';
    box.style.boxShadow = '0 2px 12px 2px #f500574a';
    box.style.fontSize = '1.23em';
    box.style.textAlign = 'center';
    box.innerHTML = "<strong>Fixing GPS signals…</strong><br><br>Solar flare effects detected!<br>Attempting error correction…";
    
    modal.appendChild(box);
    document.body.appendChild(modal);
    
    setTimeout(() => {
        box.innerHTML = `
            <strong>GPS signals stabilized!</strong><br><br>
            Grandfather Orbit can now plant straight rows.<br>
            Keep an eye on space weather!<br><br>
            <div style="display: flex; gap: 10px; justify-content: center; margin-top: 20px;">
                <button onclick='viewAnimation()' style='padding:10px 20px; background:#ff6b35; color:white; border:none; border-radius:20px; cursor:pointer; font-weight:bold;'>📺 Watch Animation</button>
                <button onclick='continueStory()' style='padding:10px 20px; background:#ffd600; color:#1a237e; border:none; border-radius:20px; cursor:pointer; font-weight:bold;'>Continue Adventure</button>
            </div>
        `;
        
        // UPDATED: Animation now in same folder
        window.viewAnimation = function() {
            document.body.removeChild(modal);
            window.location.href = 'FarmerAnimation.html';  // ← SAME FOLDER
        };
        
        window.continueStory = function() {
            document.body.removeChild(modal);
            if (confirm('🎉 Great job! Grandfather\'s farm is back to normal!\n\nWould you like to check on other family members?')) {
                window.location.href = '../Earth/Earth.html';
            }
        };
    }, 1800);
}

// Initialize grandpa page
document.addEventListener('DOMContentLoaded', function() {
    setProgress(100);
    createStars();
});

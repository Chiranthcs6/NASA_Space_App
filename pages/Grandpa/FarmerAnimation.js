// Farmer Animation page specific functionality
let isDisrupted = false;
let tractorInterval = null;
let angle = 0;

function goBackToGrandpa() {
    window.location.href = 'Grandpa.html';
}

function continueAdventure() {
    if (confirm('🎉 Great! You learned how solar flares affect GPS systems!\n\nReturn to choose another family member?')) {
        window.location.href = '../Earth/Earth.html';
    }
}

// NEW FUNCTION: Navigate to solution page
function showSolution() {
    window.location.href = 'Solution.html';
}

function triggerSolarFlare() {
    if (isDisrupted) return;
    
    isDisrupted = true;
    const flare = document.getElementById('solarFlare');
    const signal1 = document.getElementById('signal1');
    const signal2 = document.getElementById('signal2');
    const tractor = document.getElementById('tractor');
    const status = document.getElementById('status');
    const explanation = document.getElementById('explanation');
    const speechBubble = document.getElementById('speechBubble');
    const grandfather = document.getElementById('grandfather');

    // Show solar flare
    flare.style.opacity = '1';
    
    // Scramble GPS signals
    setTimeout(() => {
        signal1.classList.add('scrambled');
        signal2.classList.add('scrambled');
        status.textContent = 'GPS DISRUPTED!';
        status.classList.add('disrupted');
        explanation.textContent = 'Solar flare scrambling timing signals!';
        
        // Show grandfather and speech bubble
        speechBubble.style.display = 'block';
        grandfather.style.display = 'block';
        
        // Make tractor move erratically
        startErraticMovement();
    }, 1000);
}

function startErraticMovement() {
    const tractor = document.getElementById('tractor');
    const centerX = 350;
    const centerY = 250;
    const radius = 80;
    
    tractorInterval = setInterval(() => {
        angle += 0.15;
        const x = centerX + Math.cos(angle) * radius + Math.random() * 20 - 10;
        const y = centerY + Math.sin(angle) * radius + Math.random() * 20 - 10;
        
        tractor.style.left = x + 'px';
        tractor.style.bottom = y + 'px';
        tractor.style.transform = `rotate(${angle * 50}deg)`;
    }, 50);
}

function resetScene() {
    isDisrupted = false;
    const flare = document.getElementById('solarFlare');
    const signal1 = document.getElementById('signal1');
    const signal2 = document.getElementById('signal2');
    const tractor = document.getElementById('tractor');
    const status = document.getElementById('status');
    const explanation = document.getElementById('explanation');
    const speechBubble = document.getElementById('speechBubble');
    const grandfather = document.getElementById('grandfather');
    
    // Stop erratic movement
    if (tractorInterval) {
        clearInterval(tractorInterval);
        tractorInterval = null;
    }
    
    angle = 0;
    
    // Reset all elements
    flare.style.opacity = '0';
    signal1.classList.remove('scrambled');
    signal2.classList.remove('scrambled');
    tractor.style.left = '200px';
    tractor.style.bottom = '150px';
    tractor.style.transform = 'rotate(0deg)';
    status.textContent = 'GPS Normal';
    status.classList.remove('disrupted');
    explanation.textContent = 'Satellites sending precise timing signals';
    speechBubble.style.display = 'none';
    grandfather.style.display = 'none';
}

// Initialize farmer animation page
document.addEventListener('DOMContentLoaded', function() {
    setProgress(100);
    
    // Auto-start animation after 2 seconds
    setTimeout(() => {
        triggerSolarFlare();
    }, 2000);
});

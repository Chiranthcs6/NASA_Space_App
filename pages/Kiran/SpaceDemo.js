// SpaceDemo page specific functionality
function goBackToKiran() {
    window.location.href = 'Kiran.html';
}

function showSolution() {
    // Direct redirect to Sol.html - NO ALERT DIALOG
    window.location.href = 'Sol.html';
}

// Initialize space demo
document.addEventListener('DOMContentLoaded', function() {
    setProgress(100);
    initializeSpaceScene();
});

function initializeSpaceScene() {
    // Create stars
    const spaceScene = document.querySelector('.space-scene');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        spaceScene.appendChild(star);
    }

    // Create solar particles
    const sun = document.querySelector('.sun');
    setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'solar-particle';
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.animationDuration = (Math.random() * 2 + 2) + 's';
        sun.appendChild(particle);
        setTimeout(() => particle.remove(), 3000);
    }, 200);

    // Start radiation simulation
    startRadiationSimulation();
}

// Radiation level animation variables
let radiationLevel = 0;
let radiationInterval;
let timeRemaining = 10;
let timerInterval;
let shelterEntered = false;

function startRadiationSimulation() {
    // Start radiation level animation
    radiationInterval = setInterval(() => {
        radiationLevel = Math.min(radiationLevel + 2, 95);
        document.getElementById('radiationBar').style.width = radiationLevel + '%';
        document.getElementById('radiationText').textContent = radiationLevel + '%';
    }, 100);

    // Auto-complete demo after 3 seconds if button not clicked
    setTimeout(() => {
        if (!shelterEntered) {
            enterShelter();
        }
    }, 3000);
}

function enterShelter() {
    if (shelterEntered) return;
    shelterEntered = true;

    // Disable button
    document.getElementById('actionBtn').disabled = true;
    document.getElementById('actionBtn').textContent = 'In Shelter - Safe!';

    // Move astronaut to shelter
    const astronaut = document.getElementById('astronaut');
    const shelter = document.getElementById('shelter');
    
    astronaut.style.left = '70%';
    astronaut.style.top = '40%';
    shelter.classList.add('active');

    // Update status
    document.getElementById('statusText').textContent = 'Safe in storm shelter';

    // Reduce radiation level
    setTimeout(() => {
        const reduceRadiation = setInterval(() => {
            radiationLevel = Math.max(radiationLevel - 3, 5);
            document.getElementById('radiationBar').style.width = radiationLevel + '%';
            document.getElementById('radiationText').textContent = radiationLevel + '%';
            if (radiationLevel <= 5) clearInterval(reduceRadiation);
        }, 100);
    }, 1000);

    // Start countdown timer
    timerInterval = setInterval(() => {
        timeRemaining--;
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        document.getElementById('timer').textContent = 
            `${minutes}:${seconds.toString().padStart(2, '0')}`;

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            showSuccess();
        }
    }, 1000);
}

function showSuccess() {
    clearInterval(radiationInterval);
    const successMsg = document.getElementById('successMessage');
    successMsg.classList.add('show');
    document.getElementById('statusText').textContent = 'Mission Complete!';
    document.getElementById('timer').textContent = 'SAFE ✓';
    document.getElementById('timer').style.color = '#48bb78';
}

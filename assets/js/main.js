// Global navigation and utility functions
function setProgress(percent) {
    const progressBar = document.getElementById('progressbar');
    if (progressBar) {
        progressBar.style.width = percent + '%';
    }
    
    const progressBar2 = document.getElementById('progressbar2');
    if (progressBar2) {
        progressBar2.style.width = percent + '%';
    }
}

// Navigation function
function navigateToPage(url) {
    window.location.href = url;
}

// Show exit message
function showExitMessage() {
    alert('Maybe next time!');
}

// Go back to main page (from pages/*/filename.html)
function goHome() {
    window.location.href = '/index.html';
}

// Main page navigation logic
function startAdventure(answer) {
    if (answer === 'yes') {
        window.location.href = '/pages/Ravi/Ravi.html'; // Link to Ravi's story page
    } else {
        alert("Maybe next time!");
    }
}

// Solar system animation (for main page)
function initSolarSystem() {
    const canvas = document.getElementById("solar-canvas");
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener("resize", resizeCanvas, false);
    resizeCanvas();
    
    const centerX = () => canvas.width / 2;
    const centerY = () => canvas.height / 2;
    
    const planets = [
        { radius: 20, distance: 0, speed: 0, color: "yellow" },
        { radius: 6, distance: 80, speed: 1.2, color: "gray" },
        { radius: 7, distance: 120, speed: 0.95, color: "#e2bb7b" },
        { radius: 9, distance: 170, speed: 0.8, color: "#52aaff" },
        { radius: 7, distance: 220, speed: 0.6, color: "red" },
        { radius: 16, distance: 300, speed: 0.4, color: "orange" },
        { radius: 13, distance: 370, speed: 0.3, color: "#f1f17e" },
        { radius: 10, distance: 440, speed: 0.23, color: "#7ef2e6" },
        { radius: 10, distance: 500, speed: 0.18, color: "#2d7aff" }
    ];
    
    let angle = 0;
    
    function drawSolarSystem() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        
        // Draw orbits
        for (let i = 1; i < planets.length; i++) {
            ctx.beginPath();
            ctx.strokeStyle = "rgba(255,255,255,0.13)";
            ctx.lineWidth = 1;
            ctx.arc(centerX(), centerY(), planets[i].distance, 0, 2 * Math.PI);
            ctx.stroke();
        }
        
        ctx.restore();
        
        // Draw planets
        for (let i = 0; i < planets.length; i++) {
            let a = angle * planets[i].speed;
            let x = centerX(), y = centerY();
            
            if (planets[i].distance > 0) {
                x += Math.cos(a) * planets[i].distance;
                y += Math.sin(a) * planets[i].distance;
            }
            
            ctx.beginPath();
            ctx.arc(x, y, planets[i].radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = planets[i].color;
            ctx.shadowColor = i === 0 ? "yellow" : "black";
            ctx.shadowBlur = i === 0 ? 22 : 8;
            ctx.fill();
            ctx.shadowBlur = 0;
            
            // Draw Earth's moon
            if (i === 3) {
                let moonA = angle * 2;
                let mx = x + Math.cos(moonA) * 22;
                let my = y + Math.sin(moonA) * 22;
                ctx.beginPath();
                ctx.arc(mx, my, 3, 0, 2 * Math.PI);
                ctx.fillStyle = "#ddd";
                ctx.fill();
            }
        }
        
        angle += 0.01;
        requestAnimationFrame(drawSolarSystem);
    }
    
    drawSolarSystem();
}

// Initialize solar system when page loads
document.addEventListener('DOMContentLoaded', function() {
    initSolarSystem();
    setProgress(10);
});

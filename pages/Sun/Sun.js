// Sun page specific functionality
function navigateToFriends() {
    window.location.href = '../Friends/Friends.html';
}

// Animation for Sunny's Sneeze
function doSunSneeze() {
    const sun = document.getElementById("sunFace");
    const cloud = document.getElementById("sneezeCloud");
    const flare = document.getElementById("flareBlast");
    const btn = document.getElementById("sneezeBtn");
    const result = document.getElementById("sneezeResult");
    const nextBtn = document.getElementById("nextEarthBtn");

    btn.disabled = true;
    btn.style.opacity = "0.65";
    sun.style.animation = "none";
    void sun.offsetWidth;
    sun.style.animation = "sunShakeAnim 0.55s";
    
    setTimeout(() => {
        sun.style.animation = "sunshinePulse 1.9s infinite alternate";
        cloud.classList.add('active');
        flare.classList.add('active');
        
        setTimeout(() => {
            cloud.classList.remove('active');
            flare.classList.remove('active');
            result.style.display = "block";
            nextBtn.style.display = "block";
        }, 1300);
    }, 400);
}

// UPDATED: Link to Effects page
function showEffects() {
    window.location.href = '../Earth/Earth.html';
}

// Initialize sun page
document.addEventListener('DOMContentLoaded', function() {
    setProgress(100);
});

// Communication page specific functionality
function goBackToEarth() {
    window.location.href = '../Earth/Earth.html';
}

function nextAdventure() {
    addMessage('>>> INITIATING NEXT MISSION SEQUENCE...');
    setTimeout(() => {
        if (confirm('🚀 Communication restored! Ready to check on other family members?')) {
            window.location.href = '../Earth/Earth.html';
        }
    }, 500);
}

// Canvas and animation variables
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Simulation state
let time = 0;
let solarFlareActive = false;
let flareIntensity = 0;
let signalStrength = 100;
let ionosphereDisturbance = 0;

// Sun
const sun = {
    x: canvas.width * 0.2,
    y: canvas.height * 0.3,
    radius: 60
};

// Earth
const earth = {
    x: canvas.width * 0.8,
    y: canvas.height * 0.5,
    radius: 40
};

// Spacecraft
const spacecraft = {
    x: canvas.width * 0.85,
    y: canvas.height * 0.3,
    size: 15,
    glitching: false,
    glitchIntensity: 0
};

// Particles for solar flare
const flareParticles = [];

// Radio waves
const radioWaves = [];

// Stars
const stars = [];
for (let i = 0; i < 200; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        twinkle: Math.random()
    });
}

// Add message to comms
function addMessage(text, isStatic = false) {
    const comms = document.getElementById('comms');
    const msg = document.createElement('div');
    msg.className = 'message' + (isStatic ? ' static' : '');
    msg.textContent = text;
    comms.appendChild(msg);
    comms.scrollTop = comms.scrollHeight;
}

// Update HUD
function updateHUD() {
    document.getElementById('signal').textContent = `${Math.max(0, Math.floor(signalStrength))}%`;
    
    const statusEl = document.getElementById('status');
    if (signalStrength < 20) {
        statusEl.textContent = 'COMMUNICATION ERROR';
        statusEl.className = 'critical';
    } else if (signalStrength < 50) {
        statusEl.textContent = 'INTERFERENCE';
        statusEl.className = 'warning';
    } else {
        statusEl.textContent = 'NOMINAL';
        statusEl.className = '';
    }
}

// Draw sun
function drawSun() {
    const gradient = ctx.createRadialGradient(sun.x, sun.y, sun.radius * 0.3, sun.x, sun.y, sun.radius);
    gradient.addColorStop(0, '#ffff00');
    gradient.addColorStop(0.5, '#ffaa00');
    gradient.addColorStop(1, '#ff4400');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2);
    ctx.fill();
    
    // Glow
    ctx.shadowBlur = 30;
    ctx.shadowColor = '#ff8800';
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;
}

// Draw Earth
function drawEarth() {
    // Earth body
    const gradient = ctx.createRadialGradient(earth.x, earth.y, earth.radius * 0.3, earth.x, earth.y, earth.radius);
    gradient.addColorStop(0, '#4488ff');
    gradient.addColorStop(0.7, '#2244aa');
    gradient.addColorStop(1, '#001144');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(earth.x, earth.y, earth.radius, 0, Math.PI * 2);
    ctx.fill();
    
    // Ionosphere (normal or disturbed)
    const ionoRadius = earth.radius + 15;
    const ionoOpacity = 0.3 + ionosphereDisturbance * 0.5;
    const ionoColor = ionosphereDisturbance > 0.5 ? '#ff0000' : '#00ffff';
    
    ctx.strokeStyle = ionoColor;
    ctx.globalAlpha = ionoOpacity;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(earth.x, earth.y, ionoRadius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.lineWidth = 1;
}

// Draw spacecraft
function drawSpacecraft() {
    ctx.save();
    
    // Apply glitch effect if flare is affecting satellite
    if (spacecraft.glitching) {
        const glitchX = (Math.random() - 0.5) * spacecraft.glitchIntensity * 10;
        const glitchY = (Math.random() - 0.5) * spacecraft.glitchIntensity * 10;
        ctx.translate(glitchX, glitchY);
        
        // Color distortion
        if (Math.random() < spacecraft.glitchIntensity * 0.3) {
            ctx.globalAlpha = 0.7;
        }
    }
    
    ctx.fillStyle = spacecraft.glitching && spacecraft.glitchIntensity > 0.5 ? '#ff6666' : '#aaaaaa';
    ctx.strokeStyle = spacecraft.glitching && spacecraft.glitchIntensity > 0.7 ? '#ff0000' : '#ffffff';
    ctx.lineWidth = 2;
    
    // Body
    ctx.beginPath();
    ctx.moveTo(spacecraft.x, spacecraft.y - spacecraft.size);
    ctx.lineTo(spacecraft.x + spacecraft.size, spacecraft.y + spacecraft.size);
    ctx.lineTo(spacecraft.x - spacecraft.size, spacecraft.y + spacecraft.size);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Solar panels - damaged effect when hit
    const panelColor = spacecraft.glitching && spacecraft.glitchIntensity > 0.6 ? '#884400' : '#4444ff';
    ctx.fillStyle = panelColor;
    ctx.fillRect(spacecraft.x - spacecraft.size * 2, spacecraft.y, spacecraft.size * 0.8, spacecraft.size * 2);
    ctx.fillRect(spacecraft.x + spacecraft.size * 1.2, spacecraft.y, spacecraft.size * 0.8, spacecraft.size * 2);
    
    // Sparks when heavily damaged
    if (spacecraft.glitching && spacecraft.glitchIntensity > 0.7 && Math.random() < 0.3) {
        ctx.fillStyle = '#ffff00';
        for (let i = 0; i < 3; i++) {
            const sparkX = spacecraft.x + (Math.random() - 0.5) * spacecraft.size * 2;
            const sparkY = spacecraft.y + (Math.random() - 0.5) * spacecraft.size * 2;
            ctx.beginPath();
            ctx.arc(sparkX, sparkY, 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Warning glow when affected
    if (spacecraft.glitching && spacecraft.glitchIntensity > 0.4) {
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#ff0000';
        ctx.strokeStyle = '#ff0000';
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(spacecraft.x, spacecraft.y, spacecraft.size * 2, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
    }
    
    ctx.restore();
}

// Create radio wave
function createRadioWave() {
    radioWaves.push({
        x: spacecraft.x,
        y: spacecraft.y,
        targetX: earth.x,
        targetY: earth.y,
        progress: 0,
        opacity: 1
    });
}

// Trigger solar flare
function triggerSolarFlare() {
    solarFlareActive = true;
    flareIntensity = 0;
    
    // Create flare particles
    for (let i = 0; i < 100; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 3;
        flareParticles.push({
            x: sun.x,
            y: sun.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 1,
            size: 2 + Math.random() * 3
        });
    }
}

// Animation loop
let lastWaveTime = 0;
let flareTriggered = false;

function animate() {
    time += 1/60;
    
    // Clear canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw stars
    stars.forEach(star => {
        star.twinkle += 0.02;
        const alpha = 0.5 + Math.sin(star.twinkle) * 0.5;
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fillRect(star.x, star.y, star.size, star.size);
    });
    
    // Trigger flare at 3 seconds
    if (time > 3 && !flareTriggered) {
        triggerSolarFlare();
        flareTriggered = true;
        addMessage('⚠️ SOLAR FLARE DETECTED');
        
        // Add satellite damage warning
        setTimeout(() => {
            if (spacecraft.glitchIntensity > 0.3) {
                addMessage('⚠️ SATELLITE SYSTEMS AFFECTED');
            }
        }, 2000);
        
        setTimeout(() => {
            if (spacecraft.glitchIntensity > 0.6) {
                addMessage('🔴 CRITICAL: SATELLITE DAMAGE DETECTED');
            }
        }, 4000);
        
        // Show button after 10 seconds
        setTimeout(() => {
            document.getElementById('nextBtn').classList.add('show');
        }, 10000);
    }
    
    // Update flare
    if (solarFlareActive) {
        flareIntensity = Math.min(1, flareIntensity + 0.01);
        
        // Update particles
        for (let i = flareParticles.length - 1; i >= 0; i--) {
            const p = flareParticles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.005;
            
            if (p.life <= 0) {
                flareParticles.splice(i, 1);
            }
        }
        
        // Check if particles hit ionosphere or spacecraft
        flareParticles.forEach(p => {
            const dist = Math.sqrt(Math.pow(p.x - earth.x, 2) + Math.pow(p.y - earth.y, 2));
            if (dist < earth.radius + 20) {
                ionosphereDisturbance = Math.min(1, ionosphereDisturbance + 0.02);
            }
            
            // Check if particles hit spacecraft
            const distToSpacecraft = Math.sqrt(Math.pow(p.x - spacecraft.x, 2) + Math.pow(p.y - spacecraft.y, 2));
            if (distToSpacecraft < spacecraft.size * 2) {
                spacecraft.glitching = true;
                spacecraft.glitchIntensity = Math.min(1, spacecraft.glitchIntensity + 0.03);
            }
        });
    }
    
    // Update signal strength based on disturbance
    const targetSignal = 100 - (ionosphereDisturbance * 100);
    signalStrength += (targetSignal - signalStrength) * 0.05;
    
    // Additional signal degradation from spacecraft damage
    if (spacecraft.glitching) {
        signalStrength -= spacecraft.glitchIntensity * 0.5;
    }
    
    // Draw sun with flare effect
    drawSun();
    if (flareIntensity > 0) {
        ctx.strokeStyle = `rgba(255, 100, 0, ${flareIntensity * 0.5})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(sun.x, sun.y, sun.radius + 20 * flareIntensity, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    // Draw flare particles
    flareParticles.forEach(p => {
        ctx.fillStyle = `rgba(255, ${100 + p.life * 155}, 0, ${p.life})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });
    
    // Draw Earth
    drawEarth();
    
    // Draw spacecraft
    drawSpacecraft();
    
    // Send radio waves periodically
    if (time - lastWaveTime > 2) {
        createRadioWave();
        lastWaveTime = time;
        
        if (signalStrength > 70) {
            addMessage('> Ground control, this is Captain Skywave, do you copy?');
            setTimeout(() => addMessage('< Roger that, Captain. Reading you loud and clear.'), 500);
        } else if (signalStrength > 30) {
            addMessage('> Ground control, this is Captain Skywave, do you copy?');
            setTimeout(() => addMessage('< *crackle* ...ptain... weak... *static*', true), 500);
        } else {
            addMessage('> Ground control, this is Captain Skywave, do you copy?');
            setTimeout(() => addMessage('< Shhhhhhhhhhhhhhhhh', true), 500);
        }
    }
    
    // Update and draw radio waves
    for (let i = radioWaves.length - 1; i >= 0; i--) {
        const wave = radioWaves[i];
        wave.progress += 0.02;
        
        // Calculate position
        wave.x = spacecraft.x + (wave.targetX - spacecraft.x) * wave.progress;
        wave.y = spacecraft.y + (wave.targetY - spacecraft.y) * wave.progress;
        
        // Reduce opacity based on ionosphere disturbance
        if (wave.progress > 0.6) {
            wave.opacity *= (1 - ionosphereDisturbance * 0.3);
        }
        
        // Draw wave
        if (wave.opacity > 0.1) {
            ctx.strokeStyle = `rgba(0, 255, 255, ${wave.opacity})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(wave.x, wave.y, 10, 0, Math.PI * 2);
            ctx.stroke();
            
            // Signal disruption effect
            if (ionosphereDisturbance > 0.3) {
                wave.x += (Math.random() - 0.5) * 10 * ionosphereDisturbance;
                wave.y += (Math.random() - 0.5) * 10 * ionosphereDisturbance;
            }
        }
        
        // Remove if complete
        if (wave.progress >= 1) {
            radioWaves.splice(i, 1);
        }
    }
    
    updateHUD();
    requestAnimationFrame(animate);
}

// Initialize communication page
document.addEventListener('DOMContentLoaded', function() {
    setProgress(100);
    
    // Start animation
    animate();
    addMessage('MISSION LOG: Communication test initiated...');
});

// Handle resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Update positions based on new canvas size
    sun.x = canvas.width * 0.2;
    sun.y = canvas.height * 0.3;
    earth.x = canvas.width * 0.8;
    earth.y = canvas.height * 0.5;
    spacecraft.x = canvas.width * 0.85;
    spacecraft.y = canvas.height * 0.3;
});

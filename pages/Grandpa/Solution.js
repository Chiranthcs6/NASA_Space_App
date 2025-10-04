// Solution page specific functionality
function goBackToAnimation() {
    window.location.href = 'FarmerAnimation.html';
}

function backToAnimation() {
    window.location.href = 'FarmerAnimation.html';
}

function activateAurora() {
    // Create a full-screen aurora simulation modal
    let modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = 0;
    modal.style.left = 0;
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'radial-gradient(ellipse at bottom, #0c1445 0%, #000000 70%)';
    modal.style.display = 'flex';
    modal.style.flexDirection = 'column';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = 1000;
    modal.style.overflow = 'hidden';
    
    // Create aurora canvas for realistic animation
    let auroraCanvas = document.createElement('canvas');
    auroraCanvas.width = window.innerWidth;
    auroraCanvas.height = window.innerHeight;
    auroraCanvas.style.position = 'absolute';
    auroraCanvas.style.top = 0;
    auroraCanvas.style.left = 0;
    auroraCanvas.style.zIndex = 1;
    
    // Create info box overlay
    let infoBox = document.createElement('div');
    infoBox.style.position = 'relative';
    infoBox.style.zIndex = 2;
    infoBox.style.background = 'rgba(0,0,0,0.85)';
    infoBox.style.border = '2px solid #00ff88';
    infoBox.style.color = '#fff';
    infoBox.style.padding = '30px 40px';
    infoBox.style.borderRadius = '20px';
    infoBox.style.boxShadow = '0 0 30px rgba(0,255,136,0.3)';
    infoBox.style.fontSize = '1.2em';
    infoBox.style.textAlign = 'center';
    infoBox.style.maxWidth = '700px';
    infoBox.style.margin = '20px';
    infoBox.innerHTML = `
        <h2 style="color: #00ff88; margin-bottom: 15px; text-shadow: 0 0 10px #00ff8866;">🌌 Aurora Borealis - Northern Lights</h2>
        <div style="text-align: left; font-size: 1em; line-height: 1.5;">
            <p><strong style="color: #88ffaa;">What you're seeing:</strong> Solar particles from Sunny's sneeze are colliding with Earth's atmosphere!</p>
            <p><strong style="color: #88ffaa;">Green lights:</strong> Solar particles hitting oxygen atoms at 100-300km altitude</p>
            <p><strong style="color: #88ffaa;">Red lights:</strong> High-altitude oxygen collisions (300-400km up)</p>
            <p><strong style="color: #88ffaa;">Blue/Purple:</strong> Nitrogen molecules getting energized</p>
            <p style="font-style: italic; color: #aaffcc; margin-top: 15px;">The same solar storm that disrupted Grandpa's GPS creates this beautiful natural light show!</p>
        </div>
        <button onclick='closeAurora()' style='margin-top:25px; padding:12px 30px; background: linear-gradient(45deg, #00ff88, #00aa66); color:#000; border:none; border-radius:25px; cursor:pointer; font-weight:bold; font-size:1.1em; box-shadow: 0 4px 15px rgba(0,255,136,0.3);'>Close Aurora Display</button>
    `;
    
    modal.appendChild(auroraCanvas);
    modal.appendChild(infoBox);
    document.body.appendChild(modal);
    
    // Realistic Aurora Animation
    const ctx = auroraCanvas.getContext('2d');
    let animationId;
    let particles = [];
    let time = 0;
    
    // Create aurora particles
    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * auroraCanvas.width,
            y: Math.random() * auroraCanvas.height * 0.6 + auroraCanvas.height * 0.2,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.3,
            life: Math.random() * 100,
            maxLife: 100 + Math.random() * 50,
            color: Math.random() > 0.7 ? 'red' : (Math.random() > 0.8 ? 'blue' : 'green'),
            intensity: Math.random() * 0.8 + 0.2
        });
    }
    
    function animateAurora() {
        ctx.fillStyle = 'rgba(12, 20, 69, 0.1)';
        ctx.fillRect(0, 0, auroraCanvas.width, auroraCanvas.height);
        
        time += 0.02;
        
        particles.forEach((particle, index) => {
            // Update particle position with wave motion
            particle.x += particle.vx + Math.sin(time + particle.y * 0.01) * 0.5;
            particle.y += particle.vy + Math.cos(time + particle.x * 0.01) * 0.2;
            particle.life++;
            
            // Reset particle if it's too old or out of bounds
            if (particle.life > particle.maxLife || 
                particle.x < -50 || particle.x > auroraCanvas.width + 50 ||
                particle.y < -50 || particle.y > auroraCanvas.height + 50) {
                particle.x = Math.random() * auroraCanvas.width;
                particle.y = Math.random() * auroraCanvas.height * 0.6 + auroraCanvas.height * 0.2;
                particle.life = 0;
                particle.maxLife = 100 + Math.random() * 50;
            }
            
            // Calculate opacity based on life cycle
            let opacity = particle.intensity * (1 - particle.life / particle.maxLife) * 
                         (Math.sin(time * 2 + particle.x * 0.01) * 0.3 + 0.7);
            
            // Draw aurora curtains
            ctx.save();
            
            let gradient;
            if (particle.color === 'green') {
                gradient = ctx.createRadialGradient(
                    particle.x, particle.y, 0,
                    particle.x, particle.y, 80
                );
                gradient.addColorStop(0, `rgba(0, 255, 100, ${opacity})`);
                gradient.addColorStop(0.5, `rgba(0, 200, 80, ${opacity * 0.6})`);
                gradient.addColorStop(1, `rgba(0, 150, 60, 0)`);
            } else if (particle.color === 'red') {
                gradient = ctx.createRadialGradient(
                    particle.x, particle.y, 0,
                    particle.x, particle.y, 60
                );
                gradient.addColorStop(0, `rgba(255, 80, 80, ${opacity * 0.8})`);
                gradient.addColorStop(0.5, `rgba(200, 60, 60, ${opacity * 0.4})`);
                gradient.addColorStop(1, `rgba(150, 40, 40, 0)`);
            } else { // blue/purple
                gradient = ctx.createRadialGradient(
                    particle.x, particle.y, 0,
                    particle.x, particle.y, 70
                );
                gradient.addColorStop(0, `rgba(100, 100, 255, ${opacity * 0.9})`);
                gradient.addColorStop(0.5, `rgba(80, 80, 200, ${opacity * 0.5})`);
                gradient.addColorStop(1, `rgba(60, 60, 150, 0)`);
            }
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.ellipse(particle.x, particle.y, 40, 120, 
                       Math.sin(time + particle.x * 0.005) * 0.3, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
        });
        
        // Add stars in background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        for (let i = 0; i < 100; i++) {
            let starX = (i * 137) % auroraCanvas.width;
            let starY = (i * 219) % (auroraCanvas.height * 0.7);
            let twinkle = Math.sin(time * 3 + i) * 0.5 + 0.5;
            ctx.globalAlpha = twinkle * 0.8;
            ctx.beginPath();
            ctx.arc(starX, starY, 1, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
        
        animationId = requestAnimationFrame(animateAurora);
    }
    
    animateAurora();
    
    // Add close function
    window.closeAurora = function() {
        cancelAnimationFrame(animationId);
        document.body.removeChild(modal);
    };
    
    // Auto close after 10 seconds
    setTimeout(() => {
        if (document.body.contains(modal)) {
            closeAurora();
        }
    }, 10000);
}

function nextFamilyMember() {
    if (confirm('🚀 Ready to check on other family members?\n\nSee how the solar flare affects Captain Skywave, Professor Pixel, or Kiran in space!')) {
        window.location.href = '../Earth/Earth.html';
    }
}

// Initialize solution page
document.addEventListener('DOMContentLoaded', function() {
    setProgress(100);
    
    // Add some celebratory animation on load
    setTimeout(() => {
        const banner = document.querySelector('.banner');
        if (banner) {
            banner.style.animation = 'celebration 1s ease-in-out';
            
            // Add celebration animation style
            let style = document.createElement('style');
            style.innerHTML = `
                @keyframes celebration {
                    0% { transform: scale(1) rotate(0deg); }
                    25% { transform: scale(1.05) rotate(-2deg); }
                    50% { transform: scale(1.1) rotate(2deg); }
                    75% { transform: scale(1.05) rotate(-1deg); }
                    100% { transform: scale(1) rotate(0deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }, 500);
});

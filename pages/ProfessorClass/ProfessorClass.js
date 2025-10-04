/**
 * Professor Class page specific functionality
 * Optimized for performance and maintainability
 */

/**
 * Navigate back to Earth page
 */
function goBackToEarth() {
    navigateToPage('../Earth/Earth.html');
}

/**
 * Continue to next adventure with confirmation
 */
function nextAdventure() {
    if (confirm('🚀 Ready for the next adventure! Professor Pixel will guide you through more exciting space phenomena!\n\nWould you like to continue exploring?')) {
        navigateToPage('../Earth/Earth.html');
    }
}

/**
 * Navigate to solution page
 */
function showSolution() {
    navigateToPage('ProfSol.html');
}

// Cache DOM elements for better performance
const domCache = {
    speech: null,
    videoFrame: null,
    staticEl: null,
    status: null,
    warning: null,
    chatDisruption: null,
    students: null,
    
    /**
     * Get DOM elements with caching
     */
    getElements() {
        if (!this.speech) {
            this.speech = document.getElementById('speech');
            this.videoFrame = document.getElementById('videoFrame');
            this.staticEl = document.getElementById('static');
            this.status = document.getElementById('status');
            this.warning = document.getElementById('warning');
            this.chatDisruption = document.getElementById('chatDisruption');
            this.students = document.querySelectorAll('.student');
        }
        return {
            speech: this.speech,
            videoFrame: this.videoFrame,
            staticEl: this.staticEl,
            status: this.status,
            warning: this.warning,
            chatDisruption: this.chatDisruption,
            students: this.students
        };
    }
};

// Text content for disruption simulation
const DISRUPTION_TEXTS = {
    normal: "Today we're going to learn about the solar flare effects on satellite communications...",
    glitch: [
        'Today we\'re going to learn about... <span class="glitch-text">zzzt</span>... the solar... <span class="glitch-text">bzzt</span>... flare effects on...',
        'T0d@y w3\'re... <span class="glitch-text">█████</span> ...s0l@r... <span class="glitch-text">░░░</span> ...fl@re eff3cts...',
        'Today... <span class="glitch-text">[SIGNAL LOST]</span> ...solar... <span class="glitch-text">[ERROR]</span> ...communications...',
        '▓▓▓... <span class="glitch-text">CONNECTION UNSTABLE</span> ...▓▓▓'
    ]
};

// Animation state management
const animationState = {
    packets: [],
    glitchInterval: null,
    packetInterval: null,
    animationId: null
};

/**
 * Create a new packet animation element
 */
function createPacket() {
    const packet = document.createElement('div');
    packet.className = 'packet-animation';
    const startX = Math.random() * window.innerWidth;
    packet.style.cssText = `
        left: ${startX}px;
        top: 0px;
    `;
    document.body.appendChild(packet);
    
    return {
        el: packet,
        y: 0,
        x: startX,
        speed: 2 + Math.random() * 3,
        active: true
    };
}

/**
 * Animate packets with optimized rendering
 */
function animatePackets() {
    animationState.packets = animationState.packets.filter(packet => {
        if (!packet.active) {
            packet.el.remove();
            return false;
        }
        
        packet.y += packet.speed;
        packet.el.style.top = `${packet.y}px`;
        
        if (packet.y > window.innerHeight) {
            packet.el.remove();
            return false;
        }
        
        return true;
    });
    
    animationState.animationId = requestAnimationFrame(animatePackets);
}

/**
 * Trigger disruption simulation with optimized DOM manipulation
 */
function triggerDisruption() {
    const elements = domCache.getElements();
    
    // Validate elements exist
    if (!elements.status || !elements.warning || !elements.chatDisruption || 
        !elements.staticEl || !elements.videoFrame || !elements.speech) {
        console.error('Required elements not found for disruption simulation');
        return;
    }
    
    // Apply disruption effects
    elements.status.style.background = '#ef4444';
    elements.status.innerHTML = '<div class="status-dot"></div><span>Connection Lost</span>';
    elements.warning.style.display = 'block';
    elements.chatDisruption.style.display = 'block';
    elements.staticEl.style.opacity = '0.6';
    elements.videoFrame.style.filter = 'brightness(0.6)';
    
    // Disrupt students with staggered timing
    elements.students.forEach((student, i) => {
        if (Math.random() > 0.5) {
            setTimeout(() => {
                student.classList.add('disrupted');
                const avatar = student.querySelector('.student-avatar');
                if (avatar) avatar.textContent = '✕';
            }, i * 200);
        }
    });

    // Disrupt packets
    animationState.packets.forEach(packet => {
        if (Math.random() > 0.4) {
            packet.el.style.background = '#ef4444';
            if (Math.random() > 0.6) {
                packet.active = false;
            }
        }
    });

    // Start glitch text animation
    let glitchCount = 0;
    animationState.glitchInterval = setInterval(() => {
        elements.speech.innerHTML = DISRUPTION_TEXTS.glitch[glitchCount % DISRUPTION_TEXTS.glitch.length];
        glitchCount++;
    }, 400);

    // Restore connection after 5 seconds
    setTimeout(() => {
        clearInterval(animationState.glitchInterval);
        elements.speech.innerHTML = DISRUPTION_TEXTS.normal;
        elements.status.style.background = '#10b981';
        elements.status.innerHTML = '<div class="status-dot"></div><span>Connected</span>';
        elements.warning.style.display = 'none';
        elements.chatDisruption.style.display = 'none';
        elements.staticEl.style.opacity = '0';
        elements.videoFrame.style.filter = 'brightness(1)';
        
        // Restore students
        elements.students.forEach(student => {
            student.classList.remove('disrupted');
            const avatar = student.querySelector('.student-avatar');
            if (avatar) {
                avatar.textContent = student.textContent.trim()[0];
            }
        });

        // Restore packets
        animationState.packets.forEach(packet => {
            packet.el.style.background = '#10b981';
        });

        // Schedule next disruption
        setTimeout(triggerDisruption, 6000);
    }, 5000);
}

/**
 * Cleanup function to stop all animations
 */
function cleanupAnimations() {
    if (animationState.glitchInterval) {
        clearInterval(animationState.glitchInterval);
    }
    if (animationState.packetInterval) {
        clearInterval(animationState.packetInterval);
    }
    if (animationState.animationId) {
        cancelAnimationFrame(animationState.animationId);
    }
}

/**
 * Initialize Professor Class page with proper error handling and cleanup
 */
document.addEventListener('DOMContentLoaded', function() {
    try {
        setProgress(100);
        
        // Start packet animation
        animationState.packetInterval = setInterval(() => {
            if (Math.random() > 0.3) {
                animationState.packets.push(createPacket());
            }
        }, 200);

        animatePackets();
        
        // Start disruption simulation after 4 seconds
        setTimeout(triggerDisruption, 4000);
    } catch (error) {
        console.error('Professor Class page initialization error:', error);
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', cleanupAnimations);

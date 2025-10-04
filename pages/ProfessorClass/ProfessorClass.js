// Professor Class page specific functionality
function goBackToEarth() {
    window.location.href = '../Earth/Earth.html';
}

function nextAdventure() {
    if (confirm('🚀 Ready for the next adventure! Professor Pixel will guide you through more exciting space phenomena!\n\nWould you like to continue exploring?')) {
        window.location.href = '../Earth/Earth.html';
    }
}

function showSolution() {
    window.location.href = 'ProfSol.html';
}

// Get DOM elements
const speech = document.getElementById('speech');
const videoFrame = document.getElementById('videoFrame');
const staticEl = document.getElementById('static');
const status = document.getElementById('status');
const warning = document.getElementById('warning');
const chatDisruption = document.getElementById('chatDisruption');
const students = document.querySelectorAll('.student');

// Text content for disruption simulation
const normalText = "Today we're going to learn about the solar flare effects on satellite communications...";
const glitchTexts = [
    'Today we\'re going to learn about... <span class="glitch-text">zzzt</span>... the solar... <span class="glitch-text">bzzt</span>... flare effects on...',
    'T0d@y w3\'re... <span class="glitch-text">█████</span> ...s0l@r... <span class="glitch-text">░░░</span> ...fl@re eff3cts...',
    'Today... <span class="glitch-text">[SIGNAL LOST]</span> ...solar... <span class="glitch-text">[ERROR]</span> ...communications...',
    '▓▓▓... <span class="glitch-text">CONNECTION UNSTABLE</span> ...▓▓▓'
];

let packets = [];

function createPacket() {
    const packet = document.createElement('div');
    packet.className = 'packet-animation';
    const startX = Math.random() * window.innerWidth;
    packet.style.left = startX + 'px';
    packet.style.top = '0px';
    document.body.appendChild(packet);
    
    return {
        el: packet,
        y: 0,
        x: startX,
        speed: 2 + Math.random() * 3,
        active: true
    };
}

function animatePackets() {
    packets = packets.filter(p => {
        if (!p.active) {
            p.el.remove();
            return false;
        }
        
        p.y += p.speed;
        p.el.style.top = p.y + 'px';
        
        if (p.y > window.innerHeight) {
            p.el.remove();
            return false;
        }
        
        return true;
    });
    
    requestAnimationFrame(animatePackets);
}

function triggerDisruption() {
    status.style.background = '#ef4444';
    status.innerHTML = '<div class="status-dot"></div><span>Connection Lost</span>';
    warning.style.display = 'block';
    chatDisruption.style.display = 'block';
    staticEl.style.opacity = '0.6';
    
    videoFrame.style.filter = 'brightness(0.6)';
    
    students.forEach((student, i) => {
        if (Math.random() > 0.5) {
            setTimeout(() => {
                student.classList.add('disrupted');
                student.querySelector('.student-avatar').textContent = '✕';
            }, i * 200);
        }
    });

    packets.forEach(p => {
        if (Math.random() > 0.4) {
            p.el.style.background = '#ef4444';
            if (Math.random() > 0.6) {
                p.active = false;
            }
        }
    });

    let glitchCount = 0;
    const glitchInterval = setInterval(() => {
        speech.innerHTML = glitchTexts[glitchCount % glitchTexts.length];
        glitchCount++;
    }, 400);

    setTimeout(() => {
        clearInterval(glitchInterval);
        speech.innerHTML = normalText;
        status.style.background = '#10b981';
        status.innerHTML = '<div class="status-dot"></div><span>Connected</span>';
        warning.style.display = 'none';
        chatDisruption.style.display = 'none';
        staticEl.style.opacity = '0';
        videoFrame.style.filter = 'brightness(1)';
        
        students.forEach(student => {
            student.classList.remove('disrupted');
            const avatar = student.querySelector('.student-avatar');
            avatar.textContent = student.textContent.trim()[0];
        });

        packets.forEach(p => {
            p.el.style.background = '#10b981';
        });

        setTimeout(triggerDisruption, 6000);
    }, 5000);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    setProgress(100);
    
    // Start packet animation
    setInterval(() => {
        if (Math.random() > 0.3) {
            packets.push(createPacket());
        }
    }, 200);

    animatePackets();
    
    // Start disruption simulation after 4 seconds
    setTimeout(triggerDisruption, 4000);
});

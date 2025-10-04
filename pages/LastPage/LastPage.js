// Last Page functionality
function goBackToFamilyDinner() {
    window.location.href = '../FamilyDinner/FamilyDinner.html';
}

// Initialize Last Page
document.addEventListener('DOMContentLoaded', function() {
    setProgress(100);
    
    // Confetti celebration JS
    function launchConfetti() {
        const canvas = document.getElementById('confettiCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let pieces = [];
        for(let i=0;i<170;i++){
            pieces.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height/4,
                w: 8+Math.random()*11,
                h: 10+Math.random()*9,
                color: ["#ef6c1b","#ffde59","#41ead4","#de6bff","#fffac8","#a7ff83","#bde0fe"][Math.floor(Math.random()*7)],
                angle: Math.random()*2*Math.PI,
                speed: 1.25+Math.random()*2.3,
                drift: Math.random()*2
            });
        }
        function update(){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            for(let p of pieces){
                ctx.save();
                ctx.translate(p.x,p.y);
                ctx.rotate(p.angle);
                ctx.fillStyle = p.color;
                ctx.fillRect(0,0,p.w,p.h);
                ctx.restore();
                p.y += p.speed;
                p.x += Math.sin(p.angle)*p.drift;
                p.angle += Math.random()*0.05-0.025;
                if(p.y > canvas.height) {
                    p.y = -p.h;
                    p.x = Math.random() * canvas.width;
                }
            }
            requestAnimationFrame(update);
        }
        update();
        setTimeout(()=>{
            ctx.clearRect(0,0,canvas.width,canvas.height);
        },3300);
    }
    
    document.getElementById('adventureBtn').addEventListener('click', function() {
        launchConfetti();
        createFloatingStars();
        createSparkles();
        launchRockets();
        flashBackground();
        // Navigate back to Sun page after celebration
        setTimeout(() => { 
            window.location.href = '../Sun/Sun.html'; 
        }, 3500);
    });
    
    // Create floating stars
    function createFloatingStars() {
        const starEmojis = ['⭐', '✨', '🌟', '💫', '🌠'];
        for(let i = 0; i < 15; i++) {
            setTimeout(() => {
                const star = document.createElement('div');
                star.className = 'floating-star';
                star.textContent = starEmojis[Math.floor(Math.random() * starEmojis.length)];
                star.style.left = Math.random() * 100 + '%';
                star.style.bottom = '0';
                star.style.animationDelay = Math.random() * 0.3 + 's';
                document.body.appendChild(star);
                setTimeout(() => star.remove(), 3000);
            }, i * 100);
        }
    }
    
    // Create sparkle effects
    function createSparkles() {
        for(let i = 0; i < 30; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.style.left = Math.random() * 100 + '%';
                sparkle.style.top = Math.random() * 100 + '%';
                sparkle.style.animationDelay = Math.random() * 0.5 + 's';
                document.body.appendChild(sparkle);
                setTimeout(() => sparkle.remove(), 1500);
            }, i * 50);
        }
    }
    
    // Launch rockets across screen
    function launchRockets() {
        const rockets = ['🚀', '🛸', '🌌'];
        for(let i = 0; i < 3; i++) {
            setTimeout(() => {
                const rocket = document.createElement('div');
                rocket.className = 'rocket';
                rocket.textContent = rockets[i % rockets.length];
                rocket.style.left = '-50px';
                rocket.style.top = Math.random() * 80 + 10 + '%';
                rocket.style.animationDelay = i * 0.4 + 's';
                document.body.appendChild(rocket);
                setTimeout(() => rocket.remove(), 2500);
            }, i * 600);
        }
    }
    
    // Flash background effect
    function flashBackground() {
        const container = document.querySelector('.container');
        container.style.transition = 'all 0.3s';
        container.style.filter = 'brightness(1.4)';
        setTimeout(() => {
            container.style.filter = 'brightness(1)';
        }, 300);
    }
    
    // Optional: Animate button on load
    window.onload = () => {
        document.getElementById('adventureBtn').style.transform = 'scale(1.16)';
        setTimeout(()=>{document.getElementById('adventureBtn').style.transform='scale(1)';},300);
    };
    
    // Responsive confetti canvas
    window.addEventListener('resize', () => {
        const canvas = document.getElementById('confettiCanvas');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    });
});

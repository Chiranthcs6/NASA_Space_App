// Earth page specific functionality
function goBackToSun() {
    window.location.href = '../Sun/Sun.html';
}

function followCharacter(character) {
    console.log('followCharacter called with:', character);
    
    let message = '';
    let nextAction = '';
    
    switch(character) {
        case 'grandpa':
            console.log('Grandpa case matched - attempting redirect...');
            try {
                window.location.href = '../Grandpa/Grandpa.html';
                console.log('Redirect command sent');
            } catch (error) {
                console.error('Redirect error:', error);
                alert('Error: Could not redirect to Grandpa page. Check if Grandpa/Grandpa.html exists.');
            }
            return;
            
        case 'skywave':
            console.log('Skywave case matched - attempting redirect...');
            try {
                window.location.href = '../Captian/Captian.html';  
                console.log('Redirect to Skywave sent');
            } catch (error) {
                console.error('Redirect error:', error);
                alert('Error: Could not redirect to Skywave page. Check if Skywave/Skywave.html exists.');
            }
            return;
            
        case 'professor':
            message = '👨‍🏫 Learning with Professor Pixel!';
            nextAction = 'Continue learning...';
            break;
            
        case 'kiran':
            message = '🚀 Exploring Space with Kiran!';
            nextAction = 'Continue the space adventure...';
            break;
            
        default:
            console.log('Unknown character:', character);
            alert('Choose a character to follow!');
            return;
    }
    
    if (confirm(message + '\n\n' + nextAction)) {
        alert('Story completed!');
    }
}

// Initialize Earth page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Earth page loaded');
    setProgress(100);
});

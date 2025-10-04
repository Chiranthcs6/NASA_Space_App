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
                window.location.href = '../Captian/Captian.html';  // CORRECT: Points to Captain folder with Captain.html
                console.log('Redirect to Skywave/Captain sent');
            } catch (error) {
                console.error('Redirect error:', error);
                alert('Error: Could not redirect to Captain page. Check if Captian/Captian.html exists.');
            }
            return;
            
        case 'professor':
            console.log('Professor case matched - attempting redirect...');
            try {
                window.location.href = '../ProfessorClass/ProfessorClass.html';  // UPDATED: Redirect to Professor page
                console.log('Redirect to Professor sent');
            } catch (error) {
                console.error('Redirect error:', error);
                alert('Error: Could not redirect to Professor page. Check if Professor/Professor.html exists.');
            }
            return;
            
        case 'kiran':
            console.log('Kiran case matched - attempting redirect...');
            try {
                window.location.href = '../Kiran/Kiran.html';  // UPDATED: Redirect to Communication page
                console.log('Redirect to Communication sent');
            } catch (error) {
                console.error('Redirect error:', error);
                alert('Error: Could not redirect to Communication page. Check if Communication/Communication.html exists.');
            }
            return;
            
        default:
            console.log('Unknown character:', character);
            alert('Choose a character to follow!');
            return;
    }
}

// Initialize Earth page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Earth page loaded');
    setProgress(100);
});

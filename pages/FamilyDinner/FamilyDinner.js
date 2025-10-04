// Space Dinner page specific functionality
function goBackToFamilyDinner() {
    window.location.href = '../Kiran/Sol.html';
}

function openStory() {
    document.getElementById('storyModal').classList.add('active');
}

function closeStory() {
    document.getElementById('storyModal').classList.remove('active');
}

// Initialize Space Dinner page
document.addEventListener('DOMContentLoaded', function() {
    setProgress(100);
    
    // Close modal when clicking outside the content
    document.getElementById('storyModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeStory();
        }
    });
});

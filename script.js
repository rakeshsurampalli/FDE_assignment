// Interactive Assignment JavaScript
let currentQuestion = 1;

// Initialize the presentation
document.addEventListener('DOMContentLoaded', function() {
    updateNavigationState();
});

// Show specific question
function showQuestion(questionId) {
    // Hide all question contents
    const allContents = document.querySelectorAll('.question-content');
    allContents.forEach(content => content.classList.remove('active'));
    
    // Remove active class from all nav buttons
    const allButtons = document.querySelectorAll('.nav-btn');
    allButtons.forEach(btn => btn.classList.remove('active'));
    
    // Show selected question content
    document.getElementById(questionId + '-content').classList.add('active');
    
    // Add active class to selected button
    document.getElementById('btn-' + questionId).classList.add('active');
    
    // Update current question number
    currentQuestion = questionId === 'q1' ? 1 : 2;
    
    // Update navigation state
    updateNavigationState();
    
    // Add smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Navigate to next question
function nextQuestion() {
    if (currentQuestion < 2) {
        currentQuestion++;
        showQuestion('q' + currentQuestion);
    }
}

// Navigate to previous question
function previousQuestion() {
    if (currentQuestion > 1) {
        currentQuestion--;
        showQuestion('q' + currentQuestion);
    }
}

// Update navigation button states
function updateNavigationState() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    // Disable/enable previous button
    prevBtn.disabled = currentQuestion === 1;
    prevBtn.style.opacity = currentQuestion === 1 ? '0.5' : '1';
    
    // Disable/enable next button
    nextBtn.disabled = currentQuestion === 2;
    nextBtn.style.opacity = currentQuestion === 2 ? '0.5' : '1';
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight' && currentQuestion < 2) {
        nextQuestion();
    } else if (event.key === 'ArrowLeft' && currentQuestion > 1) {
        previousQuestion();
    }
});

// Add smooth transitions for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to answer cards
    const answerCards = document.querySelectorAll('.answer-card');
    answerCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
        });
    });
    
    // Add click animation to navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
});

// Progress tracking (optional enhancement)
function trackProgress() {
    const q1Completed = document.getElementById('q1-content').querySelector('.answer-content').innerText.trim() !== '';
    const q2Completed = document.getElementById('q2-content').querySelector('.answer-content').innerText.trim() !== '';
    
    const totalProgress = (q1Completed ? 50 : 0) + (q2Completed ? 50 : 0);
    
    // Update progress bars
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        if (bar.closest('#q1-content')) {
            bar.style.width = q1Completed ? '100%' : '50%';
        } else if (bar.closest('#q2-content')) {
            bar.style.width = q2Completed ? '100%' : '50%';
        }
    });
}

// Auto-save functionality (saves to localStorage)
function autoSave() {
    const q1Content = document.getElementById('q1-content').innerHTML;
    const q2Content = document.getElementById('q2-content').innerHTML;
    
    localStorage.setItem('fde_assignment_q1', q1Content);
    localStorage.setItem('fde_assignment_q2', q2Content);
}

// Load saved content on page load
function loadSavedContent() {
    const savedQ1 = localStorage.getItem('fde_assignment_q1');
    const savedQ2 = localStorage.getItem('fde_assignment_q2');
    
    if (savedQ1) {
        document.getElementById('q1-content').innerHTML = savedQ1;
    }
    if (savedQ2) {
        document.getElementById('q2-content').innerHTML = savedQ2;
    }
}

// Print/Export functionality
function printAssignment() {
    window.print();
}

// Add export button (you can call this function from a button)
function exportToPDF() {
    // This would require a PDF library like jsPDF or html2pdf
    // For now, we'll use the browser's print to PDF functionality
    window.print();
}
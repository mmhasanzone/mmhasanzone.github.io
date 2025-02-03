// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add active class to navigation links on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Gemini API configuration
const GEMINI_API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key
const genAI = new window.GoogleGenerativeAI(GEMINI_API_KEY);

// Function to generate questions using Gemini
async function generateQuestions(topic) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        const prompt = `Generate 5 practice questions about ${topic} in Bengali language. 
                       Format each question with a number.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        displayQuestions(text);
    } catch (error) {
        console.error('Error generating questions:', error);
        alert('Error generating questions. Please try again.');
    }
}

// Function to display generated questions
function displayQuestions(questions) {
    const questionsContainer = document.getElementById('questions-container');
    if (questionsContainer) {
        questionsContainer.innerHTML = `<div class="generated-questions">${questions}</div>`;
    }
}

// Event listener for question generation
document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generate-questions');
    if (generateButton) {
        generateButton.addEventListener('click', () => {
            const topic = document.getElementById('topic-input').value;
            if (topic) {
                generateQuestions(topic);
            } else {
                alert('Please enter a topic first');
            }
        });
    }
});

// Simple form validation for contact form (if added later)
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add form validation logic here
            alert('Message sent successfully!');
        });
    }
});

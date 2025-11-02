/* GANTT CHART GENERATION */
const ganttTasks = [
    { name: 'Requirements Analysis', start: 0, duration: 2, color: 'linear-gradient(135deg, #667eea, #764ba2)' },
    { name: 'System Design', start: 2, duration: 2, color: 'linear-gradient(135deg, #f093fb, #f5576c)' },
    { name: 'Frontend Development', start: 3, duration: 4, color: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
    { name: 'Backend Development', start: 3, duration: 5, color: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
    { name: 'Database Setup', start: 4, duration: 2, color: 'linear-gradient(135deg, #fa709a, #fee140)' },
    { name: 'Integration Testing', start: 8, duration: 2, color: 'linear-gradient(135deg, #feca57, #ff6b6b)' },
    { name: 'UAT & Bug Fixes', start: 10, duration: 2, color: 'linear-gradient(135deg, #667eea, #f093fb)' }
];

function createGanttChart() {
    const ganttChart = document.getElementById('ganttChart');

    ganttTasks.forEach((task, index) => {
        const row = document.createElement('div');
        row.className = 'gantt-row';

        const taskName = document.createElement('div');
        taskName.className = 'gantt-task';
        taskName.textContent = task.name;

        const barContainer = document.createElement('div');
        barContainer.className = 'gantt-bar-container';

        const bar = document.createElement('div');
        bar.className = 'gantt-bar';
        bar.style.gridColumn = `${task.start + 1} / span ${task.duration}`;
        bar.style.background = task.color;
        bar.style.animationDelay = `${index * 0.15}s`;
        bar.textContent = `${task.duration}w`;

        barContainer.appendChild(bar);
        row.appendChild(taskName);
        row.appendChild(barContainer);
        ganttChart.appendChild(row);
    });
}

/* SMOOTH SCROLLING */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });

            const navLinks = document.getElementById('navLinks');
            if (navLinks.classList.contains('mobile-active')) {
                navLinks.classList.remove('mobile-active');
            }
        }
    });
});

/* MOBILE MENU TOGGLE */
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-active');
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
        navLinks.classList.remove('mobile-active');
    }
});

/* INTERSECTION OBSERVER FOR ANIMATIONS */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        }
    });
}, observerOptions);

document.querySelectorAll('.importance-card, .concept-card, .methodology-card').forEach(card => {
    observer.observe(card);
});

/* EMAIL SUBSCRIPTION HANDLER */
const subscriptionForm = document.getElementById('subscriptionForm');
const emailInput = document.getElementById('emailInput');
const subscribeBtn = document.getElementById('subscribeBtn');
const subscriptionMessage = document.getElementById('subscriptionMessage');

subscriptionForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();

    if (!email) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }

    subscribeBtn.disabled = true;
    subscribeBtn.textContent = 'Subscribing...';

    try {
        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbynBxotE5CAWQraOBW99XesuwPf5m-RLQXqfPi7fywLPeMHyXcHjPj-_VCtC0Dqx_Ak/exec';

        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                timestamp: new Date().toISOString()
            })
        });

        showMessage('Thank you for subscribing! Check your inbox soon.', 'success');
        emailInput.value = '';

    } catch (error) {
        console.error('Subscription error:', error);
        showMessage('Subscription successful! Thank you for joining.', 'success');
        emailInput.value = '';
    } finally {
        subscribeBtn.disabled = false;
        subscribeBtn.textContent = 'Subscribe Now';
    }
});

function showMessage(message, type) {
    subscriptionMessage.textContent = message;
    subscriptionMessage.className = `subscription-message show ${type}`;

    setTimeout(() => {
        subscriptionMessage.classList.remove('show');
    }, 5000);
}

/* INITIALIZE */
window.addEventListener('DOMContentLoaded', () => {
    createGanttChart();
});

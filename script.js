// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeProgressBars();
    initializeDataExplorer();
    initializeCounterAnimations();
    initializeTooltips();
});

// Data for different categories
const explorerData = {
    general: {
        title: 'General Information',
        data: [
            { label: 'Province', value: 'Córdoba, Andalusia' },
            { label: 'Elevation', value: '123 meters above sea level' },
            { label: 'Time Zone', value: 'CET (UTC+1)' },
            { label: 'Mayor', value: 'José María Bellido Roche' },
            { label: 'Official Language', value: 'Spanish' },
            { label: 'Area Code', value: '+34 957' },
            { label: 'Postal Code', value: '14001-14099' }
        ]
    },
    demographics: {
        title: 'Demographics',
        data: [
            { label: 'Population Density', value: '260 people per km²' },
            { label: 'Male Population', value: '48.7% (158,761)' },
            { label: 'Female Population', value: '51.3% (167,155)' },
            { label: 'Average Age', value: '42.3 years' },
            { label: 'Birth Rate', value: '8.9 per 1,000 inhabitants' },
            { label: 'Immigration Rate', value: '12.4% foreign residents' },
            { label: 'Education Level', value: '67% higher education' }
        ]
    },
    tourism: {
        title: 'Tourism Statistics',
        data: [
            { label: 'Annual Visitors', value: '2.1 million tourists' },
            { label: 'Hotel Occupancy', value: '68.5% average' },
            { label: 'Tourist Season', value: 'March to November' },
            { label: 'Main Attractions', value: 'Mezquita, Alcázar, Jewish Quarter' },
            { label: 'Tourist Spend', value: '€215 per visitor per day' },
            { label: 'Hotel Rooms', value: '8,420 available beds' },
            { label: 'UNESCO Sites', value: '1 World Heritage Site' }
        ]
    },
    culture: {
        title: 'Cultural Heritage',
        data: [
            { label: 'Museums', value: '15 major museums' },
            { label: 'Historic Monuments', value: '300+ protected buildings' },
            { label: 'Cultural Events', value: '50+ annual festivals' },
            { label: 'Art Galleries', value: '25 contemporary galleries' },
            { label: 'Theater Venues', value: '8 active theaters' },
            { label: 'Libraries', value: '12 public libraries' },
            { label: 'Flamenco Schools', value: '20+ traditional schools' }
        ]
    }
};

// Initialize progress bars with animation
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    // Animate progress bars when they come into view
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const percentage = progressBar.getAttribute('data-percent');
                
                // Set the width and animate
                setTimeout(() => {
                    progressBar.style.width = percentage + '%';
                    progressBar.classList.add('animate');
                }, 300);
                
                observer.unobserve(progressBar);
            }
        });
    }, observerOptions);
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Initialize data explorer functionality
function initializeDataExplorer() {
    const buttons = document.querySelectorAll('.explorer-controls .btn');
    const content = document.getElementById('explorerContent');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get category and update content
            const category = this.getAttribute('data-category');
            updateExplorerContent(category);
        });
    });
}

// Update explorer content based on category
function updateExplorerContent(category) {
    const content = document.getElementById('explorerContent');
    const data = explorerData[category];
    
    if (!data) return;
    
    // Fade out current content
    content.style.opacity = '0';
    content.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        // Update content
        content.innerHTML = `
            <div class="data-display">
                <h3>${data.title}</h3>
                <ul>
                    ${data.data.map(item => 
                        `<li><strong>${item.label}:</strong> ${item.value}</li>`
                    ).join('')}
                </ul>
            </div>
        `;
        
        // Fade in new content
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
    }, 200);
}

// Initialize counter animations for data values
function initializeCounterAnimations() {
    const dataValues = document.querySelectorAll('.data-value');
    
    const observerOptions = {
        threshold: 0.7
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    dataValues.forEach(value => {
        observer.observe(value);
    });
}

// Animate counter for numerical values
function animateCounter(element) {
    const text = element.textContent;
    const numberMatch = text.match(/[\d,]+/);
    
    if (!numberMatch) return;
    
    const number = parseInt(numberMatch[0].replace(/,/g, ''));
    const suffix = text.replace(numberMatch[0], '');
    const prefix = text.substring(0, text.indexOf(numberMatch[0]));
    
    if (isNaN(number)) return;
    
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentNumber = Math.floor(number * easeOutQuart);
        
        element.textContent = prefix + currentNumber.toLocaleString() + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = text; // Ensure final value is exact
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Initialize tooltips for enhanced user experience
function initializeTooltips() {
    const dataCards = document.querySelectorAll('.data-card');
    
    dataCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle hover effect with scale
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Smooth scrolling for internal links (if any are added later)
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Weather widget (placeholder for future API integration)
function updateWeatherData() {
    // This would typically fetch real weather data from an API
    const weatherData = {
        temperature: '24°C',
        condition: 'Sunny',
        humidity: '45%',
        windSpeed: '12 km/h'
    };
    
    // Update weather display if element exists
    const weatherElement = document.getElementById('weather-display');
    if (weatherElement) {
        weatherElement.innerHTML = `
            <div class="weather-info">
                <span class="temp">${weatherData.temperature}</span>
                <span class="condition">${weatherData.condition}</span>
            </div>
        `;
    }
}

// Add some interactive features to the site cards
document.addEventListener('DOMContentLoaded', function() {
    const siteCards = document.querySelectorAll('.site-card');
    
    siteCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a subtle click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Add transition styles to content
    const explorerContent = document.getElementById('explorerContent');
    if (explorerContent) {
        explorerContent.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', function(event) {
    if (event.key === 'Tab') {
        // Enhance keyboard navigation by adding focus styles
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Performance optimization: Debounce resize events
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Recalculate layouts if needed
        initializeProgressBars();
    }, 250);
});

// Add some fun interactive elements
function addEasterEgg() {
    let clickCount = 0;
    const title = document.querySelector('.header h1');
    
    title.addEventListener('click', function() {
        clickCount++;
        if (clickCount === 5) {
            this.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)';
            this.style.backgroundSize = '400% 400%';
            this.style.animation = 'gradient 3s ease infinite';
            this.style.webkitBackgroundClip = 'text';
            this.style.webkitTextFillColor = 'transparent';
            
            // Add the gradient animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `;
            document.head.appendChild(style);
            
            setTimeout(() => {
                this.style = '';
                clickCount = 0;
            }, 5000);
        }
    });
}

// Initialize easter egg
document.addEventListener('DOMContentLoaded', addEasterEgg);
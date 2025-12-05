// =======================
// Smooth Scrolling
// =======================
document.querySelectorAll("nav a, .btn, .btn2, .btn-whatsapp, .vote-button").forEach(link => {
    link.addEventListener("click", function(e) {
        if (this.getAttribute("href").startsWith("#")) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});


// =======================
// Scroll To Top Button
// =======================
let scrollBtn = document.createElement("button");
scrollBtn.textContent = "↑";
scrollBtn.id = "scrollTopBtn";
scrollBtn.style.cssText = `
    position: fixed;
    bottom: 25px;
    right: 25px;
    background: linear-gradient(135deg, #006B3F, #00512E);
    color:white;
    padding:10px 14px;
    border:none;
    border-radius:50%;
    font-size:18px;
    cursor:pointer;
    display:none;
    z-index:999;
    box-shadow: 0 4px 12px rgba(45, 80, 22, 0.3);
`;
document.body.appendChild(scrollBtn);

window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 400 ? "block" : "none";
});
scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


// =======================
// WhatsApp Quick Message Popup
// =======================
function openWhatsApp() {
    const defaultMessage = encodeURIComponent("Hello Frank, I would like to support your campaign.");
    window.open(`https://wa.me/265993054495?text=${defaultMessage}`, "_blank");
}

// Example trigger if needed:
// document.querySelector(".btn-whatsapp").addEventListener("click", openWhatsApp);


// =======================
// Animation on Scroll
// =======================
const sections = document.querySelectorAll("section, .manifesto-box, #about, #commitment li");

const revealOnScroll = () => {
    sections.forEach(sec => {
        const top = sec.getBoundingClientRect().top;
        if (top < window.innerHeight - 120) {
            sec.style.opacity = "1";
            sec.style.transform = "translateY(0)";
        }
    });
};

sections.forEach(sec => {
    sec.style.opacity = "0";
    sec.style.transform = "translateY(30px)";
    sec.style.transition = "0.8s ease-out";
});

window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // run once on load

// =======================
// Vote banner pulse animation (always visible)
// =======================
document.addEventListener('DOMContentLoaded', () => {
    const voteText = document.querySelector('.vote-text');
    if (!voteText) return;

    // Add typing class to start pulse animation
    voteText.classList.add('typing');
});

// Mobile nav toggle behavior
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.primary-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!expanded));
        nav.classList.toggle('open');
    });

    // Close menu when a nav link is clicked
    nav.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            nav.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
});

// =======================
// COUNTDOWN TIMER
// =======================
function startCountdown() {
    // Election day: December 18, 2025 at 12:00 PM
    const electionDay = new Date('2025-12-18T12:00:00').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = electionDay - now;

        if (distance < 0) {
            document.getElementById('days').textContent = '0';
            document.getElementById('hours').textContent = '0';
            document.getElementById('minutes').textContent = '0';
            document.getElementById('seconds').textContent = '0';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// =======================
// ANIMATED COUNTERS (on scroll into view)
// =======================
function animateCounters() {
    const counters = document.querySelectorAll('.counter-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                let current = 0;
                const increment = Math.ceil(target / 30); // animate over 30 steps
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    entry.target.textContent = current;
                }, 30);
                entry.target.classList.add('counted');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

// =======================
// FORM VALIDATION & SUBMISSION
// =======================
function setupFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');
    const successMsg = document.getElementById('successMsg');

    const validateName = () => {
        const error = document.getElementById('nameError');
        if (nameInput.value.trim().length < 2) {
            error.textContent = 'Name must be at least 2 characters.';
            nameInput.classList.add('error');
            return false;
        }
        error.textContent = '';
        nameInput.classList.remove('error');
        return true;
    };

    const validateEmail = () => {
        const error = document.getElementById('emailError');
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(emailInput.value)) {
            error.textContent = 'Please enter a valid email address.';
            emailInput.classList.add('error');
            return false;
        }
        error.textContent = '';
        emailInput.classList.remove('error');
        return true;
    };

    const validateMessage = () => {
        const error = document.getElementById('messageError');
        if (messageInput.value.trim().length < 5) {
            error.textContent = 'Message must be at least 5 characters.';
            messageInput.classList.add('error');
            return false;
        }
        error.textContent = '';
        messageInput.classList.remove('error');
        return true;
    };

    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    messageInput.addEventListener('blur', validateMessage);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        if (isNameValid && isEmailValid && isMessageValid) {
            successMsg.textContent = '✓ Thank you! Your message will help me continue this mission.';
            successMsg.style.color = '#4CAF50';
            setTimeout(() => {
                form.reset();
                successMsg.textContent = '';
            }, 3000);
        }
    });
}

// =======================
// PARALLAX SCROLL EFFECT
// =======================
function initParallaxScroll() {
    const parallaxBg = document.querySelector('.hero-bg-parallax');
    if (!parallaxBg) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        parallaxBg.style.backgroundPosition = `center ${scrollY * 0.5}px`;
    });
}

// =======================
// UNIQUE VISITOR COUNTER
// =======================
function animateLiveSupporterCount() {
    const counter = document.getElementById('supporterCount');
    if (!counter) return;

    // Generate unique visitor ID for this device/browser
    const generateVisitorId = () => {
        return 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    };

    // Get or create visitor ID
    let visitorId = localStorage.getItem('frank_adriano_visitor_id');
    if (!visitorId) {
        visitorId = generateVisitorId();
        localStorage.setItem('frank_adriano_visitor_id', visitorId);
    }

    // Get current global visitor count
    let globalCount = parseInt(localStorage.getItem('frank_adriano_global_visitors') || '0');

    // Check if this is a new unique visitor
    const visitedVisitors = JSON.parse(localStorage.getItem('frank_adriano_visited_ids') || '[]');
    const isNewVisitor = !visitedVisitors.includes(visitorId);

    if (isNewVisitor) {
        // Increment global count for new visitor
        globalCount += 1;
        localStorage.setItem('frank_adriano_global_visitors', globalCount.toString());

        // Add this visitor to the visited list
        visitedVisitors.push(visitorId);
        localStorage.setItem('frank_adriano_visited_ids', JSON.stringify(visitedVisitors));
    }

    // Set minimum count to show momentum
    const targetCount = Math.max(globalCount, 50);

    let current = 0;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && current === 0) {
                const increment = Math.ceil(targetCount / 40);
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= targetCount) {
                        current = targetCount;
                        clearInterval(timer);
                    }
                    counter.textContent = current;
                }, 40);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(counter);
}

// =======================
// FAQ ACCORDION TOGGLE
// =======================
function setupFaqAccordion() {
    const faqToggles = document.querySelectorAll('.faq-toggle');
    
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            const targetId = toggle.getAttribute('aria-controls');
            const answerDiv = document.getElementById(targetId);
            
            if (!answerDiv) return;

            // Close all other open items
            faqToggles.forEach(other => {
                if (other !== toggle) {
                    other.setAttribute('aria-expanded', 'false');
                    const otherId = other.getAttribute('aria-controls');
                    const otherDiv = document.getElementById(otherId);
                    if (otherDiv) otherDiv.hidden = true;
                }
            });

            // Toggle current item
            toggle.setAttribute('aria-expanded', String(!isExpanded));
            answerDiv.hidden = isExpanded;
        });
    });
}

// =======================
// MOBILE FAB SMOOTH SCROLL
// =======================
function setupMobileFab() {
    const fab = document.getElementById('mobileFab');
    if (!fab) return;

    fab.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = fab.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    startCountdown();
    animateCounters();
    setupFormValidation();
    initParallaxScroll();
    animateLiveSupporterCount();
    setupFaqAccordion();
    setupMobileFab();
    setupShareButton();
    initLegacyToggle();
});
// end of DOMContentLoaded initialization

// =======================
// SHARE BUTTON FUNCTIONALITY
// =======================
function setupShareButton() {
    const shareBtn = document.getElementById('shareBtn');
    if (!shareBtn) return;

    const shareData = {
        title: 'Frank Adriano – FAFASA Speaker 2025',
        text: 'Support Frank Adriano for FAFASA Speaker — a voice for transparency, fairness and unity. Vote for change!',
        url: window.location.href
    };

    shareBtn.addEventListener('click', async () => {
        try {
            // Check if Web Share API is supported
            if (navigator.share) {
                await navigator.share(shareData);
                showShareFeedback('Shared successfully!');
            } else {
                // Fallback: Copy to clipboard
                await navigator.clipboard.writeText(shareData.url);
                showShareFeedback('Link copied to clipboard!');
            }
        } catch (error) {
            console.error('Error sharing:', error);
            // Fallback for older browsers: manual copy
            try {
                const textArea = document.createElement('textarea');
                textArea.value = shareData.url;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showShareFeedback('Link copied to clipboard!');
            } catch (fallbackError) {
                console.error('Fallback copy failed:', fallbackError);
                showShareFeedback('Please copy the URL manually: ' + shareData.url);
            }
        }
    });
}

function showShareFeedback(message) {
    // Create a temporary feedback message
    const feedback = document.createElement('div');
    feedback.textContent = message;
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-weight: bold;
        animation: slideIn 0.3s ease-out;
    `;

    // Add slide-in animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(feedback);

    // Remove after 3 seconds
    setTimeout(() => {
        feedback.style.animation = 'slideIn 0.3s ease-in reverse';
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 300);
    }, 3000);
}

// =======================
// Legacy view toggle + simple typing animation
// =======================
function initLegacyToggle() {
    const toggle = document.getElementById('legacyToggle');
    if (!toggle) return;

    let legacyLink = null;
    let typingTimer = null;

    const startTyping = () => {
        const el = document.querySelector('.vote-text');
        if (!el) return;
        const full = el.dataset.fullText || el.textContent;
        el.dataset.fullText = full;
        el.textContent = '';
        el.classList.add('legacy-caret');
        let i = 0;
        typingTimer = setInterval(() => {
            el.textContent += full[i] || '';
            i++;
            if (i > full.length) {
                clearInterval(typingTimer);
                typingTimer = null;
            }
        }, 40);
    };

    const stopTyping = () => {
        const el = document.querySelector('.vote-text');
        if (!el) return;
        if (typingTimer) {
            clearInterval(typingTimer);
            typingTimer = null;
        }
        el.classList.remove('legacy-caret');
        if (el.dataset.fullText) el.textContent = el.dataset.fullText;
    };

    toggle.addEventListener('click', () => {
        const pressed = toggle.getAttribute('aria-pressed') === 'true';
        if (!pressed) {
            // enable legacy (stylesheet already loaded in HTML)
            toggle.setAttribute('aria-pressed', 'true');
            toggle.textContent = 'Modern View';
            // start typing
            stopTyping();
            startTyping();
            document.body.classList.add('legacy-social');
        } else {
            // disable legacy
            toggle.setAttribute('aria-pressed', 'false');
            toggle.textContent = 'Legacy View';
            stopTyping();
            document.body.classList.remove('legacy-social');
        }
    });

    // Auto-enable legacy mode on page load (legacy stylesheet already loaded in HTML)
    toggle.setAttribute('aria-pressed', 'true');
    toggle.textContent = 'Modern View';
    document.body.classList.add('legacy-social');
    startTyping();
}

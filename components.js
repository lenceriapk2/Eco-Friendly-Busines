// Reusable Components for EcoSustainable.co.uk

// Header Component
function createHeader() {
    return `
        <header class="header">
            <div class="container">
                <div class="header-content">
                    <div class="logo">
                        <a href="index.html">
                            <img src="attached_assets/www.ecosustainable.co.uk_version_1-removebg-preview.png" 
                                 alt="EcoSustainable.co.uk" 
                                 class="logo-image">
                        </a>
                    </div>

                    <nav class="nav-menu" id="navMenu">
                        <ul>
                            <li><a href="index.html" class="nav-link">Home</a></li>
                            <li><a href="cities.html" class="nav-link">Browse Cities</a></li>
                            <li><a href="how-it-works.html" class="nav-link">How It Works</a></li>
                            <li><a href="sustainability-report.html" class="nav-link">Sustainability</a></li>
                            <li><a href="about-us.html" class="nav-link">About</a></li>
                            <li><a href="contact-us.html" class="nav-link">Contact</a></li>
                        </ul>
                    </nav>

                    <div class="header-actions">
                        <button class="mobile-menu-toggle hamburger" id="mobileMenuToggle" aria-label="Toggle mobile menu">
                            <span class="hamburger-bar"></span>
                            <span class="hamburger-bar"></span>
                            <span class="hamburger-bar"></span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    `;
}

// Footer Component
function createFooter() {
    return `
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section footer-brand">
                        <a href="index.html" class="footer-logo">
                            <img src="attached_assets/www.ecosustainable.co.uk_version_1-removebg-preview.png" 
                                 alt="EcoSustainable.co.uk" 
                                 class="footer-logo-image">
                        </a>
                        <p>Your trusted directory for sustainable businesses across the UK. Connecting you with eco-friendly companies that care about our planet.</p>
                        
                        <div class="eco-credentials">
                            <div class="credential-item">
                                <i class="fas fa-leaf"></i>
                                <span>Carbon Neutral Platform</span>
                            </div>
                            <div class="credential-item">
                                <i class="fas fa-solar-panel"></i>
                                <span>100% Renewable Energy</span>
                            </div>
                            <div class="credential-item">
                                <i class="fas fa-recycle"></i>
                                <span>Zero Waste Operations</span>
                            </div>
                        </div>
                        
                        <div class="social-links">
                            <a href="#" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
                            <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                            <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                            <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                        </div>
                    </div>

                    <div class="footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li><a href="cities.html">Browse Cities</a></li>
                            <li><a href="about-us.html">About Us</a></li>
                            <li><a href="contact-us.html">Contact</a></li>
                            <li><a href="how-it-works.html">How It Works</a></li>
                        </ul>
                    </div>

                    <div class="footer-section">
                        <h4>Popular Cities</h4>
                        <ul>
                            <li><a href="london.html">London</a></li>
                            <li><a href="manchester.html">Manchester</a></li>
                            <li><a href="birmingham.html">Birmingham</a></li>
                            <li><a href="edinburgh.html">Edinburgh</a></li>
                            <li><a href="bristol.html">Bristol</a></li>
                            <li><a href="glasgow.html">Glasgow</a></li>
                        </ul>
                    </div>

                    <div class="footer-section">
                        <h4>Environmental</h4>
                        <ul>
                            <li><a href="environmental-policy.html">Environmental Policy</a></li>
                            <li><a href="sustainability-report.html">Sustainability Report</a></li>
                            <li><a href="privacy-policy.html">Privacy Policy</a></li>
                            <li><a href="terms-of-service.html">Terms of Service</a></li>
                            <li><a href="cookie-policy.html">Cookie Policy</a></li>
                            <li><a href="sitemap.html">Sitemap</a></li>
                        </ul>
                    </div>
                </div>

                <div class="footer-bottom">
                    <div class="footer-bottom-content">
                        <div class="footer-left">
                            <p>&copy; 2024 EcoSustainable.co.uk. All rights reserved.</p>
                            <p>🌱 Committed to Environmental Protection & Climate Action</p>
                        </div>
                        <div class="footer-right">
                            <p>🌍 Promoting Sustainable Development Goals</p>
                            <p>♻️ Supporting UK's Net Zero Carbon Target 2050</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    `;
}

// Mobile Navigation Handler
function initializeMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        // Clear any existing event listeners
        const newHamburger = hamburger.cloneNode(true);
        hamburger.parentNode.replaceChild(newHamburger, hamburger);

        // Add click event to hamburger
        newHamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Close menu when clicking outside (except hamburger)
        document.addEventListener('click', function(event) {
            const hamburgerElement = document.querySelector('.hamburger');
            if (!hamburgerElement.contains(event.target) && 
                !navMenu.contains(event.target) && 
                navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }
}

function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    if (hamburger && navMenu) {
        const isActive = hamburger.classList.contains('active');
        
        if (isActive) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.style.overflow = '';
        } else {
            hamburger.classList.add('active');
            navMenu.classList.add('active');
            body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }
}

function closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = '';
    }
}

// Smooth scrolling for navigation links
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize components when DOM is loaded
function initializeComponents() {
    // Load header
    const headerElement = document.getElementById('header-component');
    if (headerElement) {
        headerElement.innerHTML = createHeader();
    }

    // Load footer
    const footerElement = document.getElementById('footer-component');
    if (footerElement) {
        footerElement.innerHTML = createFooter();
    }

    // Initialize mobile navigation after header is loaded
    setTimeout(() => {
        initializeMobileNav();
        initializeSmoothScroll();
    }, 100);
}

// Export functions for use in other files
window.EcoComponents = {
    createHeader,
    createFooter,
    initializeComponents,
    initializeMobileNav,
    initializeSmoothScroll
};

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeComponents();
});
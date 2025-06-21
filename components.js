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
                            <li><a href="about-us.html" class="nav-link">About Us</a></li>
                            <li><a href="contact-us.html" class="nav-link">Contact</a></li>
                        </ul>
                    </nav>

                    <div class="header-actions">
                        <button class="mobile-menu-toggle hamburger" id="mobileMenuToggle" aria-label="Toggle mobile menu">
                            <span></span>
                            <span></span>
                            <span></span>
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
                        <h4>Legal</h4>
                        <ul>
                            <li><a href="#privacy">Privacy Policy</a></li>
                            <li><a href="#terms">Terms of Service</a></li>
                            <li><a href="#cookies">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>

                <div class="footer-bottom">
                    <div class="footer-bottom-content">
                        <p>&copy; 2024 EcoSustainable.co.uk. All rights reserved.</p>
                        <p>Promoting sustainable businesses across the United Kingdom</p>
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
        // Remove any existing event listeners
        hamburger.removeEventListener('click', toggleMobileMenu);

        // Add new event listener
        hamburger.addEventListener('click', toggleMobileMenu);

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.removeEventListener('click', closeMobileMenu);
            link.addEventListener('click', closeMobileMenu);
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }
}

function closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
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

// Business Categories Data
const businessCategories = {
    'home-living': {
        name: '🏠 Home & Living',
        icon: 'fas fa-home',
        subcategories: [
            'Sustainable Furniture',
            'Organic Bedding & Mattresses',
            'Eco Home Decor',
            'Zero-Waste Home Goods',
            'Recycled/Upcycled Homeware',
            'Eco-Friendly Cleaning Products'
        ]
    },
    'fashion-accessories': {
        name: '👗 Fashion & Accessories',
        icon: 'fas fa-tshirt',
        subcategories: [
            'Sustainable Clothing Brands',
            'Ethical Footwear',
            'Organic Cotton Apparel',
            'Upcycled Fashion',
            'Vegan Bags & Accessories',
            'Slow Fashion Brands'
        ]
    },
    'food-beverage': {
        name: '🍽️ Food & Beverage',
        icon: 'fas fa-utensils',
        subcategories: [
            'Organic Grocery Stores',
            'Plant-Based & Vegan Restaurants',
            'Zero-Waste Cafes',
            'Sustainable Farms & Markets',
            'Local Food Co-ops',
            'Eco-Friendly Packaging Suppliers'
        ]
    },
    'health-beauty': {
        name: '🌿 Health & Beauty',
        icon: 'fas fa-spa',
        subcategories: [
            'Organic Skincare Brands',
            'Natural Haircare',
            'Zero-Waste Beauty Products',
            'Refillable Cosmetics',
            'Cruelty-Free Perfumes',
            'Eco Toothpaste & Deodorants'
        ]
    },
    'products-retail': {
        name: '🛠️ Products & Retail',
        icon: 'fas fa-shopping-bag',
        subcategories: [
            'Eco-Friendly Packaging Suppliers',
            'Reusable Products',
            'Recycled Stationery & Office Supplies',
            'Green Electronics & Appliances',
            'Sustainable Toys'
        ]
    },
    'transport-travel': {
        name: '🚲 Transport & Travel',
        icon: 'fas fa-bicycle',
        subcategories: [
            'Electric Vehicle (EV) Services',
            'Bicycle Shops & Rentals',
            'Eco-Friendly Travel Agencies',
            'Green Hotels & Eco-Lodges',
            'Sustainable Outdoor Gear'
        ]
    },
    'services-professional': {
        name: '🏢 Services & Professional',
        icon: 'fas fa-briefcase',
        subcategories: [
            'Green Web Hosting',
            'Eco Interior Designers',
            'Sustainable Event Planners',
            'Eco-Friendly Cleaning Services',
            'Ethical Marketing Agencies',
            'Carbon Offset Providers'
        ]
    },
    'energy-utilities': {
        name: '🔌 Energy & Utilities',
        icon: 'fas fa-bolt',
        subcategories: [
            'Solar Panel Installers',
            'Wind Energy Companies',
            'Home Energy Auditors',
            'Green Utility Providers',
            'Battery Storage Solutions'
        ]
    },
    'recycling-waste': {
        name: '♻️ Recycling & Waste Management',
        icon: 'fas fa-recycle',
        subcategories: [
            'E-Waste Recycling',
            'Textile Recycling',
            'Composting Services',
            'Second-Hand & Thrift Stores',
            'Circular Economy Platforms'
        ]
    },
    'education-nonprofits': {
        name: '🌍 Education & Nonprofits',
        icon: 'fas fa-graduation-cap',
        subcategories: [
            'Environmental NGOs',
            'Sustainable Living Blogs',
            'Climate Education Initiatives',
            'Eco Workshops & Classes',
            'Green Certifications & Consulting'
        ]
    }
};

// Export functions for use in other files
window.EcoComponents = {
    createHeader,
    createFooter,
    initializeComponents,
    initializeMobileNav,
    initializeSmoothScroll,
		businessCategories
};

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeComponents();
});
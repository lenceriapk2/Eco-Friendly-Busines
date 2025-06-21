
// Reusable Components for EcoSustainable.co.uk

// Header Component
function createHeader() {
    return `
        <header class="header">
            <nav class="navbar">
                <div class="nav-container">
                    <div class="logo">
                        <i class="fas fa-leaf"></i>
                        <span>EcoSustainable.co.uk</span>
                    </div>
                    <ul class="nav-menu">
                        <li><a href="index.html" class="nav-link">Home</a></li>
                        <li class="dropdown">
                            <a href="#" class="nav-link dropdown-toggle">Categories <i class="fas fa-chevron-down"></i></a>
                            <div class="dropdown-menu">
                                <a href="london-home-living.html">Home & Living</a>
                                <a href="london-fashion-accessories.html">Fashion & Accessories</a>
                                <a href="london-food-beverage.html">Food & Beverage</a>
                                <a href="london-health-beauty.html">Health & Beauty</a>
                                <a href="london-products-retail.html">Products & Retail</a>
                                <a href="london-transport-travel.html">Transport & Travel</a>
                                <a href="london-services-professional.html">Services & Professional</a>
                                <a href="london-energy-utilities.html">Energy & Utilities</a>
                                <a href="london-recycling-waste.html">Recycling & Waste</a>
                                <a href="london-education-nonprofits.html">Education & Nonprofits</a>
                            </div>
                        </li>
                        <li class="dropdown">
                            <a href="#" class="nav-link dropdown-toggle">Cities <i class="fas fa-chevron-down"></i></a>
                            <div class="dropdown-menu">
                                <a href="london.html">London</a>
                                <a href="manchester.html">Manchester</a>
                                <a href="birmingham.html">Birmingham</a>
                                <a href="edinburgh.html">Edinburgh</a>
                                <a href="bristol.html">Bristol</a>
                                <a href="glasgow.html">Glasgow</a>
                                <a href="leeds.html">Leeds</a>
                                <a href="liverpool.html">Liverpool</a>
                            </div>
                        </li>
                        <li><a href="index.html#about" class="nav-link">About</a></li>
                        <li><a href="index.html#contact" class="nav-link">Contact</a></li>
                    </ul>
                    <div class="hamburger">
                        <span class="bar"></span>
                        <span class="bar"></span>
                        <span class="bar"></span>
                    </div>
                </div>
            </nav>
        </header>
    `;
}

// Footer Component
function createFooter() {
    return `
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <div class="logo">
                            <i class="fas fa-leaf"></i>
                            <span>EcoSustainable.co.uk</span>
                        </div>
                        <p>Connecting conscious consumers with sustainable businesses across the UK.</p>
                    </div>
                    <div class="footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li><a href="#categories">Categories</a></li>
                            <li><a href="#cities">Cities</a></li>
                            <li><a href="#about">About</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h4>Major Cities</h4>
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
                        <h4>Categories</h4>
                        <ul>
                            <li><a href="london-home-living.html">Home & Living</a></li>
                            <li><a href="london-fashion-accessories.html">Fashion</a></li>
                            <li><a href="london-food-beverage.html">Food & Beverage</a></li>
                            <li><a href="london-health-beauty.html">Health & Beauty</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h4>Follow Us</h4>
                        <div class="social-links">
                            <a href="#"><i class="fab fa-facebook"></i></a>
                            <a href="#"><i class="fab fa-twitter"></i></a>
                            <a href="#"><i class="fab fa-instagram"></i></a>
                            <a href="#"><i class="fab fa-linkedin"></i></a>
                        </div>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2024 EcoSustainable.co.uk. All rights reserved.</p>
                </div>
            </div>
        </footer>
    `;
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
    initializeMobileNav();
}

// Mobile Navigation Handler
function initializeMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link:not(.dropdown-toggle)').forEach(n => 
            n.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            })
        );
    }

    // Handle dropdown menus
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (toggle && menu) {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
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

// Export functions and data for use in other files
window.EcoComponents = {
    createHeader,
    createFooter,
    initializeComponents,
    initializeSmoothScroll,
    businessCategories
};

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeComponents();
    initializeSmoothScroll();
});

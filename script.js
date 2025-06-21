// Sample data for the directory
const categories = [
    {
        name: "Renewable Energy",
        icon: "fas fa-solar-panel",
        description: "Solar, wind, and other clean energy solutions",
        businessCount: 45
    },
    {
        name: "Organic Food & Beverages",
        icon: "fas fa-leaf",
        description: "Organic restaurants, cafes, and food producers",
        businessCount: 78
    },
    {
        name: "Sustainable Fashion",
        icon: "fas fa-tshirt",
        description: "Eco-friendly clothing and accessories",
        businessCount: 32
    },
    {
        name: "Green Transportation",
        icon: "fas fa-bicycle",
        description: "Electric vehicles, bike sharing, and eco transport",
        businessCount: 28
    },
    {
        name: "Eco-Friendly Beauty",
        icon: "fas fa-spa",
        description: "Natural cosmetics and personal care products",
        businessCount: 41
    },
    {
        name: "Sustainable Construction",
        icon: "fas fa-hammer",
        description: "Green building materials and eco construction",
        businessCount: 35
    },
    {
        name: "Waste Management",
        icon: "fas fa-recycle",
        description: "Recycling, composting, and waste reduction services",
        businessCount: 22
    },
    {
        name: "Green Technology",
        icon: "fas fa-microchip",
        description: "Environmental tech solutions and innovations",
        businessCount: 19
    },
    {
        name: "Eco Tourism",
        icon: "fas fa-mountain",
        description: "Sustainable travel and eco-friendly accommodations",
        businessCount: 38
    }
];

const cities = [
    {
        name: "London",
        icon: "fas fa-city",
        businesses: 156,
        population: "9M+"
    },
    {
        name: "Manchester",
        icon: "fas fa-building",
        businesses: 89,
        population: "2.7M+"
    },
    {
        name: "Birmingham",
        icon: "fas fa-industry",
        businesses: 72,
        population: "2.9M+"
    },
    {
        name: "Edinburgh",
        icon: "fas fa-castle",
        businesses: 64,
        population: "1.3M+"
    },
    {
        name: "Bristol",
        icon: "fas fa-bridge",
        businesses: 58,
        population: "700K+"
    },
    {
        name: "Glasgow",
        icon: "fas fa-ship",
        businesses: 47,
        population: "1.8M+"
    }
];

const topBusinesses = [
    {
        name: "GreenTech Solutions",
        category: "Renewable Energy",
        rating: 4.9,
        description: "Leading provider of solar panel installations and maintenance across London.",
        location: "London",
        logo: "⚡"
    },
    {
        name: "Organic Harvest Co.",
        category: "Organic Food",
        rating: 4.8,
        description: "Farm-to-table restaurant chain serving locally sourced organic meals.",
        location: "Manchester",
        logo: "🌱"
    },
    {
        name: "EcoWear Fashion",
        category: "Sustainable Fashion",
        rating: 4.7,
        description: "Sustainable clothing brand using recycled materials and ethical practices.",
        location: "Birmingham",
        logo: "👕"
    },
    {
        name: "Clean Commute Ltd",
        category: "Green Transportation",
        rating: 4.8,
        description: "Electric bike sharing and sustainable transport solutions.",
        location: "Edinburgh",
        logo: "🚲"
    },
    {
        name: "Natural Glow Beauty",
        category: "Eco Beauty",
        rating: 4.6,
        description: "Organic skincare and cosmetics made from natural ingredients.",
        location: "Bristol",
        logo: "💄"
    },
    {
        name: "EcoBuild Construction",
        category: "Green Building",
        rating: 4.9,
        description: "Sustainable construction using eco-friendly materials and methods.",
        location: "Glasgow",
        logo: "🏗️"
    }
];

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Mobile Navigation (handled in components.js)

// Smooth scrolling for navigation links
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

// Populate categories
function populateCategories() {
    const categoriesGrid = document.getElementById('categoriesGrid');
    if (!categoriesGrid) return;

    const categories = [
        { 
            name: 'Health & Beauty', 
            description: 'Natural beauty products, organic skincare, wellness centers',
            count: '45+ businesses',
            link: 'health-beauty-category.html'
        },
        { 
            name: 'Products & Retail', 
            description: 'Sustainable products, eco-friendly retail stores',
            count: '38+ businesses',
            link: 'products-retail-category.html'
        },
        { 
            name: 'Transport & Travel', 
            description: 'Electric vehicles, green travel, sustainable transport',
            count: '28+ businesses',
            link: 'transport-travel-category.html'
        },
        { 
            name: 'Services & Professional', 
            description: 'Green consulting, eco-friendly professional services',
            count: '35+ businesses',
            link: 'services-professional-category.html'
        },
        { 
            name: 'Energy & Utilities', 
            description: 'Renewable energy, solar power, green utilities',
            count: '22+ businesses',
            link: 'energy-utilities-category.html'
        },
        { 
            name: 'Recycling & Waste', 
            description: 'Waste management, recycling services, circular economy',
            count: '31+ businesses',
            link: 'recycling-waste-category.html'
        }
    ];

    categoriesGrid.innerHTML = categories.map(category => `
        <a href="${category.link}" class="category-card">
            <div class="category-header">${category.name}</div>
            <h3>${category.name}</h3>
            <p>${category.description}</p>
            <span class="business-count">${category.count}</span>
        </a>
    `).join('');
}

// Populate cities
function populateCities() {
    const citiesGrid = document.getElementById('citiesGrid');
    if (!citiesGrid) return;

    const cities = [
        { 
            name: 'London', 
            description: 'Capital city with the most eco-friendly businesses',
            businesses: '150+ businesses',
            categories: '10 categories',
            link: 'london.html'
        },
        { 
            name: 'Manchester', 
            description: 'Northern powerhouse of sustainable business',
            businesses: '85+ businesses',
            categories: '8 categories',
            link: 'manchester.html'
        },
        { 
            name: 'Birmingham', 
            description: 'Industrial city embracing green transformation',
            businesses: '72+ businesses',
            categories: '7 categories',
            link: 'birmingham.html'
        },
        { 
            name: 'Edinburgh', 
            description: 'Scotland\'s sustainable capital',
            businesses: '68+ businesses',
            categories: '8 categories',
            link: 'edinburgh.html'
        },
        { 
            name: 'Bristol', 
            description: 'Leading the way in environmental innovation',
            businesses: '64+ businesses',
            categories: '9 categories',
            link: 'bristol.html'
        },
        { 
            name: 'Glasgow', 
            description: 'Scotland\'s largest city going green',
            businesses: '58+ businesses',
            categories: '7 categories',
            link: 'glasgow.html'
        }
    ];

    citiesGrid.innerHTML = cities.map(city => `
        <a href="${city.link}" class="city-card">
            <div class="city-image">
                ${city.name}
            </div>
            <div class="city-info">
                <h3>${city.name}</h3>
                <p>${city.description}</p>
                <div class="city-stats">
                    <span>${city.businesses}</span>
                    <span>${city.categories}</span>
                </div>
            </div>
        </a>
    `).join('');
}

// Populate top businesses
function populateTopBusinesses() {
    const businessesGrid = document.getElementById('businessesGrid');
    if (!businessesGrid) return;

    const businesses = [
        {
            name: 'EcoLife Wellness',
            category: 'Health & Beauty',
            rating: 4.8,
            reviews: 127,
            description: 'Organic spa treatments and natural wellness products with zero-waste packaging.',
            location: 'London, UK'
        },
        {
            name: 'Green Threads',
            category: 'Fashion & Retail',
            rating: 4.9,
            reviews: 89,
            description: 'Sustainable fashion made from recycled materials and ethical manufacturing.',
            location: 'Manchester, UK'
        },
        {
            name: 'Solar Solutions UK',
            category: 'Energy & Utilities',
            rating: 4.7,
            reviews: 156,
            description: 'Professional solar panel installation and renewable energy consulting.',
            location: 'Birmingham, UK'
        },
        {
            name: 'ZeroWaste Grocers',
            category: 'Food & Beverage',
            rating: 4.6,
            reviews: 203,
            description: 'Package-free grocery store with locally sourced organic products.',
            location: 'Bristol, UK'
        }
    ];

    businessesGrid.innerHTML = businesses.map(business => `
        <div class="business-card">
            <div class="business-header">
                <div class="business-info">
                    <h4>${business.name}</h4>
                    <span class="business-category">${business.category}</span>
                </div>
            </div>
            <div class="business-rating">
                <div class="stars">${'★'.repeat(Math.floor(business.rating))}</div>
                <span class="rating-text">${business.rating} (${business.reviews} reviews)</span>
            </div>
            <p class="business-description">${business.description}</p>
            <div class="business-location">
                <span>${business.location}</span>
            </div>
        </div>
    `).join('');
}

// Search functionality
function performSearchBasic() {
    if (searchInput && searchInput.value) {
        const searchTerm = searchInput.value.toLowerCase();
        alert(`Searching for: "${searchTerm}"`);
        // You can implement actual search logic here
    } else {
        alert('Please enter a search term');
    }
}

// Initialize search event listeners after DOM loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const searchBtnElement = document.getElementById('searchBtn') || document.querySelector('.search-btn');
        const searchInputElement = document.getElementById('searchInput') || document.querySelector('.search-input');
        
        if (searchBtnElement && searchInputElement) {
            searchBtn = searchBtnElement;
            searchInput = searchInputElement;
            
            searchBtn.addEventListener('click', performSearchBasic);
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    performSearchBasic();
                }
            });
        }
    }, 1500);
});

// Show all businesses function
function showAllBusinesses() {
    alert('Redirecting to full business directory...');
}

// Contact form submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.category-card, .city-card, .business-card, .stat-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h3');

    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
            }
        };

        // Trigger animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(counter.parentElement);
    });
}

// Main JavaScript for EcoSustainable.co.uk

let isLoading = false;
const debounceCache = new Map();

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Intersection Observer for lazy loading
const observerOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
};

const lazyLoadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !isLoading) {
            const target = entry.target;
            if (target.id === 'businessesGrid' && !target.dataset.loaded) {
                populateTopBusinesses();
                target.dataset.loaded = 'true';
            } else if (target.id === 'categoriesGrid' && !target.dataset.loaded) {
                populateCategories();
                target.dataset.loaded = 'true';
            } else if (target.id === 'citiesGrid' && !target.dataset.loaded) {
                populateCities();
                target.dataset.loaded = 'true';
            }
            lazyLoadObserver.unobserve(target);
        }
    });
}, observerOptions);

// Global variables and initialization
let currentCity = '';
let currentCategory = '';
let currentBusinesses = [];
let filteredBusinesses = [];
let searchBtn = null;
let searchInput = null;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();

    // Initialize search button reference
    searchBtn = document.getElementById('searchBtn') || document.querySelector('.search-btn');

    // Add search functionality if search elements exist
    const searchInput = document.getElementById('searchInput') || document.querySelector('.search-input');
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            performSearch(searchInput.value);
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
    }
});

function initializeApp() {
    console.log('Initializing EcoSustainable app...');

    // Load components first
    loadComponents().then(() => {
        // Initialize page-specific functionality
        initializePageSpecific();

        // Setup global event listeners
        setupGlobalEventListeners();

        // Initialize newsletter form
        initializeNewsletterForm();

        // Initialize contact form
        initializeContactForm();

        // Initialize search functionality
        initializeSearch();
    });
}

function initializeSearch() {
    // Wait for DOM to be fully loaded
    setTimeout(() => {
        searchInput = document.getElementById('searchInput') || document.querySelector('.search-input');
        searchBtn = document.getElementById('searchBtn') || document.querySelector('.search-btn');

        if (searchBtn && searchInput) {
            searchBtn.addEventListener('click', function() {
                performSearch(searchInput.value);
            });

            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    performSearch(searchInput.value);
                }
            });
        }
    }, 1000);
}

function performSearch(query) {
    if (!query || query.trim() === '') {
        return;
    }

    console.log('Performing search for:', query);

    // Simple search implementation - filter current businesses if available
    if (currentBusinesses && currentBusinesses.length > 0) {
        const filtered = currentBusinesses.filter(business => 
            business.name.toLowerCase().includes(query.toLowerCase()) ||
            business.category.toLowerCase().includes(query.toLowerCase()) ||
            business.description.toLowerCase().includes(query.toLowerCase())
        );

        displayBusinesses(filtered);
    }
}

// Add loading states for dynamic content
function showLoading(element) {
    element.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
        </div>
    `;
}

// Filter businesses by category
function filterByCategory(categoryName) {
    showLoading(document.getElementById('businessesGrid'));

    // Simulate API call
    setTimeout(() => {
        const filteredBusinesses = topBusinesses.filter(business => 
            business.category.toLowerCase().includes(categoryName.toLowerCase())
        );

        const businessesGrid = document.getElementById('businessesGrid');
        businessesGrid.innerHTML = '';

        if (filteredBusinesses.length > 0) {
            filteredBusinesses.forEach(business => {
                const businessCard = document.createElement('div');
                businessCard.className = 'business-card';
                businessCard.innerHTML = `
                    <div class="business-header">
                        <div class="business-logo">${business.logo}</div>
                        <div class="business-info">
                            <h4>${business.name}</h4>
                            <span class="business-category">${business.category}</span>
                        </div>
                    </div>
                    <div class="business-rating">
                        <div class="stars">
                            ${'★'.repeat(Math.floor(business.rating))}${'☆'.repeat(5 - Math.floor(business.rating))}
                        </div>
                        <span>${business.rating}</span>
                    </div>
                    <p class="business-description">${business.description}</p>
                    <div class="business-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${business.location}</span>
                    </div>
                `;
                businessesGrid.appendChild(businessCard);
            });
        } else {
            businessesGrid.innerHTML = '<p>No businesses found in this category.</p>';
        }
    }, 1000);
}

// Export functions for potential use in other files
window.ecosustainableFunctions = {
    showAllBusinesses,
    filterByCategory,
    performSearch
};
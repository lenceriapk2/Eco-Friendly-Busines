
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
const searchInput = document.getElementById('searchInput');
const cityFilter = document.getElementById('cityFilter');
const searchBtn = document.querySelector('.search-btn');

// Mobile Navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

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
    categoriesGrid.innerHTML = '';
    
    categories.forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.innerHTML = `
            <div class="category-icon">
                <i class="${category.icon}"></i>
            </div>
            <h3>${category.name}</h3>
            <p>${category.description}</p>
            <span class="business-count">${category.businessCount} businesses</span>
        `;
        categoryCard.addEventListener('click', () => {
            alert(`Showing businesses in ${category.name} category`);
        });
        categoriesGrid.appendChild(categoryCard);
    });
}

// Populate cities
function populateCities() {
    const citiesGrid = document.getElementById('citiesGrid');
    citiesGrid.innerHTML = '';
    
    cities.forEach(city => {
        const cityCard = document.createElement('div');
        cityCard.className = 'city-card';
        cityCard.innerHTML = `
            <div class="city-image">
                <i class="${city.icon}"></i>
            </div>
            <div class="city-info">
                <h3>${city.name}</h3>
                <p>Discover eco-friendly businesses in ${city.name}</p>
                <div class="city-stats">
                    <span>${city.businesses} businesses</span>
                    <span>${city.population} population</span>
                </div>
            </div>
        `;
        cityCard.addEventListener('click', () => {
            alert(`Exploring eco-friendly businesses in ${city.name}`);
        });
        citiesGrid.appendChild(cityCard);
    });
}

// Populate top businesses
function populateTopBusinesses() {
    const businessesGrid = document.getElementById('businessesGrid');
    businessesGrid.innerHTML = '';
    
    topBusinesses.forEach(business => {
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
        businessCard.addEventListener('click', () => {
            alert(`View details for ${business.name}`);
        });
        businessesGrid.appendChild(businessCard);
    });
}

// Search functionality
function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCity = cityFilter.value;
    
    if (searchTerm || selectedCity) {
        alert(`Searching for: "${searchTerm}" in ${selectedCity || 'all cities'}`);
    } else {
        alert('Please enter a search term or select a city');
    }
}

searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    populateCategories();
    populateCities();
    populateTopBusinesses();
    animateOnScroll();
    animateCounters();
});

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

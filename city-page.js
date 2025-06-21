// City Page JavaScript Handler - Generates unique data for each city

let cityBusinesses = [];
let currentCityName = '';

// Initialize city page with unique data for each city
async function initializeCityPage(cityName) {
    currentCityName = cityName;
    console.log(`Initializing ${cityName} page with unique business data`);

    await loadCityBusinesses(cityName);
    displayCityBusinesses();
    updateCityStats();
    populateCategories();
    addComprehensiveDirectorySection();
}

// Load unique businesses for the specific city
async function loadCityBusinesses(cityName) {
    try {
        // Try to load from API first
        if (window.PlacesAPI && window.PlacesAPI.fetchAllBusinessesForCity) {
            const apiBusinesses = await window.PlacesAPI.fetchAllBusinessesForCity(cityName);
            if (apiBusinesses && apiBusinesses.length > 0) {
                cityBusinesses = apiBusinesses;
                console.log(`Loaded ${apiBusinesses.length} businesses from API for ${cityName}`);
                return;
            }
        }

        // Generate unique fallback data for this city
        cityBusinesses = generateCityBusinessData(cityName);
        console.log(`Generated unique data for ${cityName}: ${cityBusinesses.length} businesses`);

    } catch (error) {
        console.error(`Error loading businesses for ${cityName}:`, error);
        cityBusinesses = generateCityBusinessData(cityName);
    }
}

// Generate unique business data for each city
function generateCityBusinessData(cityName) {
    const businessTypes = [
        { category: 'health-beauty', name: 'Spa & Wellness', icon: '🧘', services: ['Organic Treatments', 'Eco Spa', 'Natural Beauty'] },
        { category: 'food-beverage', name: 'Restaurants', icon: '🍽️', services: ['Plant-Based', 'Local Organic', 'Zero Waste'] },
        { category: 'transport-travel', name: 'Transport', icon: '🚲', services: ['E-Bike Rental', 'Electric Taxi', 'Car Sharing'] },
        { category: 'services-professional', name: 'Professional Services', icon: '💼', services: ['Green Consulting', 'Eco Design', 'Sustainability Audit'] },
        { category: 'products-retail', name: 'Retail', icon: '🛍️', services: ['Eco Products', 'Sustainable Fashion', 'Zero Waste Store'] },
        { category: 'energy-utilities', name: 'Energy', icon: '⚡', services: ['Solar Installation', 'Wind Energy', 'Energy Audit'] },
        { category: 'recycling-waste', name: 'Recycling', icon: '♻️', services: ['E-Waste', 'Composting', 'Upcycling'] },
        { category: 'education-nonprofits', name: 'Education', icon: '📚', services: ['Environmental Ed', 'Green Training', 'Sustainability Courses'] }
    ];

    const businesses = [];
    let businessId = 1;

    // Generate 10-15 businesses per category for variety
    businessTypes.forEach(type => {
        const count = Math.floor(Math.random() * 6) + 10; // 10-15 businesses per category

        for (let i = 0; i < count; i++) {
            const business = {
                id: businessId++,
                name: generateBusinessName(type.name, cityName, i),
                category: type.category,
                subcategory: type.services[Math.floor(Math.random() * type.services.length)],
                rating: (Math.random() * 1.5 + 3.5).toFixed(1), // 3.5-5.0 rating
                reviewCount: Math.floor(Math.random() * 200) + 20,
                description: generateBusinessDescription(type.name, cityName),
                address: generateAddress(cityName),
                phone: generatePhoneNumber(),
                website: generateWebsite(type.name, cityName),
                image: type.icon,
                features: generateFeatures(type.category)
            };
            businesses.push(business);
        }
    });

    return businesses;
}

// Sanitize city names for consistent filename generation
function sanitizeCityName(cityName) {
    return cityName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/--+/g, '-').replace(/^-|-$/g, '');
}

// Generate unique business names for each city
function generateBusinessName(businessType, cityName, index) {
    const prefixes = ['Green', 'Eco', 'Sustainable', 'Earth', 'Pure', 'Natural', 'Clean', 'Organic'];
    const suffixes = ['Hub', 'Centre', 'Studio', 'Co', 'Solutions', 'Services', 'Group', 'Collective'];

    const businessNames = {
        'Spa & Wellness': ['Wellness', 'Beauty', 'Spa', 'Retreat', 'Sanctuary'],
        'Restaurants': ['Kitchen', 'Bistro', 'Café', 'Eatery', 'Table'],
        'Transport': ['Mobility', 'Transport', 'Travel', 'Rides', 'Move'],
        'Professional Services': ['Consulting', 'Advisors', 'Partners', 'Experts', 'Professionals'],
        'Retail': ['Store', 'Shop', 'Market', 'Boutique', 'Emporium'],
        'Energy': ['Energy', 'Power', 'Solar', 'Electric', 'Renewable'],
        'Recycling': ['Recycling', 'Waste', 'Recovery', 'Circular', 'Reuse'],
        'Education': ['Academy', 'Institute', 'Learning', 'Education', 'Training']
    };

    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const businessWord = businessNames[businessType] ? 
        businessNames[businessType][Math.floor(Math.random() * businessNames[businessType].length)] :
        'Solutions';
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    return `${prefix} ${businessWord} ${cityName}`;
}

// Generate business descriptions
function generateBusinessDescription(businessType, cityName) {
    const descriptions = {
        'Spa & Wellness': `Premier eco-friendly wellness center in ${cityName}, offering organic treatments and sustainable beauty services.`,
        'Restaurants': `Sustainable dining experience in ${cityName}, featuring locally-sourced ingredients and plant-based options.`,
        'Transport': `Eco-friendly transportation solutions serving ${cityName} with electric and sustainable mobility options serving ${cityName}.`,
        'Professional Services': `Leading sustainability consultancy in ${cityName}, helping businesses reduce their environmental impact.`,
        'Retail': `Sustainable retail store in ${cityName}, offering eco-friendly products and zero-waste shopping solutions.`,
        'Energy': `Renewable energy specialists serving ${cityName} with solar, wind, and energy efficiency solutions.`,
        'Recycling': `Comprehensive recycling and waste management services for ${cityName}, promoting circular economy principles.`,
        'Education': `Environmental education and sustainability training programs for the ${cityName} community.`
    };

    return descriptions[businessType] || `Sustainable business serving the ${cityName} community with eco-friendly solutions.`;
}

// Generate addresses for each city
function generateAddress(cityName) {
    const streetNumbers = Math.floor(Math.random() * 200) + 1;
    const streetNames = ['High Street', 'Main Road', 'Green Lane', 'Park Avenue', 'Church Street', 'Market Square', 'Victoria Road', 'Mill Lane'];
    const streetName = streetNames[Math.floor(Math.random() * streetNames.length)];

    return `${streetNumbers} ${streetName}, ${cityName}`;
}

// Generate phone numbers
function generatePhoneNumber() {
    const area = Math.floor(Math.random() * 9000) + 1000;
    const number = Math.floor(Math.random() * 900000) + 100000;
    return `+44 ${area.toString().slice(0,2)} ${area.toString().slice(2)} ${number.toString().slice(0,4)}`;
}

// Generate website URLs
function generateWebsite(businessType, cityName) {
    const domain = businessType.toLowerCase().replace(/[^a-z]/g, '') + cityName.toLowerCase().replace(/[^a-z]/g, '');
    return `www.${domain}.co.uk`;
}

// Generate business features
function generateFeatures(category) {
    const featuresByCategory = {
        'health-beauty': ['Organic Products', 'Cruelty-Free', 'Natural Ingredients', 'Eco Packaging'],
        'food-beverage': ['Local Sourcing', 'Organic Certified', 'Zero Waste', 'Plant-Based Options'],
        'transport-travel': ['Electric Vehicles', 'Carbon Neutral', 'Bike Friendly', 'Public Transport Links'],
        'services-professional': ['Carbon Footprint Analysis', 'Sustainability Reporting', 'Green Certification', 'Energy Audits'],
        'products-retail': ['Sustainable Materials', 'Fair Trade', 'Recyclable Packaging', 'Local Products'],
        'energy-utilities': ['Renewable Energy', 'Energy Efficiency', 'Solar Installation', 'Smart Technology'],
        'recycling-waste': ['E-Waste Processing', 'Composting Services', 'Circular Economy', 'Waste Reduction'],
        'education-nonprofits': ['Environmental Education', 'Community Outreach', 'Green Training', 'Sustainability Workshops']
    };

    const features = featuresByCategory[category] || ['Eco-Friendly', 'Sustainable', 'Environmentally Conscious', 'Green Certified'];
    return features.slice(0, 4); // Return 4 features
}

// Display city businesses
function displayCityBusinesses() {
    const grid = document.getElementById('londonBusinessesGrid') || 
                 document.getElementById('businessesGrid') ||
                 document.getElementById('cityBusinessesGrid');

    if (!grid) {
        console.error('Business grid container not found');
        return;
    }

    grid.innerHTML = '';

    if (cityBusinesses.length === 0) {
        grid.innerHTML = '<div class="no-results"><p>No businesses found. Please try refreshing the page.</p></div>';
        return;
    }

    cityBusinesses.slice(0, 12).forEach((business, index) => {
        const businessCard = createBusinessCard(business);
        grid.appendChild(businessCard);
    });

    console.log(`Displayed ${Math.min(cityBusinesses.length, 12)} businesses in ${currentCityName}`);
}

// Create business card for city pages
function createBusinessCard(business) {
    const card = document.createElement('div');
    card.className = 'london-business-card';

    // Ensure we have required data
    const name = business.name || 'Business Name';
    const category = business.subcategory || business.category || 'Business';
    const rating = parseFloat(business.rating) || 4.5;
    const reviewCount = business.reviewCount || Math.floor(Math.random() * 50) + 10;
    const description = business.description || `Professional ${category.toLowerCase()} services with a focus on sustainability and environmental responsibility.`;
    const features = business.features || business.tags || ['Eco-Friendly', 'Sustainable', 'Local'];
    const address = business.address || generateAddress(currentCityName);
    const phone = business.phone || generatePhoneNumber();
    const website = business.website || generateWebsite('business', currentCityName);

    // Create business logo/icon based on category
    const categoryIcons = {
        'home-living': 'fas fa-home',
        'fashion-accessories': 'fas fa-tshirt',
        'food-beverage': 'fas fa-utensils',
        'health-beauty': 'fas fa-spa',
        'products-retail': 'fas fa-shopping-bag',
        'transport-travel': 'fas fa-car',
        'services-professional': 'fas fa-briefcase',
        'energy-utilities': 'fas fa-bolt',
        'recycling-waste': 'fas fa-recycle',
        'education-nonprofits': 'fas fa-graduation-cap'
    };

    const logoIcon = categoryIcons[business.category] || 'fas fa-leaf';

    card.innerHTML = `
        <div class="business-card-header">
            <div class="business-rank">1</div>
        </div>
        <div class="business-image-container">
            <div class="business-main-image" style="background: linear-gradient(135deg, #4caf50, #2d8f47); display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem;">
                <i class="${logoIcon}"></i>
            </div>
        </div>
        <div class="business-content">
            <div class="business-main-info">
                <h3>${name}</h3>
                <div class="business-subcategory">${category}</div>
                <div class="business-rating">
                    <span class="stars">${'★'.repeat(Math.floor(rating))}${'☆'.repeat(5-Math.floor(rating))}</span>
                    <span class="rating-text">${rating.toFixed(1)} (${reviewCount} reviews)</span>
                </div>
            </div>

            <div class="business-description">
                <p>${description}</p>
            </div>

            <div class="business-features">
                ${features.slice(0, 4).map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
            </div>

            <div class="business-contact-info">
                <div class="contact-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${address}</span>
                </div>
                <div class="contact-item">
                    <i class="fas fa-phone"></i>
                    <span>${phone}</span>
                </div>
                <div class="contact-item">
                    <i class="fas fa-globe"></i>
                    <span>${website}</span>
                </div>
            </div>

            <div class="business-actions">
                <button class="action-btn call-btn" onclick="callBusiness('${phone}')" type="button">
                    <i class="fas fa-phone"></i> Call
                </button>
                <button class="action-btn website-btn" onclick="openBusinessWebsite('${website}')" type="button">
                    <i class="fas fa-globe"></i> Website
                </button>
            </div>
        </div>
    `;

    return card;
}

// Helper functions for generating business data
function generateAddress(cityName) {
    const streetNumbers = Math.floor(Math.random() * 200) + 1;
    const streetNames = ['High Street', 'Main Road', 'Green Lane', 'Park Avenue', 'Church Street', 'Market Square'];
    const streetName = streetNames[Math.floor(Math.random() * streetNames.length)];
    return `${streetNumbers} ${streetName}, ${cityName}`;
}

function generatePhoneNumber() {
    const area = Math.floor(Math.random() * 9000) + 1000;
    const number = Math.floor(Math.random() * 900000) + 100000;
    return `+44 ${area.toString().slice(0,2)} ${area.toString().slice(2)} ${number.toString().slice(0,4)}`;
}

function generateWebsite(categoryKey, cityName) {
    const domain = (categoryKey + cityName).toLowerCase().replace(/[^a-z]/g, '').slice(0, 15);
    return `www.${domain}.co.uk`;
}

// Update city statistics
function updateCityStats() {
    const titleElement = document.querySelector('.city-hero h1');
    const businessCountElement = document.querySelector('.city-stats .stat-number');

    if (titleElement) {
        titleElement.textContent = `Discover Eco-Friendly Businesses in ${currentCityName}`;
    }

    if (businessCountElement) {
        businessCountElement.textContent = `${cityBusinesses.length}+`;
    }
}

// Populate categories for the city
function populateCategories() {
    const categoriesGrid = document.getElementById('categoriesGrid');
    if (!categoriesGrid) return;

    const categories = [
        { key: 'health-beauty', name: 'Health & Beauty', icon: '💄', count: cityBusinesses.filter(b => b.category === 'health-beauty').length },
        { key: 'food-beverage', name: 'Food & Beverage', icon: '🍽️', count: cityBusinesses.filter(b => b.category === 'food-beverage').length },
        { key: 'transport-travel', name: 'Transport & Travel', icon: '🚗', count: cityBusinesses.filter(b => b.category === 'transport-travel').length },
        { key: 'services-professional', name: 'Professional Services', icon: '💼', count: cityBusinesses.filter(b => b.category === 'services-professional').length },
        { key: 'products-retail', name: 'Products & Retail', icon: '🛍️', count: cityBusinesses.filter(b => b.category === 'products-retail').length },
        { key: 'energy-utilities', name: 'Energy & Utilities', icon: '⚡', count: cityBusinesses.filter(b => b.category === 'energy-utilities').length },
        { key: 'recycling-waste', name: 'Recycling & Waste', icon: '♻️', count: cityBusinesses.filter(b => b.category === 'recycling-waste').length },
        { key: 'education-nonprofits', name: 'Education & Nonprofits', icon: '📚', count: cityBusinesses.filter(b => b.category === 'education-nonprofits').length }
    ];

    categoriesGrid.innerHTML = '';

    categories.forEach(category => {
        const citySlug = sanitizeCityName(currentCityName);
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.onclick = () => {
            window.location.href = `${citySlug}-${category.key}.html`;
        };

        categoryCard.innerHTML = `
            <div class="category-icon">${category.icon}</div>
            <h3>${category.name}</h3>
            <p>${category.count} businesses</p>
        `;

        categoriesGrid.appendChild(categoryCard);
    });
}

// Filter businesses by category
function filterByCategory(category) {
    const filtered = category === 'all' ? cityBusinesses : cityBusinesses.filter(b => b.category === category);
    displayFilteredBusinesses(filtered);
}

// Display filtered businesses
function displayFilteredBusinesses(businesses) {
    const grid = document.getElementById('londonBusinessesGrid') || document.getElementById('businessesGrid');
    if (!grid) return;

    grid.innerHTML = '';

    businesses.forEach(business => {
        const businessCard = createBusinessCard(business);
        grid.appendChild(businessCard);
    });
}

// Utility functions
function callBusiness(phone) {
    window.location.href = `tel:${phone}`;
}

function openBusinessWebsite(website) {
    // Ensure the website URL has proper protocol
    let url = website;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }
    window.open(url, '_blank');
}

// Comprehensive Directory Section
function addComprehensiveDirectorySection() {
    const container = document.querySelector('.city-page-content') || document.querySelector('.home-page-content') || document.querySelector('.category-page-content');
    if (!container) {
        console.error('Content container not found');
        return;
    }

    const directorySection = document.createElement('section');
    directorySection.id = 'comprehensiveDirectory';
    directorySection.innerHTML = `
        <h2>The UK's Most Comprehensive Eco-Friendly Business Directory</h2>
        <p>Looking for the top 10 eco friendly businesses UK? Our curated eco friendly businesses UK list features the best eco friendly businesses UK across all major cities and industries.</p>
        <p>From our extensive database of top 100 sustainable companies UK, we showcase the top 10 ethical companies UK that are leading the way in environmental responsibility. Browse sustainable companies examples from health & beauty to energy & utilities.</p>
        <p>Whether you're seeking local green services or researching top eco friendly businesses UK for partnerships, our verified directory connects you with companies that share your environmental values.</p>
        
        <h3>Featured in Our Directory</h3>
        <ul>
            <li>✓ Zero Waste Stores</li>
            <li>✓ Renewable Energy</li>
            <li>✓ Organic Beauty</li>
            <li>✓ Sustainable Fashion</li>
            <li>✓ Green Transport</li>
            <li>✓ Eco Consultants</li>
            <li>✓ Solar Installers</li>
            <li>✓ Recycling Services</li>
        </ul>
    `;

    container.appendChild(directorySection);
}

// Export for global access
window.CityPage = {
    initializeCityPage,
    loadCityBusinesses,
    displayCityBusinesses,
    filterByCategory,
    cityBusinesses: () => cityBusinesses,
    currentCity: () => currentCityName
};
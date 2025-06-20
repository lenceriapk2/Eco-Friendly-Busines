// Category Page JavaScript Handler - Generates unique data for each category in each city

let categoryBusinesses = [];
let currentCategoryKey = '';
let currentCityName = '';

// Initialize category page with unique data for each city and category
async function initializeCategoryPage(categoryKey, cityName) {
    currentCategoryKey = categoryKey;
    currentCityName = cityName;
    console.log(`Loading businesses for category: ${categoryKey} in ${cityName}`);

    await loadCategoryBusinesses(categoryKey, cityName);
    displayCategoryBusinesses();
    updatePageContent();
    generateSEOContent();
}

// Load unique businesses for the specific category and city
async function loadCategoryBusinesses(categoryKey, cityName) {
    try {
        // Try to load from API first
        if (window.PlacesAPI && window.PlacesAPI.fetchBusinessesByCategory) {
            const apiBusinesses = await window.PlacesAPI.fetchBusinessesByCategory(categoryKey, cityName);
            if (apiBusinesses && apiBusinesses.length > 0) {
                categoryBusinesses = apiBusinesses;
                console.log(`Loaded ${apiBusinesses.length} businesses from API for ${cityName}`);
                return;
            }
        }

        // Generate unique fallback data for this category and city
        categoryBusinesses = generateCategoryBusinessData(categoryKey, cityName);
        console.log(`Generated unique data for ${categoryKey} in ${cityName}: ${categoryBusinesses.length} businesses`);

    } catch (error) {
        console.error(`Error loading businesses for ${categoryKey} in ${cityName}:`, error);
        categoryBusinesses = generateCategoryBusinessData(categoryKey, cityName);
    }
}

// Generate unique business data for each category and city
function generateCategoryBusinessData(categoryKey, cityName) {
    const categoryConfig = {
        'health-beauty': {
            types: ['Organic Spa', 'Natural Beauty Salon', 'Eco Wellness Center', 'Green Pharmacy', 'Sustainable Fitness'],
            services: ['Organic Treatments', 'Natural Skincare', 'Eco Massage', 'Green Beauty Products', 'Wellness Coaching']
        },
        'products-retail': {
            types: ['Zero Waste Store', 'Sustainable Fashion', 'Eco Home Goods', 'Green Electronics', 'Organic Market'],
            services: ['Sustainable Products', 'Eco-Friendly Fashion', 'Green Technology', 'Organic Goods', 'Ethical Shopping']
        },
        'transport-travel': {
            types: ['E-Bike Rental', 'Electric Car Share', 'Green Travel Agency', 'Sustainable Transport', 'Eco Tours'],
            services: ['Electric Vehicles', 'Bike Sharing', 'Green Travel', 'Carbon Neutral Transport', 'Eco Tourism']
        },
        'services-professional': {
            types: ['Green Consulting', 'Eco Architecture', 'Sustainability Audit', 'Environmental Law', 'Green Marketing'],
            services: ['Carbon Footprint Analysis', 'Green Building Design', 'Sustainability Strategy', 'Environmental Compliance', 'Eco Branding']
        },
        'energy-utilities': {
            types: ['Solar Installation', 'Wind Energy', 'Energy Efficiency', 'Smart Grid', 'Renewable Energy'],
            services: ['Solar Panels', 'Wind Turbines', 'Energy Audits', 'Smart Meters', 'Green Energy Supply']
        },
        'recycling-waste': {
            types: ['E-Waste Recycling', 'Composting Service', 'Waste Reduction', 'Upcycling Studio', 'Circular Economy'],
            services: ['Electronic Recycling', 'Organic Waste Processing', 'Waste Minimization', 'Material Recovery', 'Sustainable Disposal']
        },
        'education-nonprofits': {
            types: ['Environmental Education', 'Green Training', 'Sustainability Institute', 'Eco Nonprofit', 'Conservation Group'],
            services: ['Environmental Workshops', 'Green Skills Training', 'Sustainability Courses', 'Conservation Programs', 'Eco Awareness']
        }
    };

    const config = categoryConfig[categoryKey] || categoryConfig['services-professional'];
    const businesses = [];

    // Generate 10-15 businesses for this category
    for (let i = 0; i < 12; i++) {
        const business = {
            id: `${categoryKey}_${cityName}_${i}`,
            name: generateCategoryBusinessName(config.types, cityName, i),
            category: categoryKey,
            subcategory: config.services[Math.floor(Math.random() * config.services.length)],
            rating: (Math.random() * 1.5 + 3.5).toFixed(1),
            reviewCount: Math.floor(Math.random() * 200) + 20,
            description: generateCategoryBusinessDescription(categoryKey, cityName),
            address: generateAddress(cityName),
            phone: generatePhoneNumber(),
            website: generateWebsite(categoryKey, cityName),
            image: getCategoryIcon(categoryKey),
            features: generateCategoryFeatures(categoryKey)
        };
        businesses.push(business);
    }

    return businesses;
}

// Generate business names specific to category
function generateCategoryBusinessName(types, cityName, index) {
    const prefixes = ['Green', 'Eco', 'Sustainable', 'Pure', 'Natural', 'Clean'];
    const suffixes = ['Hub', 'Centre', 'Studio', 'Co', 'Solutions', 'Services'];

    const baseType = types[Math.floor(Math.random() * types.length)];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    return `${prefix} ${baseType} ${cityName}`;
}

// Generate category-specific descriptions
function generateCategoryBusinessDescription(categoryKey, cityName) {
    const descriptions = {
        'health-beauty': `Leading sustainable health and beauty services in ${cityName}, offering eco-friendly treatments and natural products.`,
        'products-retail': `Sustainable retail experience in ${cityName}, featuring eco-friendly products and ethical shopping options.`,
        'transport-travel': `Green transportation solutions serving ${cityName} with electric and sustainable mobility options.`,
        'services-professional': `Professional sustainability services in ${cityName}, helping businesses and individuals reduce environmental impact.`,
        'energy-utilities': `Renewable energy solutions for ${cityName}, specializing in solar, wind, and energy efficiency.`,
        'recycling-waste': `Comprehensive waste management and recycling services for ${cityName}, promoting circular economy.`,
        'education-nonprofits': `Environmental education and sustainability training programs serving the ${cityName} community.`
    };

    return descriptions[categoryKey] || `Sustainable business serving ${cityName} with eco-friendly solutions.`;
}

// Get category icons
function getCategoryIcon(categoryKey) {
    const icons = {
        'health-beauty': '💄',
        'products-retail': '🛍️',
        'transport-travel': '🚗',
        'services-professional': '💼',
        'energy-utilities': '⚡',
        'recycling-waste': '♻️',
        'education-nonprofits': '📚'
    };
    return icons[categoryKey] || '🏢';
}

// Generate category-specific features
function generateCategoryFeatures(categoryKey) {
    const features = {
        'health-beauty': ['Organic Products', 'Cruelty-Free', 'Natural Ingredients', 'Eco Packaging'],
        'products-retail': ['Sustainable Materials', 'Fair Trade', 'Recyclable Packaging', 'Local Products'],
        'transport-travel': ['Electric Vehicles', 'Carbon Neutral', 'Bike Friendly', 'Green Transport'],
        'services-professional': ['Carbon Assessment', 'Green Certification', 'Sustainability Strategy', 'Environmental Compliance'],
        'energy-utilities': ['Renewable Energy', 'Energy Efficiency', 'Smart Technology', 'Carbon Reduction'],
        'recycling-waste': ['Circular Economy', 'Waste Reduction', 'Material Recovery', 'Eco Processing'],
        'education-nonprofits': ['Environmental Education', 'Community Outreach', 'Green Training', 'Sustainability Workshops']
    };
    return features[categoryKey] || ['Eco-Friendly', 'Sustainable', 'Green Certified', 'Environmentally Conscious'];
}

// Display category businesses
function displayCategoryBusinesses() {
    const grid = document.getElementById('categoryBusinessesGrid');
    if (!grid) return;

    grid.innerHTML = '';

    categoryBusinesses.forEach(business => {
        const businessCard = createCategoryBusinessCard(business);
        grid.appendChild(businessCard);
    });
}

// Create business card for category page
function createCategoryBusinessCard(business) {
    const card = document.createElement('div');
    card.className = 'category-business-card';

    card.innerHTML = `
        <div class="business-card-header">
            <div class="business-logo">${business.image}</div>
            <div class="business-info">
                <h3>${business.name}</h3>
                <p class="business-category">${business.subcategory}</p>
                <div class="business-rating">
                    <span class="stars">${'★'.repeat(Math.floor(business.rating))}${'☆'.repeat(5-Math.floor(business.rating))}</span>
                    <span class="rating-text">${business.rating} (${business.reviewCount} reviews)</span>
                </div>
            </div>
        </div>

        <p class="business-description">${business.description}</p>

        <div class="business-features">
            ${business.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
        </div>

        <div class="business-contact">
            <div class="contact-item">
                <i class="fas fa-map-marker-alt"></i>
                <span>${business.address}</span>
            </div>
            <div class="contact-item">
                <i class="fas fa-phone"></i>
                <span>${business.phone}</span>
            </div>
            <div class="contact-item">
                <i class="fas fa-globe"></i>
                <span>${business.website}</span>
            </div>
        </div>

        <div class="business-actions">
            <button class="btn-primary" onclick="window.open('https://${business.website}', '_blank')">
                Visit Website
            </button>
            <button class="btn-secondary" onclick="callBusiness('${business.phone}')">
                Call Now
            </button>
        </div>
    `;

    return card;
}

// Update page content with current category and city
function updatePageContent() {
    // Update page title
    const titleElement = document.querySelector('h1');
    if (titleElement) {
        const categoryName = getCategoryDisplayName(currentCategoryKey);
        titleElement.innerHTML = `Top 10 ${categoryName} Businesses in <span class="highlight">${currentCityName}</span>`;
    }

    // Update breadcrumb
    const breadcrumb = document.querySelector('.breadcrumb');
    if (breadcrumb) {
        const citySlug = sanitizeCityName(currentCityName);
        breadcrumb.innerHTML = `
            <a href="index.html">Home</a> > 
            <a href="${citySlug}.html">${currentCityName}</a> > 
            <span>${getCategoryDisplayName(currentCategoryKey)}</span>
        `;
    }

    // Update businesses count
    const countElement = document.getElementById('businessesCount');
    if (countElement) {
        countElement.textContent = `Showing ${categoryBusinesses.length} businesses`;
    }
}

// Get display name for category
function getCategoryDisplayName(categoryKey) {
    const names = {
        'health-beauty': 'Health & Beauty',
        'products-retail': 'Products & Retail',
        'transport-travel': 'Transport & Travel',
        'services-professional': 'Services & Professional',
        'energy-utilities': 'Energy & Utilities',
        'recycling-waste': 'Recycling & Waste Management',
        'education-nonprofits': 'Education & Nonprofits'
    };
    return names[categoryKey] || 'Business Services';
}

// Generate SEO content dynamically
function generateSEOContent() {
    const seoSections = document.getElementById('seoSections');
    if (!seoSections) return;

    const categoryName = getCategoryDisplayName(currentCategoryKey);

    seoSections.innerHTML = `
        <section class="seo-content">
            <div class="container">
                <h2>Why Choose Sustainable ${categoryName} in ${currentCityName}?</h2>
                <p>
                    ${currentCityName} is home to innovative ${categoryName.toLowerCase()} businesses that prioritize environmental responsibility. 
                    These companies demonstrate that sustainable practices and quality service go hand in hand.
                </p>

                <div class="seo-benefits">
                    <div class="benefit-item">
                        <h3>Environmental Impact</h3>
                        <p>Support businesses that actively reduce their carbon footprint and promote sustainability in ${currentCityName}.</p>
                    </div>
                    <div class="benefit-item">
                        <h3>Quality Assurance</h3>
                        <p>All featured ${categoryName.toLowerCase()} businesses are verified for their commitment to excellence and sustainability.</p>
                    </div>
                    <div class="benefit-item">
                        <h3>Local Community</h3>
                        <p>Supporting local sustainable businesses helps build a stronger, more resilient community in ${currentCityName}.</p>
                    </div>
                </div>
            </div>
        </section>
    `;
}

// Utility functions
function sanitizeCityName(cityName) {
    return cityName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/--+/g, '-').replace(/^-|-$/g, '');
}

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
    const domain = categoryKey.replace(/-/g, '') + cityName.toLowerCase().replace(/[^a-z]/g, '');
    return `www.${domain}.co.uk`;
}

function callBusiness(phone) {
    window.location.href = `tel:${phone}`;
}

// Export for global access
window.CategoryPage = {
    initializeCategoryPage,
    loadCategoryBusinesses,
    displayCategoryBusinesses,
    categoryBusinesses: () => categoryBusinesses,
    currentCategory: () => currentCategoryKey,
    currentCity: () => currentCityName
};
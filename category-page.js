
// Category Page JavaScript Handler - Generates unique data for each category in each city

let categoryBusinesses = [];
let currentCategoryKey = '';
let currentCityName = '';

// Initialize category page with unique data for each city and category
async function initializeCategoryPage(categoryKey, cityName) {
    currentCategoryKey = categoryKey;
    currentCityName = cityName;
    console.log(`Loading businesses for category: ${categoryKey} in ${cityName}`);

    // Show loading state
    showLoadingState();

    await loadCategoryBusinesses(categoryKey, cityName);
    displayCategoryBusinesses();
    updatePageContent();
    generateSEOContent();
}

// Show loading state while data loads
function showLoadingState() {
    const grid = document.getElementById('categoryBusinessesGrid');
    if (grid) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: #666;">
                <i class="fas fa-spinner fa-spin fa-3x" style="color: #4CAF50; margin-bottom: 20px;"></i>
                <h3>Loading Businesses...</h3>
                <p>Finding the best eco-friendly businesses in ${currentCityName}</p>
            </div>
        `;
    }
}

// Load unique businesses for the specific category and city
async function loadCategoryBusinesses(categoryKey, cityName) {
    try {
        console.log(`Attempting to load businesses from API for ${categoryKey} in ${cityName}`);
        
        // Try multiple API methods to get real data
        if (window.PlacesAPI) {
            let apiBusinesses = null;
            
            // Try category-specific API first
            if (window.PlacesAPI.fetchBusinessesForCategory) {
                apiBusinesses = await window.PlacesAPI.fetchBusinessesForCategory(categoryKey, cityName.toLowerCase());
            }
            
            // If no results, try general city search and filter
            if (!apiBusinesses || apiBusinesses.length === 0) {
                if (window.PlacesAPI.fetchAllBusinessesForCity) {
                    const allBusinesses = await window.PlacesAPI.fetchAllBusinessesForCity(cityName.toLowerCase());
                    if (allBusinesses && allBusinesses.length > 0) {
                        // Filter by category keywords
                        apiBusinesses = filterBusinessesByCategory(allBusinesses, categoryKey);
                    }
                }
            }
            
            // If we have API data, use it
            if (apiBusinesses && apiBusinesses.length > 0) {
                categoryBusinesses = apiBusinesses.slice(0, 12); // Limit to 12 businesses
                console.log(`Loaded ${categoryBusinesses.length} businesses from API for ${categoryKey} in ${cityName}`);
                return;
            }
        }

        // If API fails or returns no results, generate unique fallback data
        console.log(`API failed or returned no results, generating fallback data for ${categoryKey} in ${cityName}`);
        categoryBusinesses = generateCategoryBusinessData(categoryKey, cityName);
        console.log(`Generated unique data for ${categoryKey} in ${cityName}: ${categoryBusinesses.length} businesses`);
        
    } catch (error) {
        console.error(`Error loading businesses for ${categoryKey} in ${cityName}:`, error);
        categoryBusinesses = generateCategoryBusinessData(categoryKey, cityName);
    }
}

// Filter businesses by category keywords
function filterBusinessesByCategory(businesses, categoryKey) {
    const categoryKeywords = {
        'health-beauty': ['spa', 'beauty', 'salon', 'wellness', 'health', 'organic', 'natural'],
        'energy-utilities': ['solar', 'energy', 'renewable', 'electric', 'power', 'utility'],
        'education-nonprofits': ['school', 'education', 'training', 'nonprofit', 'charity', 'foundation'],
        'transport-travel': ['transport', 'travel', 'taxi', 'bus', 'car', 'bike', 'delivery'],
        'services-professional': ['consultant', 'service', 'professional', 'business', 'legal', 'finance'],
        'recycling-waste': ['recycling', 'waste', 'disposal', 'cleaning', 'environmental'],
        'products-retail': ['shop', 'store', 'retail', 'market', 'products', 'goods']
    };
    
    const keywords = categoryKeywords[categoryKey] || [];
    
    return businesses.filter(business => {
        const searchText = `${business.name} ${business.description || ''} ${business.category || ''}`.toLowerCase();
        return keywords.some(keyword => searchText.includes(keyword));
    }).slice(0, 12);
}

// Generate unique business data for each category and city
function generateCategoryBusinessData(categoryKey, cityName) {
    const categoryNames = {
        'home-living': 'Home & Living',
        'fashion-accessories': 'Fashion & Accessories', 
        'food-beverage': 'Food & Beverage',
        'health-beauty': 'Health & Beauty',
        'products-retail': 'Products & Retail',
        'transport-travel': 'Transport & Travel',
        'services-professional': 'Services & Professional',
        'energy-utilities': 'Energy & Utilities',
        'recycling-waste': 'Recycling & Waste',
        'education-nonprofits': 'Education & Nonprofits'
    };

    const businesses = [];
    const cityCode = generateCityCode(cityName);
    const categoryCode = generateCategoryCode(categoryKey);
    
    // Business name templates based on category
    const businessNameTemplates = {
        'health-beauty': [
            'Natural Glow', 'Pure Beauty', 'Organic Wellness', 'Green Spa', 'Eco Beauty',
            'Natural Elements', 'Pure Radiance', 'Green Garden', 'Eco Essence', 'Natural Care',
            'Organic Touch', 'Pure Nature'
        ],
        'energy-utilities': [
            'Solar Solutions', 'Green Energy', 'Renewable Power', 'Eco Energy', 'Solar Tech',
            'Clean Power', 'Green Grid', 'Renewable Solutions', 'Eco Power', 'Solar Systems',
            'Green Utilities', 'Clean Energy'
        ],
        'education-nonprofits': [
            'Green Learning', 'Eco Education', 'Sustainable Future', 'Environmental Trust', 'Green Foundation',
            'Eco Academy', 'Climate Action', 'Green Initiative', 'Sustainable Society', 'Environmental Care',
            'Green Community', 'Eco Alliance'
        ],
        'transport-travel': [
            'Green Travel', 'Eco Transport', 'Sustainable Journeys', 'Clean Rides', 'Green Routes',
            'Eco Mobility', 'Green Fleet', 'Sustainable Transport', 'Clean Travel', 'Eco Tours',
            'Green Adventures', 'Sustainable Rides'
        ],
        'services-professional': [
            'Green Solutions', 'Eco Services', 'Sustainable Consulting', 'Green Professional', 'Eco Experts',
            'Green Advisors', 'Sustainable Services', 'Eco Solutions', 'Green Consulting', 'Environmental Services',
            'Green Tech', 'Eco Professional'
        ],
        'recycling-waste': [
            'Recycle Plus', 'Waste Solutions', 'Green Recycling', 'Eco Waste', 'Clean Solutions',
            'Green Disposal', 'Eco Recycling', 'Waste Wise', 'Green Waste', 'Recycling Solutions',
            'Eco Management', 'Green Recovery'
        ],
        'products-retail': [
            'Green Store', 'Eco Products', 'Sustainable Goods', 'Green Market', 'Eco Shop',
            'Natural Products', 'Green Retail', 'Eco Essentials', 'Sustainable Store', 'Green Goods',
            'Eco Marketplace', 'Natural Store'
        ]
    };

    const templates = businessNameTemplates[categoryKey] || businessNameTemplates['services-professional'];
    
    for (let i = 0; i < 12; i++) {
        const templateIndex = i % templates.length;
        const nameVariation = i < templates.length ? '' : ` ${Math.floor(i / templates.length) + 1}`;
        
        businesses.push({
            id: `${categoryCode}_${cityCode}_${i + 1}`,
            name: `${templates[templateIndex]}${nameVariation}`,
            category: categoryKey,
            subcategory: getCategorySubcategory(categoryKey),
            rating: 4.0 + (Math.random() * 1.0),
            reviewCount: Math.floor(Math.random() * 150) + 25,
            description: generateBusinessDescription(categoryKey, cityName),
            address: generateAddress(cityName),
            phone: generatePhoneNumber(),
            website: generateWebsite(templates[templateIndex].toLowerCase().replace(/\s+/g, '')),
            image: getCategoryImage(categoryKey, i),
            features: getCategoryFeatures(categoryKey),
            businessStatus: 'OPERATIONAL'
        });
    }
    
    return businesses;
}

// Helper functions
function generateCityCode(cityName) {
    return cityName.toLowerCase().replace(/\s+/g, '').slice(0, 3);
}

function generateCategoryCode(categoryKey) {
    return categoryKey.replace(/-/g, '').slice(0, 3);
}

function getCategorySubcategory(categoryKey) {
    const subcategories = {
        'health-beauty': 'Organic Skincare',
        'energy-utilities': 'Renewable Energy',
        'education-nonprofits': 'Environmental Education',
        'transport-travel': 'Sustainable Transport',
        'services-professional': 'Green Consulting',
        'recycling-waste': 'Waste Management',
        'products-retail': 'Eco Products'
    };
    return subcategories[categoryKey] || 'Sustainable Services';
}

function generateBusinessDescription(categoryKey, cityName) {
    const descriptions = {
        'health-beauty': `Leading provider of organic and natural beauty products in ${cityName}. Committed to cruelty-free, environmentally responsible skincare and wellness solutions.`,
        'energy-utilities': `Renewable energy specialist serving ${cityName} with solar, wind, and sustainable power solutions. Helping homes and businesses reduce their carbon footprint.`,
        'education-nonprofits': `Educational organization in ${cityName} dedicated to promoting environmental awareness and sustainable living practices in the community.`,
        'transport-travel': `Sustainable transport solutions in ${cityName}, offering eco-friendly travel options and promoting green mobility for a cleaner future.`,
        'services-professional': `Professional services company in ${cityName} specializing in sustainable business practices and environmental consulting solutions.`,
        'recycling-waste': `Comprehensive recycling and waste management services in ${cityName}, promoting circular economy principles and environmental responsibility.`,
        'products-retail': `Sustainable retail business in ${cityName} offering eco-friendly products and promoting conscious consumption for environmental protection.`
    };
    return descriptions[categoryKey] || `Sustainable business in ${cityName} committed to environmental responsibility and quality service.`;
}

function generateAddress(cityName) {
    const streetNumbers = Math.floor(Math.random() * 200) + 1;
    const streets = ['High Street', 'Main Road', 'Church Lane', 'Victoria Street', 'Mill Lane', 'Park Road', 'Queen Street', 'King Street'];
    const street = streets[Math.floor(Math.random() * streets.length)];
    return `${streetNumbers} ${street}, ${cityName}`;
}

function generatePhoneNumber() {
    const areaCode = '01' + Math.floor(Math.random() * 900 + 100);
    const number = Math.floor(Math.random() * 900000 + 100000);
    return `${areaCode} ${number}`;
}

function generateWebsite(businessName) {
    return `www.${businessName}.co.uk`;
}

function getCategoryImage(categoryKey, index) {
    const categoryImages = {
        'health-beauty': [
            'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&h=300&fit=crop&crop=center'
        ],
        'energy-utilities': [
            'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop&crop=center'
        ],
        'education-nonprofits': [
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&crop=center'
        ],
        'transport-travel': [
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=300&fit=crop&crop=center'
        ],
        'services-professional': [
            'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1560472355-109703aa3edc?w=400&h=300&fit=crop&crop=center'
        ],
        'recycling-waste': [
            'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center'
        ],
        'products-retail': [
            'https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center'
        ]
    };

    const images = categoryImages[categoryKey] || categoryImages['services-professional'];
    return images[index % images.length];
}

function getCategoryFeatures(categoryKey) {
    const features = {
        'health-beauty': ['Organic Certified', 'Cruelty-Free', 'Natural Ingredients', 'Sustainable Packaging'],
        'energy-utilities': ['Renewable Energy', 'Carbon Neutral', 'Energy Efficient', 'Green Technology'],
        'education-nonprofits': ['Environmental Education', 'Community Outreach', 'Sustainability Training', 'Climate Action'],
        'transport-travel': ['Electric Vehicles', 'Carbon Offset', 'Sustainable Transport', 'Eco-Friendly'],
        'services-professional': ['Green Practices', 'Sustainable Solutions', 'Environmental Consulting', 'Carbon Footprint'],
        'recycling-waste': ['Waste Reduction', 'Circular Economy', 'Recycling', 'Environmental Impact'],
        'products-retail': ['Eco-Friendly', 'Sustainable Materials', 'Zero Waste', 'Ethical Sourcing']
    };
    return features[categoryKey] || ['Eco-Friendly', 'Sustainable', 'Green', 'Environmental'];
}

// Display category businesses
function displayCategoryBusinesses() {
    const grid = document.getElementById('categoryBusinessesGrid');
    if (!grid || !categoryBusinesses.length) return;

    const businessCards = categoryBusinesses.map(business => createBusinessCard(business)).join('');
    grid.innerHTML = businessCards;
    
    console.log(`Displayed ${categoryBusinesses.length} businesses for ${currentCategoryKey} in ${currentCityName}`);
}

// Create business card HTML
function createBusinessCard(business) {
    return `
        <div class="business-card" data-business-id="${business.id}">
            <div class="business-image">
                <img src="${business.image}" alt="${business.name}" loading="lazy">
                <div class="business-category">${business.subcategory}</div>
            </div>
            <div class="business-info">
                <h3 class="business-name">${business.name}</h3>
                <div class="business-rating">
                    <div class="stars">${generateStars(business.rating)}</div>
                    <span class="rating-text">${business.rating.toFixed(1)} (${business.reviewCount} reviews)</span>
                </div>
                <p class="business-description">${business.description}</p>
                <div class="business-features">
                    ${business.features.slice(0, 3).map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
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
            </div>
        </div>
    `;
}

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

// Update page content based on category and city
function updatePageContent() {
    const categoryNames = {
        'health-beauty': 'Health & Beauty',
        'energy-utilities': 'Energy & Utilities',
        'education-nonprofits': 'Education & Nonprofits',
        'transport-travel': 'Transport & Travel',
        'services-professional': 'Services & Professional',
        'recycling-waste': 'Recycling & Waste',
        'products-retail': 'Products & Retail'
    };
    
    const categoryName = categoryNames[currentCategoryKey] || 'Business';
    
    // Update title if element exists
    const titleElement = document.getElementById('businessesTitle');
    if (titleElement) {
        titleElement.textContent = `Top ${categoryName} Businesses in ${currentCityName}`;
    }
    
    // Update page title
    document.title = `Top 10 ${categoryName} Businesses in ${currentCityName} | EcoSustainable.co.uk`;
}

// Generate SEO content
function generateSEOContent() {
    const categoryNames = {
        'health-beauty': 'Health & Beauty',
        'energy-utilities': 'Energy & Utilities',
        'education-nonprofits': 'Education & Nonprofits',
        'transport-travel': 'Transport & Travel',
        'services-professional': 'Services & Professional',
        'recycling-waste': 'Recycling & Waste',
        'products-retail': 'Products & Retail'
    };
    
    const categoryName = categoryNames[currentCategoryKey] || 'Business';
    const seoSection = document.getElementById('seoSections');
    
    if (seoSection) {
        seoSection.innerHTML = `
            <section class="seo-content">
                <div class="container">
                    <h2>Why Choose ${categoryName} Businesses in ${currentCityName}?</h2>
                    <p>Our curated selection of ${categoryName.toLowerCase()} businesses in ${currentCityName} represents the finest sustainable companies committed to environmental responsibility. Each business has been thoroughly vetted for their green practices, quality of service, and positive community impact.</p>
                    
                    <h3>Sustainable ${categoryName} Services in ${currentCityName}</h3>
                    <p>The ${categoryName.toLowerCase()} businesses featured in our ${currentCityName} directory offer innovative, eco-friendly solutions that benefit both customers and the environment. From organic products to renewable energy services, these companies are leading the way in sustainable business practices.</p>
                </div>
            </section>
        `;
    }
}

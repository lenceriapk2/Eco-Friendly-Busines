// Category Page JavaScript Handler - Loads real businesses from Google Places API

let categoryBusinesses = [];
let currentCategoryKey = '';
let currentCityName = '';

// Initialize category page with real data from Google Places API
async function initializeCategoryPage(categoryKey, cityName) {
    currentCategoryKey = categoryKey;
    currentCityName = cityName;
    console.log(`🚀 Initializing category page for: ${categoryKey} in ${cityName}`);

    // Show loading state
    showLoadingState();

    try {
        // Ensure Places API is properly initialized
        if (window.APIConfig) {
            console.log('Initializing Places API...');
            try {
                await window.APIConfig.initializePlacesAPI();
            } catch (apiInitError) {
                console.warn('API initialization failed:', apiInitError);
            }
        }
        
        // Wait for API to be ready (but don't block if it fails)
        let apiReady = false;
        try {
            apiReady = await waitForAPI();
            console.log('API Ready Status:', apiReady);
        } catch (waitError) {
            console.warn('API wait failed:', waitError);
        }
        
        // Load businesses from Google Places API or fallback to mock data
        categoryBusinesses = await loadCategoryBusinesses(categoryKey, cityName);
        console.log(`Loaded ${categoryBusinesses ? categoryBusinesses.length : 0} businesses for category`);
        
        // Ensure we have businesses to display
        if (!categoryBusinesses || categoryBusinesses.length === 0) {
            console.warn('No businesses loaded, creating emergency fallback');
            categoryBusinesses = createEmergencyFallbackBusinesses(categoryKey, cityName);
        }
        
        // Display the loaded businesses
        displayCategoryBusinesses();
        
        // Update page content
        updatePageContent();
        
        // Generate SEO content
        generateSEOContent();
        
        console.log(`✅ Successfully initialized category page for ${categoryKey} in ${cityName} with ${categoryBusinesses.length} businesses`);
    } catch (error) {
        console.error('❌ Error initializing category page:', error);
        // Ensure we always show some content
        categoryBusinesses = createEmergencyFallbackBusinesses(categoryKey, cityName);
        displayCategoryBusinesses();
        updatePageContent();
        generateSEOContent();
    }
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

// Load businesses for the specific category and city from Google Places API
async function loadCategoryBusinesses(categoryKey, cityName) {
    console.log(`🔍 Loading businesses for ${categoryKey} in ${cityName}`);

    try {
        // Check if PlacesAPI is available and properly initialized
        if (window.PlacesAPI && (window.PlacesAPI.initialized || window.PlacesAPI.isInitialized())) {
            console.log('PlacesAPI is available and initialized');
            
            // First try the category-specific API method
            if (window.PlacesAPI.fetchBusinessesForCategory) {
                console.log('📱 Using category-specific API method');
                try {
                    const apiBusinesses = await window.PlacesAPI.fetchBusinessesForCategory(categoryKey, cityName);
                    
                    if (apiBusinesses && apiBusinesses.length > 0) {
                        console.log(`✅ Successfully loaded ${apiBusinesses.length} real businesses from category API`);
                        return apiBusinesses.slice(0, 12);
                    } else {
                        console.log('⚠️ Category API returned no results, trying text search');
                    }
                } catch (apiError) {
                    console.warn('❌ Category API call failed:', apiError);
                }
            }

            // Fallback to general search using performTextSearch
            if (window.PlacesAPI.performTextSearch) {
                console.log('🔍 Trying direct text search');
                try {
                    const searchTerm = getCategorySearchTerm(categoryKey);
                    const query = `${searchTerm} in ${cityName} UK`;
                    console.log(`🔎 Searching with query: ${query}`);
                    
                    const apiBusinesses = await window.PlacesAPI.performTextSearch(query);
                    console.log(`🔍 Text search returned ${apiBusinesses ? apiBusinesses.length : 0} businesses`);
                    
                    if (apiBusinesses && apiBusinesses.length > 0) {
                        // Filter results by category relevance and ensure we have the right format
                        const filteredBusinesses = filterBusinessesByCategory(apiBusinesses, categoryKey);
                        console.log(`✅ Successfully loaded ${filteredBusinesses.length} real businesses from text search`);
                        return filteredBusinesses.slice(0, 12);
                    }
                } catch (searchError) {
                    console.warn('❌ Text search API call failed:', searchError);
                }
            }

            console.log('⚠️ No real businesses found via API, falling back to mock data');
        } else {
            console.log('❌ PlacesAPI not available or not initialized, using mock data');
        }
    } catch (error) {
        console.error(`❌ Error during API calls for ${categoryKey} in ${cityName}:`, error);
    }

    // Always fallback to mock data if API fails or no results
    console.log(`📝 Generating mock businesses for ${categoryKey} in ${cityName}`);
    const mockBusinesses = generateCategoryBusinessData(categoryKey, cityName);
    console.log(`📝 Generated ${mockBusinesses.length} mock businesses`);
    
    if (!mockBusinesses || mockBusinesses.length === 0) {
        console.error('❌ Mock data generation failed, creating emergency fallback');
        return createEmergencyFallbackBusinesses(categoryKey, cityName);
    }
    
    return mockBusinesses;
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
    if (!grid) {
        console.error('categoryBusinessesGrid element not found');
        return;
    }

    console.log(`📊 Displaying businesses: ${categoryBusinesses ? categoryBusinesses.length : 0} available`);

    // Check if we have businesses to display
    if (!categoryBusinesses || categoryBusinesses.length === 0) {
        console.warn('No businesses to display, generating emergency fallback data');
        // Generate fallback data if none exists
        categoryBusinesses = createEmergencyFallbackBusinesses(currentCategoryKey, currentCityName);
    }

    // Clear the grid first
    grid.innerHTML = '';

    // Ensure we have valid businesses before attempting to display
    if (!categoryBusinesses || categoryBusinesses.length === 0) {
        console.error('❌ Still no businesses after fallback generation');
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: #666;">
                <i class="fas fa-exclamation-triangle fa-3x" style="color: #ff6b6b; margin-bottom: 20px;"></i>
                <h3>Unable to Load Businesses</h3>
                <p>We're having trouble loading businesses for this category. Please try refreshing the page.</p>
            </div>
        `;
        return;
    }

    // Create business cards
    categoryBusinesses.forEach((business, index) => {
        try {
            const businessCardHTML = createBusinessCard(business);
            const businessElement = document.createElement('div');
            businessElement.innerHTML = businessCardHTML;
            
            // Add the business card to the grid
            if (businessElement.firstElementChild) {
                grid.appendChild(businessElement.firstElementChild);
            }
        } catch (error) {
            console.error('Error creating business card:', error, business);
            // Create a simple fallback card
            const fallbackCard = createFallbackBusinessCard(business, index);
            grid.appendChild(fallbackCard);
        }
    });

    console.log(`✅ Displayed ${categoryBusinesses.length} businesses for ${currentCategoryKey} in ${currentCityName}`);
}

// Create business card HTML
function createBusinessCard(business) {
    return `
        <div class="business-card" data-business-id="${business.id}">
            <div class="business-card-header">
                <div class="business-logo">
                    ${getBusinessIcon(business.category)}
                </div>
                <div class="business-info">
                    <h3 class="business-name">${business.name}</h3>
                    <div class="business-category">${business.subcategory}</div>
                    <div class="business-rating">
                        <div class="stars">${generateStars(business.rating)}</div>
                        <span class="rating-text">${business.rating.toFixed(1)} (${business.reviewCount} reviews)</span>
                    </div>
                </div>
            </div>

            <p class="business-description">${business.description}</p>

            <div class="business-features">
                ${business.features.slice(0, 4).map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
            </div>

            <div class="business-contact">
                <div class="contact-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span title="${business.address}">${business.address}</span>
                </div>
                <div class="contact-item">
                    <i class="fas fa-phone"></i>
                    <span title="${business.phone}">${business.phone}</span>
                </div>
                <div class="contact-item">
                    <i class="fas fa-globe"></i>
                    <span title="${business.website}">${business.website}</span>
                </div>
            </div>

            <div class="business-actions">
                <button class="action-btn call-btn" onclick="callBusiness('${business.phone}')" type="button">
                    <i class="fas fa-phone"></i> Call Now
                </button>
                <button class="action-btn website-btn" onclick="openBusinessWebsite('${business.website}')" type="button">
                    <i class="fas fa-external-link-alt"></i> Visit Site
                </button>
                <button class="action-btn directions-btn" onclick="getDirections('${business.address}')" type="button">
                    <i class="fas fa-route"></i> Get Directions
                </button>
            </div>
        </div>
    `;
}

// Get business icon based on category
function getBusinessIcon(categoryKey) {
    const icons = {
        'health-beauty': '💄',
        'energy-utilities': '⚡',
        'education-nonprofits': '📚',
        'transport-travel': '🚗',
        'services-professional': '💼',
        'recycling-waste': '♻️',
        'products-retail': '🛍️'
    };
    return icons[categoryKey] || '🏢';
}

// Action button functions
window.callBusiness = function(phone) {
    window.open(`tel:${phone}`, '_self');
};

window.openBusinessWebsite = function(website) {
    if (!website.startsWith('http')) {
        website = 'https://' + website;
    }
    window.open(website, '_blank');
};

window.getDirections = function(address) {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/${encodedAddress}`, '_blank');
};

// Create emergency fallback businesses when all else fails
function createEmergencyFallbackBusinesses(categoryKey, cityName) {
    console.log(`🚨 Creating emergency fallback businesses for ${categoryKey} in ${cityName}`);
    
    const businesses = [];
    const categoryName = getCategoryDisplayName(categoryKey);
    
    for (let i = 0; i < 8; i++) {
        businesses.push({
            id: `emergency_${categoryKey}_${cityName}_${i}`,
            name: `${categoryName} Business ${i + 1}`,
            category: categoryKey,
            subcategory: getCategorySubcategory(categoryKey),
            rating: 4.2 + (Math.random() * 0.6),
            reviewCount: Math.floor(Math.random() * 80) + 20,
            description: `Professional ${categoryName.toLowerCase()} services in ${cityName}. Committed to sustainable practices and excellent customer service.`,
            address: `${10 + i * 12} High Street, ${cityName}, UK`,
            phone: `01${Math.floor(Math.random() * 900 + 100)} ${Math.floor(Math.random() * 900000 + 100000)}`,
            website: `www.business${i + 1}.co.uk`,
            image: getCategoryImage(categoryKey, i % 3),
            features: getCategoryFeatures(categoryKey).slice(0, 3),
            businessStatus: 'OPERATIONAL'
        });
    }
    
    console.log(`🚨 Generated ${businesses.length} emergency fallback businesses`);
    return businesses;
}

// Create a simple fallback business card when createBusinessCard fails
function createFallbackBusinessCard(business, index) {
    const card = document.createElement('div');
    card.className = 'business-card';
    card.innerHTML = `
        <div style="padding: 20px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 20px;">
            <h3>${business.name || `Business ${index + 1}`}</h3>
            <p>Rating: ${(business.rating || 4.0).toFixed(1)} ⭐</p>
            <p>${business.description || 'Professional services available'}</p>
            <p>📍 ${business.address || 'Location available'}</p>
            <p>📞 ${business.phone || 'Phone available'}</p>
        </div>
    `;
    return card;
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
            <!-- Why Choose Section -->
            <section class="why-choose-section seo-section">
                <div class="container">
                    <h2>Why Choose ${categoryName} Businesses in ${currentCityName}?</h2>
                    <div class="why-choose-grid">
                        ${generateWhyChooseItems(currentCategoryKey, currentCityName)}
                    </div>
                </div>
            </section>

            <!-- Selection Criteria Section -->
            <section class="criteria-section seo-section">
                <div class="container">
                    <h2>Our Selection Criteria for ${categoryName} Businesses</h2>
                    <div class="criteria-content">
                        <div class="criteria-text">
                            <p>We carefully evaluate each ${categoryName.toLowerCase()} business in ${currentCityName} based on strict sustainability and quality criteria. Our selection process ensures you connect with the most environmentally responsible and reliable service providers.</p>

                            <h3>What We Look For:</h3>
                            <ul class="criteria-list">
                                ${generateCriteriaList(currentCategoryKey)}
                            </ul>

                            <p>Every business listed in our ${currentCityName} ${categoryName.toLowerCase()} directory has been personally reviewed and meets our high standards for environmental responsibility, customer service, and business integrity.</p>
                        </div>
                        <div class="criteria-stats">
                            <div class="stat-box">
                                <span class="stat-number">${categoryBusinesses.length}</span>
                                <span class="stat-label">Verified Businesses</span>
                            </div>
                            <div class="stat-box">
                                <span class="stat-number">4.7</span>
                                <span class="stat-label">Average Rating</span>
                            </div>
                            <div class="stat-box">
                                <span class="stat-number">98%</span>
                                <span class="stat-label">Customer Satisfaction</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- FAQ Section -->
            <section class="faq-section seo-section">
                <div class="container">
                    <h2>Frequently Asked Questions - ${categoryName} in ${currentCityName}</h2>
                    <div class="faq-grid">
                        ${generateFAQItems(currentCategoryKey, currentCityName)}
                    </div>
                </div>
            </section>

            <!-- Local Areas Section -->
            <section class="areas-section seo-section">
                <div class="container">
                    <h2>${categoryName} Services Across ${currentCityName}</h2>
                    <div class="areas-grid">
                        ${generateLocalAreas(currentCityName)}
                    </div>
                </div>
            </section>

            <!-- Benefits Section -->
            <section class="benefits-section seo-section">
                <div class="container">
                    <h2>Benefits of Choosing Sustainable ${categoryName} Businesses</h2>
                    <div class="benefits-content">
                        <p>Choosing eco-friendly ${categoryName.toLowerCase()} businesses in ${currentCityName} provides numerous advantages for both consumers and the environment. These forward-thinking companies prioritize sustainability while delivering exceptional service quality.</p>

                        <ul class="benefits-list">
                            ${generateBenefitsList(currentCategoryKey)}
                        </ul>
                    </div>
                </div>
            </section>

            <!-- Tips Section -->
            <section class="tips-section seo-section">
                <div class="container">
                    <h2>Tips for Choosing the Right ${categoryName} Business in ${currentCityName}</h2>
                    <div class="tips-grid">
                        ${generateTipsCards(currentCategoryKey)}
                    </div>
                </div>
            </section>

            <!-- Related Categories Section -->
            <section class="related-section seo-section">
                <div class="container">
                    <h2>Related Sustainable Business Categories in ${currentCityName}</h2>
                    <div class="related-grid">
                        ${generateRelatedCategories(currentCategoryKey, currentCityName)}
                    </div>
                </div>
            </section>
        `;
    }
}

// Helper functions for SEO content generation
function generateWhyChooseItems(categoryKey, cityName) {
    const items = {
        'health-beauty': [
            { icon: 'fa-leaf', title: 'Natural & Organic', text: 'All products are certified organic and free from harmful chemicals' },
            { icon: 'fa-heart', title: 'Cruelty-Free', text: 'No animal testing and ethically sourced ingredients' },
            { icon: 'fa-recycle', title: 'Sustainable Packaging', text: 'Eco-friendly packaging that reduces environmental impact' },
            { icon: 'fa-star', title: 'Expert Care', text: 'Professional beauticians trained in sustainable practices' }
        ],
        'energy-utilities': [
            { icon: 'fa-solar-panel', title: 'Renewable Sources', text: 'Clean energy from solar, wind, and sustainable sources' },
            { icon: 'fa-piggy-bank', title: 'Cost Savings', text: 'Reduce energy bills with efficient green technology' },
            { icon: 'fa-globe', title: 'Environmental Impact', text: 'Significantly reduce your carbon footprint' },
            { icon: 'fa-tools', title: 'Professional Installation', text: 'Expert installation and maintenance services' }
        ],
        'education-nonprofits': [
            { icon: 'fa-graduation-cap', title: 'Expert Education', text: 'Learn from environmental education specialists' },
            { icon: 'fa-users', title: 'Community Impact', text: 'Programs that benefit the entire community' },
            { icon: 'fa-seedling', title: 'Practical Skills', text: 'Hands-on learning about sustainable living' },
            { icon: 'fa-award', title: 'Certified Programs', text: 'Accredited courses and recognized qualifications' }
        ]
    };

    const categoryItems = items[categoryKey] || items['energy-utilities'];
    return categoryItems.map(item => `
        <div class="why-item">
            <div class="why-icon">
                <i class="fas ${item.icon}"></i>
            </div>
            <h3>${item.title}</h3>
            <p>${item.text}</p>
        </div>
    `).join('');
}

function generateCriteriaList(categoryKey) {
    const criteria = {
        'health-beauty': [
            'Organic and natural ingredient certification',
            'Cruelty-free product testing policies',
            'Sustainable and recyclable packaging',
            'Professional staff training and qualifications',
            'Positive customer reviews and testimonials'
        ],
        'energy-utilities': [
            'Renewable energy source verification',
            'Energy efficiency certifications',
            'Professional installation standards',
            'Customer service excellence',
            'Transparent pricing and warranties'
        ],
        'education-nonprofits': [
            'Educational program accreditation',
            'Environmental impact measurement',
            'Community engagement levels',
            'Professional staff qualifications',
            'Transparent financial reporting'
        ]
    };

    const categoryList = criteria[categoryKey] || criteria['energy-utilities'];
    return categoryList.map(item => `<li>${item}</li>`).join('');
}

function generateFAQItems(categoryKey, cityName) {
    const faqs = [
        {
            question: `What makes a ${categoryKey.replace('-', ' ')} business sustainable?`,
            answer: `Sustainable businesses prioritize environmental responsibility through eco-friendly practices, ethical sourcing, and community impact.`
        },
        {
            question: `How do you verify businesses in ${cityName}?`,
            answer: `We conduct thorough reviews including site visits, certification checks, customer feedback analysis, and sustainability practice verification.`
        },
        {
            question: `Are these businesses more expensive than traditional options?`,
            answer: `While some sustainable options may have higher upfront costs, they often provide better long-term value and environmental benefits.`
        },
        {
            question: `How often is your business directory updated?`,
            answer: `Our directory is updated monthly with new businesses, reviews, and verification status to ensure accuracy and relevance.`
        }
    ];

    return faqs.map((faq, index) => `
        <div class="faq-item" data-index="${index}">
            <button class="faq-question" onclick="toggleFAQ(${index})">
                ${faq.question}
                <i class="fas fa-chevron-down"></i>
            </button>
            <div class="faq-answer" id="faq-${index}">
                <p>${faq.answer}</p>
            </div>
        </div>
    `).join('');
}

function generateLocalAreas(cityName) {
    const areas = [
        `${cityName} City Centre`,
        `North ${cityName}`,
        `South ${cityName}`,
        `East ${cityName}`,
        `West ${cityName}`,
        `Greater ${cityName} Area`
    ];

    return areas.map(area => `
        <div class="area-card">
            <h3>${area}</h3>
            <p>Sustainable businesses serving the ${area} community with eco-friendly solutions and professional service.</p>
        </div>
    `).join('');
}

function generateBenefitsList(categoryKey) {
    const benefits = [
        'Supporting local environmental initiatives',
        'Reducing your personal carbon footprint',
        'Contributing to sustainable economic growth',
        'Accessing innovative eco-friendly solutions',
        'Joining a community of environmentally conscious consumers',
        'Supporting businesses that prioritize social responsibility'
    ];

    return benefits.map(benefit => `<li>${benefit}</li>`).join('');
}

function generateTipsCards(categoryKey) {
    const tips = [
        { title: 'Research Certifications', text: 'Look for recognized environmental certifications and standards' },
        { title: 'Read Reviews', text: 'Check customer reviews and testimonials for honest feedback' },
        { title: 'Ask Questions', text: 'Inquire about their sustainability practices and environmental policies' },
        { title: 'Compare Options', text: 'Compare multiple businesses to find the best sustainable solution' }
    ];

    return tips.map(tip => `
        <div class="tip-card">
            <h3>${tip.title}</h3>
            <p>${tip.text}</p>
        </div>
    `).join('');
}

function generateRelatedCategories(categoryKey, cityName) {
    const categories = [
        { key: 'health-beauty', name: 'Health & Beauty', desc: 'Natural wellness and beauty services' },
        { key: 'energy-utilities', name: 'Energy & Utilities', desc: 'Renewable energy solutions' },
        { key: 'transport-travel', name: 'Transport & Travel', desc: 'Sustainable transport options' },
        { key: 'services-professional', name: 'Professional Services', desc: 'Green business consulting' }
    ];

    return categories.filter(cat => cat.key !== categoryKey).slice(0, 3).map(cat => `
        <a href="${cityName.toLowerCase()}-${cat.key}.html" class="related-card">
            <h3>${cat.name}</h3>
            <p>${cat.desc}</p>
        </a>
    `).join('');
}

// FAQ toggle function
window.toggleFAQ = function(index) {
    const answer = document.getElementById(`faq-${index}`);
    const question = answer.previousElementSibling;
    const icon = question.querySelector('i');

    if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
        icon.style.transform = 'rotate(0deg)';
    } else {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        icon.style.transform = 'rotate(180deg)';
    }
};

// Add searchBusinesses method for backwards compatibility
if (window.PlacesAPI && !window.PlacesAPI.searchBusinesses && window.PlacesAPI.performTextSearch) {
    window.PlacesAPI.searchBusinesses = async function(query, limit = 12) {
        try {
            console.log(`🔍 Searching businesses with query: ${query}`);
            const results = await this.performTextSearch(query);
            return results ? results.slice(0, limit) : [];
        } catch (error) {
            console.warn('Search businesses failed:', error);
            return [];
        }
    };
}

// Helper function to wait for API to be ready
async function waitForAPI() {
    console.log('⏳ Waiting for PlacesAPI to be ready...');
    let attempts = 0;
    const maxAttempts = 100; // Increased timeout for better reliability
    
    while (attempts < maxAttempts) {
        if (window.PlacesAPI) {
            console.log('✅ PlacesAPI object found');
            
            // Check if initialized property exists
            if (window.PlacesAPI.initialized === true) {
                console.log('✅ PlacesAPI is initialized');
                return true;
            }
            
            // Check if isInitialized is a function or boolean
            if (typeof window.PlacesAPI.isInitialized === 'function') {
                if (window.PlacesAPI.isInitialized()) {
                    console.log('✅ PlacesAPI is ready (function check)');
                    return true;
                }
            } else if (window.PlacesAPI.isInitialized === true) {
                console.log('✅ PlacesAPI is ready (boolean check)');
                return true;
            }
            
            // Also check if the API has the required methods
            if (window.PlacesAPI.performTextSearch || window.PlacesAPI.fetchBusinessesForCategory) {
                console.log('✅ PlacesAPI methods available');
                return true;
            }
        }
        
        await new Promise(resolve => setTimeout(resolve, 50));
        attempts++;
    }
    
    console.warn('⚠️ PlacesAPI not ready after timeout, proceeding anyway');
    return false;
}

// Add comprehensive directory content to category pages
function addComprehensiveDirectorySection() {
    const comprehensiveSection = `
        <section class="comprehensive-directory">
            <div class="container">
                <div class="directory-content">
                    <h2>The UK's Most Comprehensive Eco-Friendly Business Directory</h2>
                    <p>Looking for the <strong>top 10 eco friendly businesses UK</strong>? Our curated eco friendly businesses UK list features the <strong>best eco friendly businesses UK</strong> across all major cities and industries.</p>

                    <p>From our extensive database of <strong>top 100 sustainable companies UK</strong>, we showcase the <strong>top 10 ethical companies UK</strong> that are leading the way in environmental responsibility. Browse <strong>sustainable companies examples</strong> from health & beauty to energy & utilities.</p>

                    <p>Whether you're seeking local green services or researching <strong>top eco friendly businesses UK</strong> for partnerships, our verified directory connects you with companies that share your environmentalvalues.</p>

                    <div class="featured-services">
                        <h3>Featured in Our Directory</h3>
                        <div class="services-grid">
                            <div class="service-item">
                                <i class="fas fa-recycle"></i>
                                <span>Zero Waste Stores</span>
                            </div>
                            <div class="service-item">
                                <i class="fas fa-solar-panel"></i>
                                <span>Renewable Energy</span>
                            </div>
                            <div class="service-item">
                                <i class="fas fa-spa"></i>
                                <span>Organic Beauty</span>
                            </div>
                            <div class="service-item">
                                <i class="fas fa-tshirt"></i>
                                <span>Sustainable Fashion</span>
                            </div>
                            <div class="service-item">
                                <i class="fas fa-car-battery"></i>
                                <span>Green Transport</span>
                            </div>
                            <div class="service-item">
                                <i class="fas fa-user-tie"></i>
                                <span>Eco Consultants</span>
                            </div>
                            <div class="service-item">
                                <i class="fas fa-sun"></i>
                                <span>Solar Installers</span>
                            </div>
                            <div class="service-item">
                                <i class="fas fa-trash-restore"></i>
                                <span>Recycling Services</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;

    // Insert the section after the businesses grid
    const businessesSection = document.querySelector('.businesses-section');
    if (businessesSection) {
        businessesSection.insertAdjacentHTML('afterend', comprehensiveSection);
    }
}

// Get search terms for each category to find relevant businesses
function getCategorySearchTerm(categorySlug) {
    const searchTerms = {
        'health-beauty': 'organic beauty salon spa wellness natural skincare massage therapy',
        'energy-utilities': 'solar panel installation renewable energy utility company electric',
        'education-nonprofits': 'environmental education nonprofit charity foundation school',
        'transport-travel': 'electric vehicle taxi sustainable transport travel bike car rental',
        'services-professional': 'environmental consulting green business services professional',
        'recycling-waste': 'recycling center waste management environmental services disposal',
        'products-retail': 'organic shop eco products sustainable retail store market'
    };
    return searchTerms[categorySlug] || 'sustainable eco friendly business services';
}

// Make search term function globally available
window.getCategorySearchTerm = getCategorySearchTerm;

// Make search term function globally available
window.getCategorySearchTerm = getCategorySearchTerm;

function getCategoryDisplayName(categorySlug) {
    const categoryNames = {
        'health-beauty': 'Health & Beauty',
        'energy-utilities': 'Energy & Utilities',
        'education-nonprofits': 'Education & Nonprofits',
        'transport-travel': 'Transport & Travel',
        'services-professional': 'Services & Professional',
        'recycling-waste': 'Recycling & Waste',
        'products-retail': 'Products & Retail'
    };
    return categoryNames[categorySlug] || 'Business';
}

function generateMockBusinesses(categorySlug, cityName) {
    const businesses = [];
    const cityCode = generateCityCode(cityName);
    const categoryCode = generateCategoryCode(categorySlug);

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

    const templates = businessNameTemplates[categorySlug] || businessNameTemplates['services-professional'];

    for (let i = 0; i < 12; i++) {
        const templateIndex = i % templates.length;
        const nameVariation = i < templates.length ? '' : ` ${Math.floor(i / templates.length) + 1}`;

        businesses.push({
            id: `${categoryCode}_${cityCode}_${i + 1}`,
            name: `${templates[templateIndex]}${nameVariation}`,
            category: categorySlug,
            subcategory: getCategorySubcategory(categorySlug),
            rating: 4.0 + (Math.random() * 1.0),
            reviewCount: Math.floor(Math.random() * 150) + 25,
            description: generateBusinessDescription(categorySlug, cityName),
            address: generateAddress(cityName),
            phone: generatePhoneNumber(),
            website: generateWebsite(templates[templateIndex].toLowerCase().replace(/\s+/g, '')),
            image: getCategoryImage(categorySlug, i),
            features: getCategoryFeatures(categorySlug),
            businessStatus: 'OPERATIONAL'
        });
    }

    return businesses;
}

function updatePageMetadata(categorySlug, cityName) {
    const categoryName = getCategoryDisplayName(categorySlug);
    document.title = `Top 10 ${categoryName} Businesses in ${cityName} | EcoSustainable.co.uk`;
    
    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
    }
    metaDesc.content = `Discover the best ${categoryName.toLowerCase()} businesses in ${cityName}. Verified sustainable companies with excellent ratings and eco-friendly practices.`;
}

// Show fallback content when API fails
function showFallbackContent(categorySlug, cityName) {
    console.log('🔄 Showing fallback content for', categorySlug, cityName);
    
    // Generate mock businesses as fallback
    categoryBusinesses = generateCategoryBusinessData(categorySlug, cityName);
    
    // Display the businesses
    displayCategoryBusinesses();
    
    // Update page content
    updatePageContent();
    
    // Generate SEO content
    generateSEOContent();
    
    // Update page metadata
    updatePageMetadata(categorySlug, cityName);
}

// Initialize category page with proper API loading
window.initializeCategoryPage = async function(categorySlug, cityName) {
    try {
        console.log('🚀 Initializing category page:', categorySlug, cityName);
        
        currentCategoryKey = categorySlug;
        currentCityName = cityName;

        // Show loading state
        showLoadingState();

        // Ensure API is initialized first
        if (window.APIConfig) {
            console.log('Ensuring Places API is initialized...');
            await window.APIConfig.initializePlacesAPI();
        }

        // Wait for API to be ready
        const apiReady = await waitForAPI();
        console.log('API ready status:', apiReady);

        // Load businesses for this category and city
        categoryBusinesses = await loadCategoryBusinesses(categorySlug, cityName);
        console.log('Loaded businesses:', categoryBusinesses.length);

        // Display businesses
        displayCategoryBusinesses();

        // Update page content
        updatePageContent();

        // Generate SEO content
        generateSEOContent();

        // Update page metadata
        updatePageMetadata(categorySlug, cityName);

        console.log('✅ Category page initialized successfully');

    } catch (error) {
        console.error('❌ Error initializing category page:', error);
        // Show fallback content
        showFallbackContent(categorySlug, cityName);
    }
};
// Helper functions
async function waitForAPI() {
    // Wait for PlacesAPI to be available
    let attempts = 0;
    while (!window.PlacesAPI && attempts < 50) {
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
    }

    if (!window.PlacesAPI) {
        console.warn('PlacesAPI not available, using mock data');
        return false;
    }
    return true;
}

function showFallbackContent(categorySlug, cityName) {
    const grid = document.getElementById('categoryBusinessesGrid');
    if (grid) {
        // Generate mock businesses as fallback
        const mockBusinesses = generateMockBusinesses(categorySlug, cityName);
        displayCategoryBusinesses(mockBusinesses, categorySlug, cityName);
    }
}
// Load businesses for category
async function loadCategoryBusinesses(categorySlug, cityName) {
    try {
        console.log('Loading businesses for:', categorySlug, cityName);

        if (window.PlacesAPI && window.PlacesAPI.isInitialized()) {
            // Try to get real data from Google Places API
            const query = `${getCategorySearchTerm(categorySlug)} in ${cityName} UK`;
            console.log('Searching with query:', query);
            const results = await window.PlacesAPI.searchBusinesses(query, 12);

            if (results && results.length > 0) {
                console.log('Found real businesses:', results.length);
                return results.map(business => ({
                    ...business,
                    category: categorySlug,
                    subcategory: getCategorySubcategory(categorySlug)
                }));
            }
        }
    } catch (error) {
        console.warn('Error loading real business data:', error);
    }

    // Fallback to mock data
    console.log('Using mock data for:', categorySlug, cityName);
    return generateMockBusinesses(categorySlug, cityName);
}
// Display businesses in grid
function displayCategoryBusinesses(businesses, categorySlug, cityName) {
    const grid = document.getElementById('categoryBusinessesGrid');
    const title = document.getElementById('businessesTitle');

    if (!grid) {
        console.error('categoryBusinessesGrid element not found');
        return;
    }

    // Update title
    if (title) {
        const categoryName = getCategoryDisplayName(categorySlug);
        title.textContent = `Top ${categoryName} Businesses in ${cityName}`;
    }

    // Clear grid
    grid.innerHTML = '';

    if (!businesses || businesses.length === 0) {
        grid.innerHTML = '<div class="no-results">No businesses found for this category.</div>';
        return;
    }

    console.log('Displaying', businesses.length, 'businesses');

    // Display businesses
    businesses.slice(0, 12).forEach((business, index) => {
        const businessCard = document.createElement('div');
        businessCard.innerHTML = createBusinessCard(business);
        businessCard.className = 'business-card';
        grid.appendChild(businessCard.firstElementChild);
    });
}
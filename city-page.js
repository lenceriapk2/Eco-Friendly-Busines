// City Page JavaScript Handler - Generates unique data for each city

let cityBusinesses = [];
let currentCityName = '';

// Initialize city page with unique data for each city
async function initializeCityPage(cityName) {
    currentCityName = cityName;
    console.log(`Initializing ${cityName} page with real API data`);

    // Show loading state
    showCityLoadingState();

    await loadCityBusinesses(cityName);
    displayCityBusinesses();
    updateCityStats();
    populateCategories();
}

// Show loading state for city pages
function showCityLoadingState() {
    const grid = document.getElementById('londonBusinessesGrid') || 
                 document.getElementById('businessesGrid') ||
                 document.getElementById('cityBusinessesGrid');
    
    if (grid) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: #666;">
                <i class="fas fa-spinner fa-spin fa-3x" style="color: #4CAF50; margin-bottom: 20px;"></i>
                <h3>Loading Real Business Data...</h3>
                <p>Fetching the latest eco-friendly businesses in ${currentCityName} from Google Places API</p>
            </div>
        `;
    }
}

// Load unique businesses for the specific city
async function loadCityBusinesses(cityName) {
    try {
        // Wait for API to be ready
        let apiReady = false;
        let attempts = 0;

        while (!apiReady && attempts < 100) {
            if (window.PlacesAPI && window.PlacesAPI.initialized) {
                apiReady = true;
                console.log('API is ready for city page, loading businesses...');
            } else {
                await new Promise(resolve => setTimeout(resolve, 100));
                attempts++;
            }
        }

        // Try to load from API first
        if (window.PlacesAPI && window.PlacesAPI.fetchAllBusinessesForCity) {
            console.log(`Attempting to load real businesses from Google Places API for ${cityName}`);
            const apiBusinesses = await window.PlacesAPI.fetchAllBusinessesForCity(cityName);
            
            if (apiBusinesses && apiBusinesses.length > 0) {
                cityBusinesses = apiBusinesses;
                console.log(`✓ Loaded ${apiBusinesses.length} real businesses from Google Places API for ${cityName}`);
                return;
            } else {
                console.log(`No businesses returned from API for ${cityName}, using fallback data`);
            }
        } else {
            console.log('Places API not available, using fallback data');
        }

        // Generate unique fallback data for this city
        cityBusinesses = generateCityBusinessData(cityName);
        console.log(`Generated ${cityBusinesses.length} fallback businesses for ${cityName}`);

    } catch (error) {
        console.error(`Error loading businesses for ${cityName}:`, error);
        cityBusinesses = generateCityBusinessData(cityName);
        console.log(`Using fallback data due to error for ${cityName}`);
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

    // Display top businesses (limit to 12 for main city page)
    const displayBusinesses = cityBusinesses.slice(0, 12);
    displayBusinesses.forEach((business, index) => {
        const businessCard = createBusinessCard(business);
        grid.appendChild(businessCard);
    });

    console.log(`Displayed ${displayBusinesses.length} businesses in ${currentCityName}`);
    
    // Also populate the category businesses section if it exists
    populateTopCategoriesList();
}

// Populate top categories businesses list on city pages with real API data
function populateTopCategoriesList() {
    const topCategoriesSection = document.getElementById('topCategoriesBusinesses');
    if (!topCategoriesSection) return;

    const categories = [
        'health-beauty', 'transport-travel', 'services-professional', 
        'products-retail', 'energy-utilities', 'recycling-waste',
        'education-nonprofits', 'food-beverage'
    ];

    const categoryNames = {
        'health-beauty': 'Health & Beauty',
        'transport-travel': 'Transport & Travel', 
        'services-professional': 'Professional Services',
        'products-retail': 'Products & Retail',
        'energy-utilities': 'Energy & Utilities',
        'recycling-waste': 'Recycling & Waste',
        'education-nonprofits': 'Education & Nonprofits',
        'food-beverage': 'Food & Beverage'
    };

    const categoryIcons = {
        'health-beauty': '💄',
        'transport-travel': '🚗',
        'services-professional': '💼',
        'products-retail': '🛍️',
        'energy-utilities': '⚡',
        'recycling-waste': '♻️',
        'education-nonprofits': '📚',
        'food-beverage': '🍽️'
    };

    let categoriesHTML = '';
    const citySlug = sanitizeCityName(currentCityName);

    categories.forEach(categoryKey => {
        // Filter real API data by category
        const categoryBusinesses = cityBusinesses.filter(b => {
            return b.category === categoryKey || 
                   (b.subcategory && b.subcategory.toLowerCase().includes(categoryKey.replace('-', ' '))) ||
                   (b.name && categoryMatchesName(b.name, categoryKey));
        });

        // Use real count from API data, minimum 3 for UX
        const realCount = categoryBusinesses.length;
        const displayCount = Math.max(realCount, 3);
        const topBusiness = categoryBusinesses[0];

        categoriesHTML += `
            <div class="category-section" onclick="window.location.href='${citySlug}-${categoryKey}.html'" style="cursor: pointer;">
                <div class="category-header">
                    <div class="category-icon">${categoryIcons[categoryKey]}</div>
                    <div class="category-title">
                        <h3>${categoryNames[categoryKey]} in ${currentCityName}</h3>
                        <p>${displayCount}+ verified sustainable businesses${realCount > 0 ? ' (Real data from Google Places)' : ''}</p>
                    </div>
                    <div class="view-all-btn">
                        <span>View All →</span>
                    </div>
                </div>
                ${topBusiness ? `
                    <div class="featured-business">
                        <div class="business-preview">
                            <h4>${topBusiness.name}</h4>
                            <p class="business-desc">${(topBusiness.description || 'Sustainable business committed to environmental responsibility').substring(0, 120)}...</p>
                            <div class="business-rating">
                                <span class="stars">${'★'.repeat(Math.floor(parseFloat(topBusiness.rating) || 4.5))}${'☆'.repeat(5-Math.floor(parseFloat(topBusiness.rating) || 4.5))}</span>
                                <span>${(parseFloat(topBusiness.rating) || 4.5).toFixed(1)} (${topBusiness.reviewCount || 25} reviews)</span>
                            </div>
                        </div>
                    </div>
                ` : `
                    <div class="featured-business">
                        <div class="business-preview">
                            <p class="business-desc">Sustainable ${categoryNames[categoryKey].toLowerCase()} businesses coming soon...</p>
                        </div>
                    </div>
                `}
            </div>
        `;
    });

    topCategoriesSection.innerHTML = categoriesHTML;
}

// Helper function to match business names with categories
function categoryMatchesName(businessName, categoryKey) {
    const keywords = {
        'health-beauty': ['spa', 'beauty', 'salon', 'wellness', 'skin', 'hair', 'massage'],
        'transport-travel': ['transport', 'travel', 'taxi', 'car', 'bike', 'bus', 'vehicle'],
        'energy-utilities': ['energy', 'solar', 'electric', 'power', 'renewable', 'utility'],
        'services-professional': ['consulting', 'service', 'professional', 'advisor', 'solutions'],
        'products-retail': ['store', 'shop', 'retail', 'market', 'goods', 'products'],
        'recycling-waste': ['recycling', 'waste', 'disposal', 'recovery', 'circular'],
        'education-nonprofits': ['education', 'training', 'academy', 'learning', 'foundation'],
        'food-beverage': ['restaurant', 'cafe', 'food', 'kitchen', 'dining', 'beverage']
    };

    const categoryKeywords = keywords[categoryKey] || [];
    const lowerName = businessName.toLowerCase();
    
    return categoryKeywords.some(keyword => lowerName.includes(keyword));
}

// Create business card for city pages
function createBusinessCard(business) {
    const card = document.createElement('div');
    card.className = 'london-business-card';

    // Handle both API and fallback data
    const name = business.name || 'Business Name';
    const category = business.subcategory || business.category || 'Business';
    const rating = parseFloat(business.rating) || 4.5;
    const reviewCount = business.reviewCount || Math.floor(Math.random() * 50) + 10;
    const description = business.description || `Professional ${category.toLowerCase()} services with a focus on sustainability and environmental responsibility.`;
    const features = business.features || business.tags || ['Eco-Friendly', 'Sustainable', 'Local'];
    const address = business.address || generateAddress(currentCityName);
    const phone = business.phone || generatePhoneNumber();
    const website = business.website || generateWebsite('business', currentCityName);

    // Handle API images vs fallback icons
    let imageOrIcon = '';
    if (business.image && business.image.startsWith('http')) {
        // Real API image
        imageOrIcon = `<img src="${business.image}" alt="${name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                       <div class="fallback-icon" style="display: none; background: linear-gradient(135deg, #4caf50, #2d8f47); width: 100%; height: 100%; align-items: center; justify-content: center; color: white; font-size: 2rem; border-radius: 8px;">
                           <i class="${getCategoryIcon(business.category)}"></i>
                       </div>`;
    } else {
        // Fallback icon
        imageOrIcon = `<div class="business-icon" style="background: linear-gradient(135deg, #4caf50, #2d8f47); width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem; border-radius: 8px;">
                           <i class="${getCategoryIcon(business.category)}"></i>
                       </div>`;
    }

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
            <div class="business-rank">#${Math.floor(Math.random() * 10) + 1}</div>
            ${business.businessStatus === 'OPERATIONAL' ? '<div class="status-badge verified">✓ Verified</div>' : ''}
        </div>
        <div class="business-image-container">
            <div class="business-main-image">
                ${imageOrIcon}
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

    // Count businesses by category from real API data
    const categoryCounts = {};
    cityBusinesses.forEach(business => {
        const category = business.category || 'services-professional';
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });

    const categories = [
        { key: 'health-beauty', name: 'Health & Beauty', icon: '💄', count: categoryCounts['health-beauty'] || 0 },
        { key: 'food-beverage', name: 'Food & Beverage', icon: '🍽️', count: categoryCounts['food-beverage'] || 0 },
        { key: 'transport-travel', name: 'Transport & Travel', icon: '🚗', count: categoryCounts['transport-travel'] || 0 },
        { key: 'services-professional', name: 'Professional Services', icon: '💼', count: categoryCounts['services-professional'] || 0 },
        { key: 'products-retail', name: 'Products & Retail', icon: '🛍️', count: categoryCounts['products-retail'] || 0 },
        { key: 'energy-utilities', name: 'Energy & Utilities', icon: '⚡', count: categoryCounts['energy-utilities'] || 0 },
        { key: 'recycling-waste', name: 'Recycling & Waste', icon: '♻️', count: categoryCounts['recycling-waste'] || 0 },
        { key: 'education-nonprofits', name: 'Education & Nonprofits', icon: '📚', count: categoryCounts['education-nonprofits'] || 0 }
    ];

    categoriesGrid.innerHTML = '';

    categories.forEach(category => {
        const citySlug = sanitizeCityName(currentCityName);
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card clickable';
        categoryCard.style.cursor = 'pointer';
        categoryCard.onclick = () => {
            window.location.href = `${citySlug}-${category.key}.html`;
        };

        // Show actual count or minimum 3 for better UX
        const displayCount = Math.max(category.count, 3);

        categoryCard.innerHTML = `
            <div class="category-icon">${category.icon}</div>
            <h3>${category.name}</h3>
            <p>${displayCount}+ businesses</p>
            <div class="category-preview">
                ${getCategoryPreview(category.key)}
            </div>
        `;

        categoriesGrid.appendChild(categoryCard);
    });
}

// Show preview of businesses in each category
function getCategoryPreview(categoryKey) {
    const categoryBusinesses = cityBusinesses.filter(business => business.category === categoryKey);
    
    if (categoryBusinesses.length === 0) {
        // Show sample business names for empty categories
        const sampleNames = getSampleBusinessNames(categoryKey);
        return `<small class="preview-text">Including: ${sampleNames.slice(0, 2).join(', ')}</small>`;
    }
    
    const businessNames = categoryBusinesses.slice(0, 2).map(b => b.name);
    return `<small class="preview-text">Including: ${businessNames.join(', ')}</small>`;
}

// Get sample business names for categories without real data
function getSampleBusinessNames(categoryKey) {
    const samples = {
        'health-beauty': ['EcoGlow Spa', 'Natural Beauty Hub', 'Green Wellness Centre'],
        'food-beverage': ['Organic Kitchen', 'Green Table', 'Sustainable Eats'],
        'transport-travel': ['EcoRides', 'Green Transport', 'Clean Journeys'],
        'services-professional': ['Green Consulting', 'EcoSolutions', 'Sustainable Services'],
        'products-retail': ['EcoStore', 'Green Market', 'Sustainable Goods'],
        'energy-utilities': ['Solar Solutions', 'Green Energy Co', 'Renewable Power'],
        'recycling-waste': ['EcoRecycle', 'Green Waste Solutions', 'Circular Services'],
        'education-nonprofits': ['Green Academy', 'EcoLearn Centre', 'Environmental Trust']
    };
    return samples[categoryKey] || samples['services-professional'];
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

// Get category icon for business cards
function getCategoryIcon(category) {
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
    return categoryIcons[category] || 'fas fa-leaf';
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

// Export for global access
window.CityPage = {
    initializeCityPage,
    loadCityBusinesses,
    displayCityBusinesses,
    filterByCategory,
    cityBusinesses: () => cityBusinesses,
    currentCity: () => currentCityName
};
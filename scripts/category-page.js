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
    const grid = document.getElementById('categoryBusinessesGrid') ||
                 document.getElementById('businessesGrid');
    
    if (!grid) {
        console.error('Category business grid container not found');
        return;
    }

    grid.innerHTML = '';

    if (categoryBusinesses.length === 0) {
        grid.innerHTML = '<div class="no-results"><p>No businesses found. Please try refreshing the page.</p></div>';
        return;
    }

    categoryBusinesses.forEach((business, index) => {
        const businessCard = createCategoryBusinessCard(business);
        grid.appendChild(businessCard);
    });

    console.log(`Displayed ${categoryBusinesses.length} businesses for ${currentCategoryKey} in ${currentCityName}`);
    
    // Add responsive sections after displaying businesses
    addCategoryResponsiveSections();
}

// Add responsive sections below category business listings
function addCategoryResponsiveSections() {
    const businessesSection = document.querySelector('.category-businesses');
    if (!businessesSection) return;

    const categoryName = getCategoryDisplayName(currentCategoryKey);
    
    const responsiveSection = document.createElement('div');
    responsiveSection.className = 'category-responsive-sections';
    
    responsiveSection.innerHTML = `
        <!-- Category Benefits -->
        <section class="category-benefits">
            <div class="container">
                <h2>Benefits of Choosing Sustainable ${categoryName} in ${currentCityName}</h2>
                <div class="benefits-grid">
                    <div class="benefit-card">
                        <div class="benefit-icon">🌿</div>
                        <h3>Eco-Friendly Practices</h3>
                        <p>All ${categoryName.toLowerCase()} businesses use sustainable methods and materials in their operations.</p>
                    </div>
                    <div class="benefit-card">
                        <div class="benefit-icon">🏆</div>
                        <h3>Certified Quality</h3>
                        <p>Verified for excellence in both service delivery and environmental responsibility.</p>
                    </div>
                    <div class="benefit-card">
                        <div class="benefit-icon">📍</div>
                        <h3>Local Impact</h3>
                        <p>Supporting ${currentCityName}'s economy while reducing carbon footprint through local sourcing.</p>
                    </div>
                    <div class="benefit-card">
                        <div class="benefit-icon">💡</div>
                        <h3>Innovation</h3>
                        <p>Leading-edge sustainable solutions and innovative approaches to ${categoryName.toLowerCase()}.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Category Statistics -->
        <section class="category-stats-section">
            <div class="container">
                <h2>${categoryName} in ${currentCityName} - Key Stats</h2>
                <div class="stats-grid-responsive">
                    <div class="stat-card">
                        <div class="stat-number">${categoryBusinesses.length}</div>
                        <div class="stat-label">Verified Businesses</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">4.8★</div>
                        <div class="stat-label">Average Rating</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">98%</div>
                        <div class="stat-label">Eco Certified</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">350+</div>
                        <div class="stat-label">Happy Customers</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Related Categories -->
        <section class="related-categories">
            <div class="container">
                <h2>Explore Other Categories in ${currentCityName}</h2>
                <div class="categories-grid-responsive" id="relatedCategories">
                    <!-- Related categories will be populated by JavaScript -->
                </div>
            </div>
        </section>

        <!-- How to Choose -->
        <section class="how-to-choose">
            <div class="container">
                <h2>How to Choose the Right ${categoryName} Business</h2>
                <div class="tips-grid">
                    <div class="tip-card">
                        <div class="tip-number">1</div>
                        <h3>Check Certifications</h3>
                        <p>Look for verified sustainability certifications and eco-friendly credentials.</p>
                    </div>
                    <div class="tip-card">
                        <div class="tip-number">2</div>
                        <h3>Read Reviews</h3>
                        <p>Customer feedback provides valuable insights into service quality and environmental practices.</p>
                    </div>
                    <div class="tip-card">
                        <div class="tip-number">3</div>
                        <h3>Compare Services</h3>
                        <p>Evaluate different businesses to find the best match for your specific needs.</p>
                    </div>
                    <div class="tip-card">
                        <div class="tip-number">4</div>
                        <h3>Contact Directly</h3>
                        <p>Speak with businesses directly to understand their sustainability commitments.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="cta-section-category">
            <div class="container">
                <div class="cta-content">
                    <h2>Ready to Go Green with ${categoryName}?</h2>
                    <p>Connect with ${currentCityName}'s top sustainable ${categoryName.toLowerCase()} businesses today</p>
                    <div class="cta-buttons">
                        <a href="${sanitizeCityName(currentCityName)}.html" class="btn-primary">View All ${currentCityName} Businesses</a>
                        <a href="contact-us.html" class="btn-secondary">Get Recommendations</a>
                    </div>
                </div>
            </div>
        </section>
    `;

    // Insert after the businesses section
    businessesSection.parentNode.insertBefore(responsiveSection, businessesSection.nextSibling);
    
    // Populate related categories
    populateRelatedCategories();
}

// Populate related categories
function populateRelatedCategories() {
    const relatedCategories = document.getElementById('relatedCategories');
    if (!relatedCategories) return;

    const allCategories = [
        { key: 'health-beauty', name: 'Health & Beauty', icon: '💄' },
        { key: 'products-retail', name: 'Products & Retail', icon: '🛍️' },
        { key: 'transport-travel', name: 'Transport & Travel', icon: '🚗' },
        { key: 'energy-utilities', name: 'Energy & Utilities', icon: '⚡' },
        { key: 'recycling-waste', name: 'Recycling & Waste', icon: '♻️' },
        { key: 'education-nonprofits', name: 'Education & Nonprofits', icon: '📚' }
    ];

    // Filter out current category and show others
    const otherCategories = allCategories.filter(cat => cat.key !== currentCategoryKey);

    relatedCategories.innerHTML = '';

    otherCategories.slice(0, 4).forEach(category => {
        const citySlug = sanitizeCityName(currentCityName);
        
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card-responsive';
        categoryCard.onclick = () => {
            window.location.href = `${citySlug}-${category.key}.html`;
        };

        categoryCard.innerHTML = `
            <div class="category-icon-responsive">${category.icon}</div>
            <h3>${category.name}</h3>
            <p>Explore ${category.name.toLowerCase()}</p>
            <div class="category-arrow">→</div>
        `;

        relatedCategories.appendChild(categoryCard);
    });
}

// Create business card for category page
function createCategoryBusinessCard(business) {
    const card = document.createElement('div');
    card.className = 'business-card';

    // Ensure we have required data
    const name = business.name || 'Business Name';
    const category = business.subcategory || business.category || 'Business';
    const rating = parseFloat(business.rating) || 4.5;
    const reviewCount = business.reviewCount || Math.floor(Math.random() * 50) + 10;
    const description = business.description || `Professional ${category.toLowerCase()} services with a focus on sustainability and environmental responsibility.`;
    const features = business.features || ['Eco-Friendly', 'Sustainable', 'Local Business'];
    const address = business.address || generateAddress(currentCityName);
    const phone = business.phone || generatePhoneNumber();
    const website = business.website || generateWebsite(currentCategoryKey, currentCityName);

    // Create business logo/icon
    const categoryIcons = {
        'health-beauty': 'fas fa-spa',
        'products-retail': 'fas fa-shopping-bag',
        'transport-travel': 'fas fa-car',
        'services-professional': 'fas fa-briefcase',
        'energy-utilities': 'fas fa-bolt',
        'recycling-waste': 'fas fa-recycle',
        'education-nonprofits': 'fas fa-graduation-cap'
    };

    const logoIcon = categoryIcons[currentCategoryKey] || 'fas fa-leaf';

    card.innerHTML = `
        <div class="business-card-header">
            <div class="business-logo">
                <i class="${logoIcon}"></i>
            </div>
            <div class="business-info">
                <h3>${name}</h3>
                <div class="business-category">${category}</div>
                <div class="business-rating">
                    <span class="stars">${'★'.repeat(Math.floor(rating))}${'☆'.repeat(5-Math.floor(rating))}</span>
                    <span class="rating-text">${rating.toFixed(1)} (${reviewCount} reviews)</span>
                </div>
            </div>
        </div>

        <div class="business-description">${description}</div>

        <div class="business-features">
            ${features.slice(0, 4).map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
        </div>

        <div class="business-contact">
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
            <a href="#contact" class="btn-primary" onclick="event.preventDefault(); contactBusiness('${name}', '${phone}', '${website}')">
                <i class="fas fa-envelope"></i> Get Quote
            </a>
            <a href="tel:${phone}" class="btn-secondary">
                <i class="fas fa-phone"></i> Call Now
            </a>
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

function contactBusiness(businessName, phone, website) {
    // Scroll to contact section if it exists, otherwise show alert
    const contactSection = document.getElementById('contact') || document.querySelector('.cta-section-category');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        // Show a temporary message
        const message = document.createElement('div');
        message.className = 'contact-message';
        message.innerHTML = `<p><strong>${businessName}</strong> - Call: ${phone} | Visit: ${website}</p>`;
        message.style.cssText = 'background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #4CAF50;';
        contactSection.appendChild(message);
        setTimeout(() => message.remove(), 5000);
    } else {
        alert(`Contact ${businessName} at ${phone} or visit ${website}`);
    }
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
window.CategoryPage = {
    initializeCategoryPage,
    loadCategoryBusinesses,
    displayCategoryBusinesses,
    categoryBusinesses: () => categoryBusinesses,
    currentCategory: () => currentCategoryKey,
    currentCity: () => currentCityName
};
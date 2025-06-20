
// Category Page JavaScript Handler

let categoryBusinesses = [];
let currentCategory = '';
let currentCity = 'London';

// Initialize category page
async function initializeCategoryPage(category, cityName = 'London') {
    currentCategory = category;
    currentCity = cityName || 'London';
    await loadCategoryBusinesses(category, currentCity);
    displayCategoryBusinesses();
}

// Load businesses for specific category and city
async function loadCategoryBusinesses(category, city = 'London') {
    try {
        console.log(`Loading businesses for category: ${category} in ${city}`);
        
        // Try to load from API first
        if (window.PlacesAPI && window.PlacesAPI.fetchBusinessesForCategory) {
            const apiBusinesses = await window.PlacesAPI.fetchBusinessesForCategory(category, 10, city);
            if (apiBusinesses && apiBusinesses.length > 0) {
                categoryBusinesses = apiBusinesses;
                console.log(`Loaded ${apiBusinesses.length} businesses from API for ${city}`);
                return;
            }
        }
        
        // Fallback to sample data
        categoryBusinesses = generateFallbackData(category, city);
        console.log(`Using fallback data for ${category} in ${city}`);
        
    } catch (error) {
        console.error('Error loading category businesses:', error);
        categoryBusinesses = generateFallbackData(category, city);
    }
}

// Generate fallback data for category and city
function generateFallbackData(category, city = 'London') {
    const categoryImages = {
        'home-living': [
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop', 
            'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1615874694520-474822394e73?w=400&h=300&fit=crop'
        ],
        'fashion-accessories': [
            'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1525562723836-dca67a71d5f1?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&h=300&fit=crop'
        ],
        'food-beverage': [
            'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        ],
        'health-beauty': [
            'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop'
        ],
        'products-retail': [
            'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1573855619003-97b4799dcd8b?w=400&h=300&fit=crop'
        ],
        'transport-travel': [
            'https://images.unsplash.com/photo-1558618666-fcd25856cd07?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1502780402662-acc01917fcce?w=400&h=300&fit=crop'
        ],
        'services-professional': [
            'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop'
        ],
        'energy-utilities': [
            'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=300&fit=crop'
        ],
        'recycling-waste': [
            'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1558618666-fcd25856cd07?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop'
        ],
        'education-nonprofits': [
            'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=400&h=300&fit=crop'
        ]
    };

    const categoryData = {
        'home-living': [
            {
                id: 1,
                name: "GreenSpace Furniture",
                category: "home-living",
                subcategory: "Sustainable Furniture",
                rating: 4.9,
                reviewCount: 156,
                description: "Premium sustainable furniture crafted from FSC-certified wood and recycled materials. Specializing in modern, minimalist designs that bring nature into your home.",
                address: `42 High Street, ${city}`,
                phone: "+44 20 7946 0123",
                website: "www.greenspace-furniture.co.uk",
                image: categoryImages['home-living'][0],
                features: ["FSC Certified", "Zero VOC", "Lifetime Warranty", "Local Craft"]
            },
            {
                id: 2,
                name: "OrganicRest Bedding",
                category: "home-living",
                subcategory: "Organic Bedding & Mattresses",
                rating: 4.8,
                reviewCount: 234,
                description: "Luxury organic bedding made from certified organic cotton and natural latex. Promoting healthy sleep with chemical-free, sustainably sourced materials.",
                address: "78 King's Road, London SW3 4UD",
                phone: "+44 20 7351 2567",
                website: "www.organicrest.london",
                image: categoryImages['home-living'][1],
                features: ["GOTS Certified", "Natural Latex", "Hypoallergenic", "Fair Trade"]
            }
        ],
        'fashion-accessories': [
            {
                id: 3,
                name: "EthicalThreads London",
                category: "fashion-accessories",
                subcategory: "Sustainable Clothing Brands",
                rating: 4.7,
                reviewCount: 189,
                description: "Contemporary sustainable fashion using organic and recycled materials. Committed to fair labor practices and transparent supply chains.",
                address: "156 Portobello Road, London W11 2DZ",
                phone: "+44 20 7792 3456",
                website: "www.ethicalthreads.london",
                image: categoryImages['fashion-accessories'][0],
                features: ["Organic Cotton", "Fair Trade", "Zero Waste", "Carbon Neutral"]
            }
        ],
        'food-beverage': [
            {
                id: 4,
                name: "PlantHub Market",
                category: "food-beverage",
                subcategory: "Organic Grocery Stores",
                rating: 4.8,
                reviewCount: 312,
                description: "London's premier organic grocery store featuring locally sourced produce, zero-waste packaging, and plant-based alternatives.",
                address: "89 Borough Market, London SE1 9AH",
                phone: "+44 20 7407 8901",
                website: "www.planthub.london",
                image: categoryImages['food-beverage'][0],
                features: ["Local Sourcing", "Zero Waste", "Organic Certified", "Bulk Options"]
            }
        ]
    };
    
    return categoryData[category] || [];
}

// Display businesses in grid
function displayCategoryBusinesses() {
    const grid = document.getElementById('categoryBusinessesGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (categoryBusinesses.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <h3>No businesses found</h3>
                <p>We're still loading businesses for this category. Please check back soon!</p>
            </div>
        `;
        return;
    }
    
    categoryBusinesses.forEach((business, index) => {
        const businessCard = createCategoryBusinessCard(business, index + 1);
        grid.appendChild(businessCard);
    });

    // Add SEO sections after listings
    addSEOSections();
}

// Add SEO-optimized sections below listings
function addSEOSections() {
    const categoryName = getCategoryDisplayName(currentCategory);
    const seoContainer = document.getElementById('seoSections');
    
    if (!seoContainer) return;

    seoContainer.innerHTML = `
        <!-- Why Choose Section -->
        <section class="seo-section why-choose">
            <div class="container">
                <h2>Why Choose ${categoryName} Businesses in London?</h2>
                <div class="why-choose-grid">
                    <div class="why-item">
                        <div class="why-icon">🌱</div>
                        <h3>Certified Sustainable</h3>
                        <p>All our featured ${categoryName.toLowerCase()} businesses meet strict environmental standards and sustainability certifications.</p>
                    </div>
                    <div class="why-item">
                        <div class="why-icon">⭐</div>
                        <h3>High Quality Standards</h3>
                        <p>Every business is carefully vetted for quality, customer service, and commitment to eco-friendly practices.</p>
                    </div>
                    <div class="why-item">
                        <div class="why-icon">🤝</div>
                        <h3>Community Focused</h3>
                        <p>Supporting local London businesses that contribute positively to their communities and environment.</p>
                    </div>
                    <div class="why-item">
                        <div class="why-icon">💚</div>
                        <h3>Ethical Practices</h3>
                        <p>Businesses committed to fair trade, ethical sourcing, and responsible business practices.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- How We Select Section -->
        <section class="seo-section selection-criteria">
            <div class="container">
                <h2>How We Select the Best ${categoryName} Businesses in London</h2>
                <div class="criteria-content">
                    <div class="criteria-text">
                        <p>Our rigorous selection process ensures only the most exceptional ${categoryName.toLowerCase()} businesses make it to our top 10 list. We evaluate each business based on multiple criteria including environmental impact, customer satisfaction, innovation in sustainability, and community contribution.</p>
                        
                        <h3>Our Evaluation Criteria:</h3>
                        <ul class="criteria-list">
                            <li><strong>Environmental Impact:</strong> Measurable positive environmental practices and certifications</li>
                            <li><strong>Customer Reviews:</strong> Consistent high ratings and positive customer feedback</li>
                            <li><strong>Sustainability Innovation:</strong> Leading practices in ${categoryName.toLowerCase()} sustainability</li>
                            <li><strong>Community Engagement:</strong> Active participation in local environmental initiatives</li>
                            <li><strong>Transparency:</strong> Open about sourcing, manufacturing, and business practices</li>
                            <li><strong>Quality Standards:</strong> Superior product/service quality and reliability</li>
                        </ul>
                    </div>
                    <div class="criteria-stats">
                        <div class="stat-box">
                            <span class="stat-number">500+</span>
                            <span class="stat-label">Businesses Reviewed</span>
                        </div>
                        <div class="stat-box">
                            <span class="stat-number">50+</span>
                            <span class="stat-label">Criteria Evaluated</span>
                        </div>
                        <div class="stat-box">
                            <span class="stat-number">95%</span>
                            <span class="stat-label">Customer Satisfaction</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- FAQ Section -->
        <section class="seo-section faq-section">
            <div class="container">
                <h2>Frequently Asked Questions: ${categoryName} in London</h2>
                <div class="faq-grid">
                    ${generateFAQs(currentCategory)}
                </div>
            </div>
        </section>

        <!-- Local Area Guide -->
        <section class="seo-section local-guide">
            <div class="container">
                <h2>London's Best Areas for ${categoryName}</h2>
                <div class="areas-grid">
                    ${generateLocalAreas(currentCategory)}
                </div>
            </div>
        </section>

        <!-- Benefits Section -->
        <section class="seo-section benefits">
            <div class="container">
                <h2>Benefits of Choosing Sustainable ${categoryName} in London</h2>
                <div class="benefits-content">
                    ${generateBenefits(currentCategory)}
                </div>
            </div>
        </section>

        <!-- Tips Section -->
        <section class="seo-section tips">
            <div class="container">
                <h2>Tips for Choosing the Right ${categoryName} Business</h2>
                <div class="tips-grid">
                    ${generateTips(currentCategory)}
                </div>
            </div>
        </section>

        <!-- Related Categories -->
        <section class="seo-section related-categories">
            <div class="container">
                <h2>Explore Related Sustainable Categories in London</h2>
                <div class="related-grid">
                    ${generateRelatedCategories(currentCategory)}
                </div>
            </div>
        </section>
    `;
}

// Create business card for category page (same structure as London page)
function createCategoryBusinessCard(business, rank) {
    const card = document.createElement('div');
    card.className = 'london-business-card';
    
    card.innerHTML = `
        <div class="business-card-header">
            <div class="business-rank">#${rank}</div>
        </div>
        
        <div class="business-content">
            <div class="business-main-info">
                <h3>${business.name}</h3>
                <p class="business-subcategory">${business.subcategory}</p>
                <div class="business-rating">
                    <div class="stars">
                        ${'★'.repeat(Math.floor(business.rating))}${'☆'.repeat(5 - Math.floor(business.rating))}
                    </div>
                    <span class="rating-text">${business.rating} (${business.reviewCount} reviews)</span>
                </div>
            </div>
            
            <div class="business-description">
                <p>${business.description}</p>
            </div>
            
            <div class="business-features">
                ${business.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
            </div>
            
            <div class="business-contact-info">
                <div class="contact-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${business.address}</span>
                </div>
            </div>
            
            <div class="business-actions">
                <a href="tel:${business.phone}" class="action-btn call-btn">
                    <i class="fas fa-phone"></i>
                    Call
                </a>
                <a href="https://${business.website}" target="_blank" class="action-btn website-btn">
                    <i class="fas fa-globe"></i>
                    Website
                </a>
                <button class="action-btn directions-btn" onclick="openDirections('${business.address}')">
                    <i class="fas fa-directions"></i>
                    Directions
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Open directions
function openDirections(address) {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/${encodedAddress}`, '_blank');
}

// Get category display name
function getCategoryDisplayName(category) {
    const categoryMap = {
        'home-living': 'Home & Living',
        'fashion-accessories': 'Fashion & Accessories',
        'food-beverage': 'Food & Beverage',
        'health-beauty': 'Health & Beauty',
        'products-retail': 'Products & Retail',
        'transport-travel': 'Transport & Travel',
        'services-professional': 'Services & Professional',
        'energy-utilities': 'Energy & Utilities',
        'recycling-waste': 'Recycling & Waste Management',
        'education-nonprofits': 'Education & Nonprofits'
    };
    return categoryMap[category] || 'Sustainable';
}

// Generate FAQs for category
function generateFAQs(category) {
    const faqs = {
        'home-living': [
            {
                question: "What makes furniture sustainable?",
                answer: "Sustainable furniture is made from responsibly sourced materials like FSC-certified wood, recycled materials, or rapidly renewable resources. It's built to last, uses non-toxic finishes, and is produced with minimal environmental impact."
            },
            {
                question: "Are organic mattresses worth the investment?",
                answer: "Yes, organic mattresses offer better air quality, are free from harmful chemicals, and often last longer than conventional mattresses. They're particularly beneficial for those with allergies or chemical sensitivities."
            },
            {
                question: "How do I know if home products are truly eco-friendly?",
                answer: "Look for certifications like GREENGUARD, Energy Star, or EPEAT. Check for recyclable packaging, non-toxic ingredients, and transparency in manufacturing processes."
            },
            {
                question: "What's the difference between biodegradable and compostable cleaning products?",
                answer: "Biodegradable products break down naturally over time, while compostable products break down into nutrient-rich compost under specific conditions. Compostable is generally more environmentally friendly."
            }
        ],
        'fashion-accessories': [
            {
                question: "What defines sustainable fashion?",
                answer: "Sustainable fashion involves clothing made from eco-friendly materials, produced under fair labor conditions, designed for durability, and created with minimal environmental impact throughout the supply chain."
            },
            {
                question: "How long should sustainable clothing last?",
                answer: "Quality sustainable clothing should last significantly longer than fast fashion - typically 5-10 years or more with proper care, making it more cost-effective long-term."
            },
            {
                question: "What materials should I look for in sustainable fashion?",
                answer: "Look for organic cotton, linen, hemp, Tencel, recycled materials, and innovative eco-fabrics. Avoid synthetic materials that shed microplastics."
            },
            {
                question: "Is vegan leather really better for the environment?",
                answer: "It depends on the material. Plant-based leathers from cork, mushrooms, or pineapple leaves are generally better than both animal leather and plastic-based vegan alternatives."
            }
        ],
        'food-beverage': [
            {
                question: "What makes a restaurant truly sustainable?",
                answer: "Sustainable restaurants source locally, minimize food waste, use renewable energy, compost organic waste, choose sustainable seafood, and often grow their own ingredients."
            },
            {
                question: "Are organic foods always better for the environment?",
                answer: "Generally yes, as organic farming avoids synthetic pesticides and fertilizers, but local and seasonal non-organic can sometimes have a lower carbon footprint than shipped organic produce."
            },
            {
                question: "What should I look for in sustainable food packaging?",
                answer: "Look for compostable, recyclable, or reusable packaging. Avoid single-use plastics and look for businesses that encourage bringing your own containers."
            },
            {
                question: "How can I identify zero-waste cafes?",
                answer: "Zero-waste cafes typically use reusable or compostable serveware, offer discounts for bringing your own cup, compost food waste, and minimize packaging."
            }
        ]
    };

    const defaultFAQs = [
        {
            question: "How do you verify businesses are sustainable?",
            answer: "We verify sustainability through certifications, site visits, customer reviews, and assessment of their environmental practices and policies."
        },
        {
            question: "Do sustainable businesses cost more?",
            answer: "While initial costs may be higher, sustainable businesses often provide better value through quality, durability, and long-term benefits to health and environment."
        }
    ];

    const categoryFAQs = faqs[category] || defaultFAQs;
    
    return categoryFAQs.map(faq => `
        <div class="faq-item">
            <button class="faq-question" onclick="toggleFAQ(this)">
                <span>${faq.question}</span>
                <i class="fas fa-chevron-down"></i>
            </button>
            <div class="faq-answer">
                <p>${faq.answer}</p>
            </div>
        </div>
    `).join('');
}

// Generate local areas information
function generateLocalAreas(category) {
    return `
        <div class="area-card">
            <h3>Shoreditch & East London</h3>
            <p>Known for innovative sustainable businesses and eco-conscious startups. High concentration of ethical brands and zero-waste stores.</p>
        </div>
        <div class="area-card">
            <h3>Camden & North London</h3>
            <p>Home to many established sustainable businesses with strong community focus and environmental initiatives.</p>
        </div>
        <div class="area-card">
            <h3>South London</h3>
            <p>Growing hub for local sustainable businesses, farmers markets, and community-supported enterprises.</p>
        </div>
        <div class="area-card">
            <h3>West London</h3>
            <p>Features premium sustainable brands and eco-luxury businesses focused on high-quality, environmentally conscious products.</p>
        </div>
    `;
}

// Generate benefits content
function generateBenefits(category) {
    const benefits = {
        'home-living': "Healthier indoor air quality, reduced exposure to toxic chemicals, support for sustainable forestry, and longer-lasting products that save money over time.",
        'fashion-accessories': "Higher quality garments that last longer, support for fair labor practices, reduced environmental impact, and unique, ethically-made pieces.",
        'food-beverage': "Better nutrition, support for local farmers, reduced environmental impact, and often superior taste and freshness."
    };

    const defaultBenefits = "Reduced environmental impact, support for ethical business practices, often higher quality products and services, and contribution to a more sustainable future.";

    return `
        <p>${benefits[category] || defaultBenefits}</p>
        <ul class="benefits-list">
            <li>Environmental protection and reduced carbon footprint</li>
            <li>Support for local economy and sustainable jobs</li>
            <li>Better health outcomes for you and your family</li>
            <li>Contribution to positive social impact</li>
            <li>Often superior quality and durability</li>
            <li>Alignment with personal values and ethics</li>
        </ul>
    `;
}

// Generate tips for choosing businesses
function generateTips(category) {
    return `
        <div class="tip-card">
            <h3>Research Certifications</h3>
            <p>Look for relevant eco-certifications and sustainability standards specific to the industry.</p>
        </div>
        <div class="tip-card">
            <h3>Read Customer Reviews</h3>
            <p>Check multiple review sources to understand real customer experiences with sustainability claims.</p>
        </div>
        <div class="tip-card">
            <h3>Ask About Practices</h3>
            <p>Don't hesitate to ask businesses about their sustainability practices and environmental policies.</p>
        </div>
        <div class="tip-card">
            <h3>Consider Lifecycle</h3>
            <p>Think about the full lifecycle of products or services, from production to disposal or end-of-life.</p>
        </div>
        <div class="tip-card">
            <h3>Support Local</h3>
            <p>Local businesses often have lower transportation impacts and stronger community connections.</p>
        </div>
        <div class="tip-card">
            <h3>Check Transparency</h3>
            <p>Trustworthy sustainable businesses are transparent about their practices and supply chains.</p>
        </div>
    `;
}

// Generate related categories
function generateRelatedCategories(category) {
    const allCategories = ['home-living', 'fashion-accessories', 'food-beverage', 'health-beauty', 'products-retail', 'transport-travel'];
    const related = allCategories.filter(cat => cat !== category).slice(0, 4);
    
    return related.map(cat => {
        const displayName = getCategoryDisplayName(cat);
        return `
            <a href="london-${cat}.html" class="related-card">
                <h3>${displayName}</h3>
                <p>Discover sustainable ${displayName.toLowerCase()} businesses in London</p>
            </a>
        `;
    }).join('');
}

// Toggle FAQ visibility
function toggleFAQ(button) {
    const faqItem = button.parentNode;
    const answer = faqItem.querySelector('.faq-answer');
    const icon = button.querySelector('i');
    
    faqItem.classList.toggle('active');
    
    if (faqItem.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        icon.style.transform = 'rotate(180deg)';
    } else {
        answer.style.maxHeight = '0';
        icon.style.transform = 'rotate(0deg)';
    }
}

// Export functions
window.CategoryPage = {
    initializeCategoryPage,
    loadCategoryBusinesses,
    displayCategoryBusinesses,
    toggleFAQ
};

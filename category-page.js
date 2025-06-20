
// Category Page JavaScript Handler

let categoryBusinesses = [];
let currentCategory = '';

// Initialize category page
async function initializeCategoryPage(category) {
    currentCategory = category;
    await loadCategoryBusinesses(category);
    displayCategoryBusinesses();
}

// Load businesses for specific category
async function loadCategoryBusinesses(category) {
    try {
        console.log(`Loading businesses for category: ${category}`);
        
        // Try to load from API first
        if (window.PlacesAPI && window.PlacesAPI.fetchBusinessesForCategory) {
            const apiBusinesses = await window.PlacesAPI.fetchBusinessesForCategory(category, 10);
            if (apiBusinesses && apiBusinesses.length > 0) {
                categoryBusinesses = apiBusinesses;
                console.log(`Loaded ${apiBusinesses.length} businesses from API`);
                return;
            }
        }
        
        // Fallback to sample data
        categoryBusinesses = generateFallbackData(category);
        console.log(`Using fallback data for ${category}`);
        
    } catch (error) {
        console.error('Error loading category businesses:', error);
        categoryBusinesses = generateFallbackData(category);
    }
}

// Generate fallback data for category
function generateFallbackData(category) {
    const categoryImages = {
        'home-living': [
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&h=300&fit=crop&crop=center'
        ],
        'fashion-accessories': [
            'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=300&fit=crop&crop=center'
        ],
        'food-beverage': [
            'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&crop=center'
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
                address: "42 Shoreditch High Street, London E1 6PN",
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
}

// Create business card for category page (same structure as London page)
function createCategoryBusinessCard(business, rank) {
    const card = document.createElement('div');
    card.className = 'london-business-card';
    
    card.innerHTML = `
        <div class="business-rank">#${rank}</div>
        <div class="business-card-header">
            <div class="business-image-container">
                <img src="${business.image}" alt="${business.name}" class="business-main-image" 
                     onerror="this.src='https://images.unsplash.com/photo-1560472355-109703aa3edc?w=400&h=300&fit=crop&crop=center'">
            </div>
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
                Call Now
            </a>
            <a href="https://${business.website}" target="_blank" class="action-btn website-btn">
                <i class="fas fa-globe"></i>
                Visit Website
            </a>
            <button class="action-btn directions-btn" onclick="openDirections('${business.address}')">
                <i class="fas fa-directions"></i>
                Directions
            </button>
        </div>
    `;
    
    return card;
}

// Open directions
function openDirections(address) {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/${encodedAddress}`, '_blank');
}

// Export functions
window.CategoryPage = {
    initializeCategoryPage,
    loadCategoryBusinesses,
    displayCategoryBusinesses
};

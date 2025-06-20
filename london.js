
// London Page JavaScript

let currentFilter = '';
let currentSubcategory = '';

// DOM Elements
const categorySelect = document.getElementById('categorySelect');
const subcategorySelect = document.getElementById('subcategorySelect');
const subcategoryGroup = document.getElementById('subcategoryGroup');
const businessesGrid = document.getElementById('londonBusinessesGrid');
const businessesTitle = document.getElementById('businessesTitle');
const resultsCount = document.getElementById('resultsCount');



// Add refresh button functionality
function addRefreshButton() {
    const refreshButton = document.createElement('button');
    refreshButton.className = 'refresh-api-btn';
    refreshButton.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh Real Data';
    refreshButton.onclick = async () => {
        refreshButton.disabled = true;
        refreshButton.innerHTML = '<i class="fas fa-spinner"></i> Loading...';
        
        try {
            await window.LondonData.loadBusinessesFromAPI();
        } finally {
            refreshButton.disabled = false;
            refreshButton.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh Real Data';
        }
    };
    
    const heroContent = document.querySelector('.city-hero-content');
    if (heroContent) {
        heroContent.appendChild(refreshButton);
    }
}

// Initialize London page
async function initializeLondonPage() {
    populateBusinesses();
    setupEventListeners();
    
    // Load real data from Google Places API
    if (window.PlacesAPI && window.LondonData.loadBusinessesFromAPI) {
        await window.LondonData.loadBusinessesFromAPI();
    }
}

// Setup event listeners
function setupEventListeners() {
    categorySelect.addEventListener('change', handleCategoryChange);
    subcategorySelect.addEventListener('change', handleSubcategoryChange);
}

// Handle category change
function handleCategoryChange() {
    const selectedCategory = categorySelect.value;
    currentFilter = selectedCategory;
    
    if (selectedCategory) {
        populateSubcategories(selectedCategory);
        subcategoryGroup.style.display = 'block';
    } else {
        subcategoryGroup.style.display = 'none';
        currentSubcategory = '';
    }
    
    filterBusinesses();
}

// Handle subcategory change
function handleSubcategoryChange() {
    currentSubcategory = subcategorySelect.value;
    filterBusinesses();
}

// Populate subcategories dropdown
function populateSubcategories(categoryKey) {
    const category = window.EcoComponents.businessCategories[categoryKey];
    subcategorySelect.innerHTML = '<option value="">All Subcategories</option>';
    
    if (category && category.subcategories) {
        category.subcategories.forEach(subcategory => {
            const option = document.createElement('option');
            option.value = subcategory;
            option.textContent = subcategory;
            subcategorySelect.appendChild(option);
        });
    }
}

// Filter businesses based on selected filters
function filterBusinesses() {
    let filteredBusinesses = window.LondonData.londonBusinesses;
    
    if (currentFilter) {
        filteredBusinesses = filteredBusinesses.filter(business => 
            business.category === currentFilter
        );
    }
    
    if (currentSubcategory) {
        filteredBusinesses = filteredBusinesses.filter(business => 
            business.subcategory === currentSubcategory
        );
    }
    
    displayBusinesses(filteredBusinesses);
    updateTitle(filteredBusinesses.length);
}

// Update page title and results count
function updateTitle(count) {
    let title = "All Top Businesses in London";
    
    if (currentFilter) {
        const category = window.EcoComponents.businessCategories[currentFilter];
        title = `${category.name} Businesses in London`;
        
        if (currentSubcategory) {
            title = `${currentSubcategory} in London`;
        }
    }
    
    businessesTitle.textContent = title;
    resultsCount.textContent = `Showing ${count} business${count !== 1 ? 'es' : ''}`;
}

// Populate all businesses
function populateBusinesses() {
    displayBusinesses(window.LondonData.londonBusinesses);
    updateTitle(window.LondonData.londonBusinesses.length);
}

// Display businesses in grid
function displayBusinesses(businesses) {
    if (!businessesGrid) return;
    
    businessesGrid.innerHTML = '';
    
    if (businesses.length === 0) {
        businessesGrid.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <h3>No businesses found</h3>
                <p>Try adjusting your filter criteria to see more results.</p>
            </div>
        `;
        return;
    }
    
    businesses.forEach(business => {
        const businessCard = createBusinessCard(business);
        businessesGrid.appendChild(businessCard);
    });
}

// Create business card element
function createBusinessCard(business) {
    const card = document.createElement('div');
    card.className = 'london-business-card';
    
    card.innerHTML = `
        <div class="business-card-header">
            <div class="business-logo-large">${business.image}</div>
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
                Call
            </a>
            <a href="https://${business.website}" target="_blank" class="action-btn website-btn">
                <i class="fas fa-globe"></i>
                Website
            </a>
            <button class="action-btn star-btn" onclick="toggleFavorite(${business.id})">
                <i class="fas fa-star"></i>
                Save
            </button>
        </div>
    `;
    
    return card;
}

// Toggle favorite business
function toggleFavorite(businessId) {
    const business = window.LondonData.londonBusinesses.find(b => b.id === businessId);
    if (business) {
        alert(`${business.name} has been saved to your favorites!`);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeLondonPage();
    addRefreshButton();
});

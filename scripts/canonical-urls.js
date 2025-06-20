
// Canonical URL Management System
// Prevents duplicate content issues by implementing proper canonical tags

const CANONICAL_STRATEGIES = {
    // City pages - canonical to main city page
    cityPages: {
        pattern: /^([a-z-]+)\.html$/,
        getCanonical: (match) => `https://ecosustainable.co.uk/${match[1]}.html`
    },
    
    // Category pages - canonical to category overview
    categoryPages: {
        pattern: /^([a-z-]+)-([a-z-]+)\.html$/,
        getCanonical: (match) => {
            const [, city, category] = match;
            // For category pages, canonical points to the main category page
            return `https://ecosustainable.co.uk/${category}-category.html`;
        }
    },
    
    // Main category overview pages
    categoryOverview: {
        pattern: /^([a-z-]+)-category\.html$/,
        getCanonical: (match) => `https://ecosustainable.co.uk/${match[1]}-category.html`
    }
};

// Function to determine canonical URL for current page
function getCanonicalUrl() {
    const currentPath = window.location.pathname.split('/').pop();
    
    // Check each strategy
    for (const [strategyName, strategy] of Object.entries(CANONICAL_STRATEGIES)) {
        const match = currentPath.match(strategy.pattern);
        if (match) {
            return strategy.getCanonical(match);
        }
    }
    
    // Default to current URL if no strategy matches
    return window.location.href;
}

// Function to set canonical URL
function setCanonicalUrl() {
    const canonicalUrl = getCanonicalUrl();
    
    // Remove existing canonical tag if present
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
        existingCanonical.remove();
    }
    
    // Add new canonical tag
    const canonicalTag = document.createElement('link');
    canonicalTag.rel = 'canonical';
    canonicalTag.href = canonicalUrl;
    document.head.appendChild(canonicalTag);
}

// Function to add structured data for better SEO
function addStructuredData() {
    const currentPath = window.location.pathname.split('/').pop();
    
    // Check if it's a category page
    const categoryMatch = currentPath.match(/^([a-z-]+)-([a-z-]+)\.html$/);
    if (categoryMatch) {
        const [, city, category] = categoryMatch;
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": `${getCategoryDisplayName(category)} in ${city.charAt(0).toUpperCase() + city.slice(1)}`,
            "description": `Find sustainable ${getCategoryDisplayName(category).toLowerCase()} businesses in ${city.charAt(0).toUpperCase() + city.slice(1)}`,
            "url": window.location.href,
            "isPartOf": {
                "@type": "WebSite",
                "name": "EcoSustainable.co.uk",
                "url": "https://ecosustainable.co.uk"
            },
            "mainEntity": {
                "@type": "ItemList",
                "name": `${getCategoryDisplayName(category)} Businesses`,
                "description": `Directory of eco-friendly ${getCategoryDisplayName(category).toLowerCase()} businesses`
            }
        };
        
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
    }
}

// Helper function to get category display name
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

// Initialize canonical URL system
document.addEventListener('DOMContentLoaded', function() {
    setCanonicalUrl();
    addStructuredData();
});

// Export functions for global use
window.CanonicalSystem = {
    setCanonicalUrl,
    getCanonicalUrl,
    addStructuredData
};

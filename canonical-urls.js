
// Canonical URL Management for EcoSustainable.co.uk
// Ensures proper URL structure for SEO optimization

const CANONICAL_STRATEGIES = {
    homePage: () => 'https://ecosustainable.co.uk/',
    cityPage: (city) => `https://ecosustainable.co.uk/${city}`,
    categoryPage: (city, category) => `https://ecosustainable.co.uk/${city}-${category}`,
    aboutPage: () => 'https://ecosustainable.co.uk/about',
    categoriesPage: () => 'https://ecosustainable.co.uk/categories',
    citiesPage: () => 'https://ecosustainable.co.uk/cities'
};

class CanonicalManager {
    constructor() {
        this.baseUrl = 'https://ecosustainable.co.uk';
        this.init();
    }

    init() {
        this.setCanonicalUrl();
        this.addAlternateLanguages();
        this.optimizeOpenGraph();
        this.enhanceTwitterCards();
        this.addStructuredData();
    }

    setCanonicalUrl() {
        const currentPath = window.location.pathname;
        let canonicalUrl = this.baseUrl;

        // Remove .html extension from canonical URLs
        if (currentPath.includes('.html')) {
            canonicalUrl = this.baseUrl + currentPath.replace('.html', '');
        } else {
            canonicalUrl = this.baseUrl + currentPath;
        }

        // Ensure canonical URL doesn't end with slash (except root)
        if (canonicalUrl !== this.baseUrl && canonicalUrl.endsWith('/')) {
            canonicalUrl = canonicalUrl.slice(0, -1);
        }

        this.updateCanonicalTag(canonicalUrl);
        this.updateOpenGraphUrl(canonicalUrl);
        this.updateTwitterUrl(canonicalUrl);
    }

    updateCanonicalTag(url) {
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = 'canonical';
            document.head.appendChild(canonical);
        }
        canonical.href = url;
    }

    updateOpenGraphUrl(url) {
        let ogUrl = document.querySelector('meta[property="og:url"]');
        if (!ogUrl) {
            ogUrl = document.createElement('meta');
            ogUrl.setAttribute('property', 'og:url');
            document.head.appendChild(ogUrl);
        }
        ogUrl.content = url;
    }

    updateTwitterUrl(url) {
        let twitterUrl = document.querySelector('meta[property="twitter:url"]');
        if (!twitterUrl) {
            twitterUrl = document.createElement('meta');
            twitterUrl.setAttribute('property', 'twitter:url');
            document.head.appendChild(twitterUrl);
        }
        twitterUrl.content = url;
    }

    addAlternateLanguages() {
        // Add hreflang for UK English
        let hreflang = document.querySelector('link[hreflang="en-GB"]');
        if (!hreflang) {
            hreflang = document.createElement('link');
            hreflang.rel = 'alternate';
            hreflang.hreflang = 'en-GB';
            hreflang.href = window.location.href;
            document.head.appendChild(hreflang);
        }
    }

    optimizeOpenGraph() {
        const path = window.location.pathname;
        
        // Enhance Open Graph tags based on page type
        if (path.includes('-')) {
            this.enhanceOGForCategoryPage();
        } else if (path !== '/' && path !== '/index.html') {
            this.enhanceOGForCityPage();
        }
    }

    enhanceOGForCategoryPage() {
        const path = window.location.pathname;
        const match = path.match(/\/([^-]+)-([^.]+)/);
        if (match) {
            const [, city, category] = match;
            const categoryName = this.formatCategoryName(category);
            
            this.updateOGTag('og:type', 'website');
            this.updateOGTag('og:locale', 'en_GB');
            this.updateOGTag('og:site_name', 'EcoSustainable.co.uk');
        }
    }

    enhanceOGForCityPage() {
        const path = window.location.pathname;
        const city = path.replace('/', '').replace('.html', '');
        
        this.updateOGTag('og:type', 'website');
        this.updateOGTag('og:locale', 'en_GB');
        this.updateOGTag('og:site_name', 'EcoSustainable.co.uk');
    }

    updateOGTag(property, content) {
        let tag = document.querySelector(`meta[property="${property}"]`);
        if (!tag) {
            tag = document.createElement('meta');
            tag.setAttribute('property', property);
            document.head.appendChild(tag);
        }
        tag.content = content;
    }

    enhanceTwitterCards() {
        this.updateTwitterTag('twitter:card', 'summary_large_image');
        this.updateTwitterTag('twitter:site', '@EcoSustainableUK');
        this.updateTwitterTag('twitter:creator', '@EcoSustainableUK');
    }

    updateTwitterTag(name, content) {
        let tag = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
        if (!tag) {
            tag = document.createElement('meta');
            tag.setAttribute('property', name);
            document.head.appendChild(tag);
        }
        tag.content = content;
    }

    addStructuredData() {
        const path = window.location.pathname;
        
        if (path === '/' || path === '/index.html') {
            this.addHomepageStructuredData();
        } else if (path.includes('-')) {
            this.addCategoryPageStructuredData();
        } else {
            this.addCityPageStructuredData();
        }
    }

    addHomepageStructuredData() {
        const structuredData = {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "Organization",
                    "@id": "https://ecosustainable.co.uk/#organization",
                    "name": "EcoSustainable.co.uk",
                    "url": "https://ecosustainable.co.uk",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://ecosustainable.co.uk/images/logo.png"
                    },
                    "sameAs": [
                        "https://twitter.com/EcoSustainableUK",
                        "https://facebook.com/EcoSustainableUK"
                    ]
                },
                {
                    "@type": "WebSite",
                    "@id": "https://ecosustainable.co.uk/#website",
                    "url": "https://ecosustainable.co.uk",
                    "name": "EcoSustainable.co.uk",
                    "description": "UK's premier directory of eco-friendly and sustainable businesses",
                    "publisher": {
                        "@id": "https://ecosustainable.co.uk/#organization"
                    },
                    "potentialAction": {
                        "@type": "SearchAction",
                        "target": {
                            "@type": "EntryPoint",
                            "urlTemplate": "https://ecosustainable.co.uk/search?q={search_term_string}"
                        },
                        "query-input": "required name=search_term_string"
                    }
                }
            ]
        };
        
        this.insertStructuredData('homepage-schema', structuredData);
    }

    addCategoryPageStructuredData() {
        const path = window.location.pathname;
        const match = path.match(/\/([^-]+)-([^.]+)/);
        if (match) {
            const [, city, category] = match;
            const structuredData = {
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                "name": `${this.formatCategoryName(category)} Businesses in ${this.formatCityName(city)}`,
                "description": `Discover sustainable ${category.replace('-', ' & ')} businesses in ${this.formatCityName(city)}`,
                "url": `https://ecosustainable.co.uk/${city}-${category}`,
                "isPartOf": {
                    "@type": "WebSite",
                    "name": "EcoSustainable.co.uk",
                    "url": "https://ecosustainable.co.uk"
                },
                "about": {
                    "@type": "Place",
                    "name": this.formatCityName(city),
                    "addressLocality": this.formatCityName(city),
                    "addressCountry": "UK"
                }
            };
            
            this.insertStructuredData('category-page-schema', structuredData);
        }
    }

    addCityPageStructuredData() {
        const path = window.location.pathname;
        const city = path.replace('/', '').replace('.html', '');
        
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": `Eco-Friendly Businesses in ${this.formatCityName(city)}`,
            "description": `Directory of sustainable and eco-friendly businesses in ${this.formatCityName(city)}`,
            "url": `https://ecosustainable.co.uk/${city}`,
            "isPartOf": {
                "@type": "WebSite",
                "name": "EcoSustainable.co.uk",
                "url": "https://ecosustainable.co.uk"
            },
            "about": {
                "@type": "Place",
                "name": this.formatCityName(city),
                "addressLocality": this.formatCityName(city),
                "addressCountry": "UK"
            }
        };
        
        this.insertStructuredData('city-page-schema', structuredData);
    }

    insertStructuredData(id, data) {
        let script = document.getElementById(id);
        if (!script) {
            script = document.createElement('script');
            script.id = id;
            script.type = 'application/ld+json';
            document.head.appendChild(script);
        }
        script.textContent = JSON.stringify(data);
    }

    formatCityName(city) {
        return city.split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    formatCategoryName(category) {
        const categoryNames = {
            'health-beauty': 'Health & Beauty',
            'energy-utilities': 'Energy & Utilities',
            'education-nonprofits': 'Education & Nonprofits',
            'transport-travel': 'Transport & Travel',
            'services-professional': 'Services & Professional',
            'recycling-waste': 'Recycling & Waste',
            'products-retail': 'Products & Retail'
        };
        return categoryNames[category] || category.replace('-', ' & ');
    }
}

// Initialize canonical management when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new CanonicalManager();
});


// SEO Enhancement Script for EcoSustainable.co.uk
// Handles dynamic SEO improvements and page optimization

class SEOEnhancer {
    constructor() {
        this.init();
    }

    init() {
        this.addStructuredData();
        this.optimizeImages();
        this.handleInternalLinks();
        this.addBreadcrumbs();
        this.trackPagePerformance();
    }

    // Add dynamic structured data based on page content
    addStructuredData() {
        const path = window.location.pathname;
        
        if (path.includes('-') && path.includes('.html')) {
            // Category page
            const [city, category] = this.extractCityCategory(path);
            if (city && category) {
                this.addCategoryPageStructuredData(city, category);
            }
        } else if (path.endsWith('.html') && path !== '/index.html') {
            // City page
            const city = path.replace('.html', '').replace('/', '');
            this.addCityPageStructuredData(city);
        }
    }

    extractCityCategory(path) {
        const match = path.match(/\/([^-]+)-([^.]+)\.html/);
        return match ? [match[1], match[2]] : [null, null];
    }

    addCategoryPageStructuredData(city, category) {
        const categoryNames = {
            'health-beauty': 'Health & Beauty',
            'energy-utilities': 'Energy & Utilities',
            'education-nonprofits': 'Education & Nonprofits',
            'transport-travel': 'Transport & Travel',
            'services-professional': 'Services & Professional',
            'recycling-waste': 'Recycling & Waste',
            'products-retail': 'Products & Retail'
        };

        const structuredData = {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": `${categoryNames[category] || category} in ${city}`,
            "description": `Directory of sustainable ${categoryNames[category] || category} businesses in ${city}`,
            "url": window.location.href,
            "mainEntity": {
                "@type": "ItemList",
                "name": `${categoryNames[category] || category} Businesses`,
                "description": `Eco-friendly ${categoryNames[category] || category} services in ${city}`
            },
            "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://ecosustainable.co.uk/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Cities",
                        "item": "https://ecosustainable.co.uk/cities.html"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": city,
                        "item": `https://ecosustainable.co.uk/${city}.html`
                    },
                    {
                        "@type": "ListItem",
                        "position": 4,
                        "name": categoryNames[category] || category,
                        "item": window.location.href
                    }
                ]
            }
        };

        this.insertStructuredData(structuredData);
    }

    addCityPageStructuredData(city) {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": `Eco-Friendly Businesses in ${city}`,
            "description": `Directory of sustainable and eco-friendly businesses in ${city}, UK`,
            "url": window.location.href,
            "mainEntity": {
                "@type": "ItemList",
                "name": `${city} Business Directory`,
                "description": `Comprehensive list of eco-friendly businesses in ${city}`
            },
            "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://ecosustainable.co.uk/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Cities",
                        "item": "https://ecosustainable.co.uk/cities.html"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": city,
                        "item": window.location.href
                    }
                ]
            }
        };

        this.insertStructuredData(structuredData);
    }

    insertStructuredData(data) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
    }

    // Optimize images for SEO
    optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Add loading="lazy" for performance
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            
            // Ensure alt text exists
            if (!img.hasAttribute('alt') || img.alt === '') {
                const altText = this.generateAltText(img);
                img.setAttribute('alt', altText);
            }
        });
    }

    generateAltText(img) {
        const src = img.src || '';
        const className = img.className || '';
        
        if (src.includes('logo')) return 'EcoSustainable.co.uk Logo';
        if (className.includes('business')) return 'Eco-friendly business image';
        if (className.includes('city')) return 'City view image';
        
        return 'EcoSustainable business directory image';
    }

    // Optimize internal links
    handleInternalLinks() {
        const links = document.querySelectorAll('a[href]');
        links.forEach(link => {
            const href = link.getAttribute('href');
            
            // Add rel attributes for external links
            if (href.startsWith('http') && !href.includes('ecosustainable.co.uk')) {
                link.setAttribute('rel', 'noopener noreferrer');
                link.setAttribute('target', '_blank');
            }
            
            // Ensure internal links have proper title attributes
            if (href.startsWith('/') || href.includes('ecosustainable.co.uk')) {
                if (!link.hasAttribute('title') && link.textContent.trim()) {
                    link.setAttribute('title', link.textContent.trim());
                }
            }
        });
    }

    // Add breadcrumbs to pages
    addBreadcrumbs() {
        const path = window.location.pathname;
        const breadcrumbContainer = document.querySelector('.breadcrumb-container');
        
        if (!breadcrumbContainer) {
            const breadcrumbs = this.generateBreadcrumbs(path);
            if (breadcrumbs.length > 1) {
                this.insertBreadcrumbs(breadcrumbs);
            }
        }
    }

    generateBreadcrumbs(path) {
        const breadcrumbs = [{ name: 'Home', url: '/' }];
        
        if (path.includes('-') && path.includes('.html')) {
            // Category page
            const [city, category] = this.extractCityCategory(path);
            if (city && category) {
                breadcrumbs.push({ name: 'Cities', url: '/cities.html' });
                breadcrumbs.push({ name: city, url: `/${city}.html` });
                breadcrumbs.push({ name: this.formatCategoryName(category), url: path });
            }
        } else if (path.endsWith('.html') && path !== '/index.html') {
            // City page
            const city = path.replace('.html', '').replace('/', '');
            breadcrumbs.push({ name: 'Cities', url: '/cities.html' });
            breadcrumbs.push({ name: city, url: path });
        }
        
        return breadcrumbs;
    }

    formatCategoryName(category) {
        const names = {
            'health-beauty': 'Health & Beauty',
            'energy-utilities': 'Energy & Utilities',
            'education-nonprofits': 'Education & Nonprofits',
            'transport-travel': 'Transport & Travel',
            'services-professional': 'Services & Professional',
            'recycling-waste': 'Recycling & Waste',
            'products-retail': 'Products & Retail'
        };
        return names[category] || category;
    }

    insertBreadcrumbs(breadcrumbs) {
        const breadcrumbHTML = `
            <nav class="breadcrumb-nav" aria-label="Breadcrumb">
                <ol class="breadcrumb">
                    ${breadcrumbs.map((crumb, index) => `
                        <li class="breadcrumb-item ${index === breadcrumbs.length - 1 ? 'active' : ''}">
                            ${index === breadcrumbs.length - 1 
                                ? `<span aria-current="page">${crumb.name}</span>`
                                : `<a href="${crumb.url}">${crumb.name}</a>`
                            }
                        </li>
                    `).join('')}
                </ol>
            </nav>
        `;
        
        const header = document.querySelector('header') || document.querySelector('.hero');
        if (header) {
            header.insertAdjacentHTML('afterend', breadcrumbHTML);
        }
    }

    // Track page performance for SEO insights
    trackPagePerformance() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const navigation = performance.getEntriesByType('navigation')[0];
                    const paint = performance.getEntriesByType('paint');
                    
                    const metrics = {
                        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
                        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                        firstPaint: paint.find(entry => entry.name === 'first-paint')?.startTime,
                        firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime
                    };
                    
                    // Log performance metrics (can be sent to analytics)
                    console.log('Page Performance Metrics:', metrics);
                }, 1000);
            });
        }
    }
}

// Initialize SEO enhancements when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SEOEnhancer();
});

// Export for global use
window.SEOEnhancer = SEOEnhancer;


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
        this.addMetaTags();
        this.optimizeUrls();
    }

    // Add comprehensive meta tags for all pages
    addMetaTags() {
        const path = window.location.pathname;
        const pageName = this.getPageName(path);
        
        // Update title if needed
        if (!document.title.includes('EcoSustainable.co.uk')) {
            document.title = `${pageName} | EcoSustainable.co.uk - UK's Premier Eco-Friendly Business Directory`;
        }

        // Add missing meta tags
        this.addMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large');
        this.addMetaTag('language', 'English');
        this.addMetaTag('author', 'EcoSustainable.co.uk');
        this.addMetaTag('theme-color', '#4a7c59');
        this.addMetaTag('msapplication-navbutton-color', '#4a7c59');
        this.addMetaTag('apple-mobile-web-app-status-bar-style', 'default');
        
        // Add Open Graph tags if missing
        this.addOpenGraphTags(pageName);
        
        // Add Twitter Card tags
        this.addTwitterTags(pageName);
    }

    addMetaTag(name, content) {
        if (!document.querySelector(`meta[name="${name}"]`)) {
            const meta = document.createElement('meta');
            meta.name = name;
            meta.content = content;
            document.head.appendChild(meta);
        }
    }

    addOpenGraphTags(pageName) {
        const tags = [
            ['og:site_name', 'EcoSustainable.co.uk'],
            ['og:locale', 'en_GB'],
            ['og:type', 'website'],
            ['og:url', window.location.href],
            ['og:title', `${pageName} | EcoSustainable.co.uk`],
            ['og:description', this.getPageDescription()],
            ['og:image', 'https://ecosustainable.co.uk/attached_assets/Screenshot_23.png']
        ];

        tags.forEach(([property, content]) => {
            if (!document.querySelector(`meta[property="${property}"]`)) {
                const meta = document.createElement('meta');
                meta.setAttribute('property', property);
                meta.content = content;
                document.head.appendChild(meta);
            }
        });
    }

    addTwitterTags(pageName) {
        const tags = [
            ['twitter:card', 'summary_large_image'],
            ['twitter:title', `${pageName} | EcoSustainable.co.uk`],
            ['twitter:description', this.getPageDescription()],
            ['twitter:image', 'https://ecosustainable.co.uk/attached_assets/Screenshot_23.png']
        ];

        tags.forEach(([name, content]) => {
            if (!document.querySelector(`meta[name="${name}"]`)) {
                const meta = document.createElement('meta');
                meta.name = name;
                meta.content = content;
                document.head.appendChild(meta);
            }
        });
    }

    getPageName() {
        const path = window.location.pathname;
        
        if (path === '/' || path === '/index.html') return 'Home';
        if (path.includes('sitemap')) return 'Sitemap';
        if (path.includes('about')) return 'About Us';
        if (path.includes('contact')) return 'Contact Us';
        if (path.includes('categories')) return 'All Categories';
        if (path.includes('cities')) return 'All Cities';
        
        // Extract city and category from URL
        const match = path.match(/\/([^-]+)-([^.]+)/);
        if (match) {
            const [, city, category] = match;
            return `${this.formatName(category)} in ${this.formatName(city)}`;
        }
        
        // Single city page
        const cityMatch = path.match(/\/([^.]+)/);
        if (cityMatch) {
            return `Eco-Friendly Businesses in ${this.formatName(cityMatch[1])}`;
        }
        
        return 'Eco-Friendly Business Directory';
    }

    getPageDescription() {
        const path = window.location.pathname;
        
        if (path === '/' || path === '/index.html') {
            return 'Discover top eco-friendly businesses across UK cities. Find sustainable services, green products, and environmentally conscious companies near you. Over 500+ verified sustainable businesses.';
        }
        
        if (path.includes('sitemap')) {
            return 'Complete sitemap of EcoSustainable.co.uk featuring all eco-friendly business categories, UK cities, and important pages for easy navigation.';
        }
        
        const match = path.match(/\/([^-]+)-([^.]+)/);
        if (match) {
            const [, city, category] = match;
            return `Find top sustainable ${this.formatName(category).toLowerCase()} businesses in ${this.formatName(city)}. Verified eco-friendly companies committed to environmental responsibility.`;
        }
        
        const cityMatch = path.match(/\/([^.]+)/);
        if (cityMatch) {
            return `Discover eco-friendly businesses in ${this.formatName(cityMatch[1])}. Find sustainable services, green products, and environmentally conscious companies.`;
        }
        
        return 'UK\'s premier directory of eco-friendly and sustainable businesses across all major cities.';
    }

    formatName(str) {
        return str.replace(/-/g, ' ')
                 .replace(/\b\w/g, l => l.toUpperCase())
                 .replace(/\bAnd\b/g, '&');
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
        } else if (path === '/' || path === '/index.html') {
            this.addHomePageStructuredData();
        }
    }

    addHomePageStructuredData() {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "EcoSustainable.co.uk",
            "alternateName": "Eco Sustainable UK",
            "url": "https://ecosustainable.co.uk",
            "description": "UK's premier directory of eco-friendly and sustainable businesses across all major cities",
            "publisher": {
                "@type": "Organization",
                "name": "EcoSustainable.co.uk",
                "url": "https://ecosustainable.co.uk",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://ecosustainable.co.uk/attached_assets/Screenshot_23.png"
                }
            },
            "potentialAction": {
                "@type": "SearchAction",
                "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://ecosustainable.co.uk/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
            }
        };

        this.injectStructuredData(structuredData);
    }

    addCategoryPageStructuredData(city, category) {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": `${this.getCategoryDisplayName(category)} in ${this.formatName(city)}`,
            "description": `Find sustainable ${this.getCategoryDisplayName(category).toLowerCase()} businesses in ${this.formatName(city)}`,
            "url": window.location.href,
            "isPartOf": {
                "@type": "WebSite",
                "name": "EcoSustainable.co.uk",
                "url": "https://ecosustainable.co.uk"
            },
            "mainEntity": {
                "@type": "ItemList",
                "name": `${this.getCategoryDisplayName(category)} Businesses`,
                "description": `Directory of eco-friendly ${this.getCategoryDisplayName(category).toLowerCase()} businesses`,
                "numberOfItems": 10
            },
            "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://ecosustainable.co.uk"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": this.formatName(city),
                        "item": `https://ecosustainable.co.uk/${city}`
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": this.getCategoryDisplayName(category),
                        "item": window.location.href
                    }
                ]
            }
        };

        this.injectStructuredData(structuredData);
    }

    addCityPageStructuredData(city) {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": `Eco-Friendly Businesses in ${this.formatName(city)}`,
            "description": `Discover sustainable businesses and green companies in ${this.formatName(city)}`,
            "url": window.location.href,
            "isPartOf": {
                "@type": "WebSite",
                "name": "EcoSustainable.co.uk",
                "url": "https://ecosustainable.co.uk"
            }
        };

        this.injectStructuredData(structuredData);
    }

    injectStructuredData(data) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
    }

    extractCityCategory(path) {
        const match = path.match(/\/([^-]+)-([^.]+)\.html/);
        return match ? [match[1], match[2]] : [null, null];
    }

    getCategoryDisplayName(categoryKey) {
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

    // Optimize images for SEO
    optimizeImages() {
        const images = document.querySelectorAll('img:not([alt])');
        images.forEach((img, index) => {
            if (!img.alt) {
                img.alt = `Eco-friendly business image ${index + 1}`;
            }
        });

        // Add loading="lazy" to images below the fold
        const imagesLazy = document.querySelectorAll('img');
        imagesLazy.forEach((img, index) => {
            if (index > 2) { // First 3 images load normally
                img.loading = 'lazy';
            }
        });
    }

    // Optimize internal links
    handleInternalLinks() {
        const links = document.querySelectorAll('a[href^="/"]');
        links.forEach(link => {
            // Add title attribute if missing
            if (!link.title) {
                link.title = link.textContent.trim();
            }
        });
    }

    // Add breadcrumbs
    addBreadcrumbs() {
        const path = window.location.pathname;
        if (path === '/' || path === '/index.html') return;

        const breadcrumbContainer = document.createElement('nav');
        breadcrumbContainer.className = 'breadcrumb-nav';
        breadcrumbContainer.setAttribute('aria-label', 'Breadcrumb');

        const breadcrumbs = this.generateBreadcrumbs(path);
        breadcrumbContainer.innerHTML = breadcrumbs;

        // Insert after header
        const header = document.getElementById('header-component');
        if (header && header.nextSibling) {
            header.parentNode.insertBefore(breadcrumbContainer, header.nextSibling);
        }
    }

    generateBreadcrumbs(path) {
        const parts = path.split('/').filter(Boolean);
        let breadcrumbs = '<ol class="breadcrumb-list">';
        
        breadcrumbs += '<li class="breadcrumb-item"><a href="/">Home</a></li>';
        
        let currentPath = '';
        parts.forEach((part, index) => {
            currentPath += '/' + part;
            const isLast = index === parts.length - 1;
            const name = this.formatBreadcrumbName(part);
            
            if (isLast) {
                breadcrumbs += `<li class="breadcrumb-item active" aria-current="page">${name}</li>`;
            } else {
                breadcrumbs += `<li class="breadcrumb-item"><a href="${currentPath}">${name}</a></li>`;
            }
        });
        
        breadcrumbs += '</ol>';
        return breadcrumbs;
    }

    formatBreadcrumbName(part) {
        if (part.includes('-')) {
            const [city, category] = part.split('-');
            if (category) {
                return this.getCategoryDisplayName(`${city}-${category}`);
            }
        }
        return this.formatName(part);
    }

    // Optimize URLs
    optimizeUrls() {
        // Remove .html from URLs in links
        const links = document.querySelectorAll('a[href$=".html"]');
        links.forEach(link => {
            link.href = link.href.replace('.html', '');
        });
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
                    
                    // Add performance hints
                    if (metrics.loadTime > 3000) {
                        console.warn('Page load time is slow. Consider optimizing images and scripts.');
                    }
                }, 1000);
            });
        }
    }
}

// Add breadcrumb CSS
const breadcrumbCSS = `
.breadcrumb-nav {
    background: #f8f9fa;
    padding: 10px 0;
    border-bottom: 1px solid #e9ecef;
}

.breadcrumb-list {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.breadcrumb-item {
    display: flex;
    align-items: center;
}

.breadcrumb-item:not(:last-child)::after {
    content: '›';
    margin: 0 8px;
    color: #6c757d;
    font-weight: bold;
}

.breadcrumb-item a {
    color: #4a7c59;
    text-decoration: none;
    font-size: 0.9rem;
}

.breadcrumb-item a:hover {
    text-decoration: underline;
}

.breadcrumb-item.active {
    color: #6c757d;
    font-size: 0.9rem;
}

@media (max-width: 768px) {
    .breadcrumb-list {
        padding: 0 15px;
    }
    
    .breadcrumb-item {
        font-size: 0.8rem;
    }
}
`;

// Inject breadcrumb CSS
const style = document.createElement('style');
style.textContent = breadcrumbCSS;
document.head.appendChild(style);

// Initialize SEO enhancements when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SEOEnhancer();
});

// Export for global use
window.SEOEnhancer = SEOEnhancer;

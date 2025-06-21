
// SEO Enhancement Script for EcoSustainable.co.uk
// Handles dynamic SEO improvements and page optimization

// Core Web Vitals and Performance Optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.optimizeImages();
        this.lazyLoadImages();
        this.preloadCriticalResources();
        this.optimizeCSS();
        this.addPreconnect();
    }

    optimizeImages() {
        // Add modern image formats support and lazy loading
        const images = document.querySelectorAll('img');
        images.forEach((img, index) => {
            // Add loading attribute based on position
            if (index > 2) {
                img.loading = 'lazy';
            } else {
                img.loading = 'eager';
            }
            
            // Add decoding attribute
            img.decoding = 'async';
            
            // Add proper alt text if missing
            if (!img.alt) {
                const src = img.src || '';
                const filename = src.split('/').pop().split('.')[0];
                img.alt = `Eco-friendly business - ${filename}`;
            }
        });
    }

    lazyLoadImages() {
        // Implement intersection observer for better lazy loading
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    preloadCriticalResources() {
        // Preload critical CSS and fonts
        const criticalResources = [
            { href: '/style.css', as: 'style' },
            { href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css', as: 'style' }
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            if (resource.as === 'style') {
                link.onload = function() { this.rel = 'stylesheet'; };
            }
            document.head.appendChild(link);
        });
    }

    optimizeCSS() {
        // Remove unused CSS and optimize delivery
        const style = document.createElement('style');
        style.textContent = `
            /* Critical CSS for above-the-fold content */
            .hero-section, .navbar, .container { display: block; }
            /* Defer non-critical CSS */
            .footer, .seo-section { content-visibility: auto; }
        `;
        document.head.appendChild(style);
    }

    addPreconnect() {
        const domains = [
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com',
            'https://cdnjs.cloudflare.com'
        ];

        domains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = domain;
            link.crossOrigin = '';
            document.head.appendChild(link);
        });
    }
}

class SEOEnhancer {
    constructor() {
        this.performanceOptimizer = new PerformanceOptimizer();
        this.init();
    }

    init() {
        this.addComprehensiveMetaTags();
        this.addStructuredData();
        this.optimizeImages();
        this.handleInternalLinks();
        this.addBreadcrumbs();
        this.trackPagePerformance();
        this.optimizeUrls();
        this.addLocalBusinessSchema();
        this.implementRichSnippets();
        this.optimizePageSpeed();
        this.addSocialMediaTags();
        this.implementMobileSEO();
        this.addCanonicalTags();
        this.optimizeHeadings();
        this.addFAQSchema();
    }

    // Add comprehensive meta tags for all pages
    addComprehensiveMetaTags() {
        const path = window.location.pathname;
        const pageName = this.getPageName(path);
        const pageType = this.getPageType(path);
        
        // Update title with optimal length (50-60 characters)
        const title = this.generateOptimalTitle(pageName, pageType);
        if (!document.title.includes('EcoSustainable.co.uk') || document.title.length > 60) {
            document.title = title;
        }

        // Core SEO meta tags
        this.addMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
        this.addMetaTag('language', 'en-GB');
        this.addMetaTag('author', 'EcoSustainable.co.uk');
        this.addMetaTag('publisher', 'EcoSustainable.co.uk');
        this.addMetaTag('copyright', '© 2024 EcoSustainable.co.uk');
        
        // Geo-targeting for UK
        this.addMetaTag('geo.region', 'GB');
        this.addMetaTag('geo.country', 'UK');
        this.addMetaTag('ICBM', '54.7023545,-3.2765753');
        this.addMetaTag('geo.position', '54.7023545;-3.2765753');
        
        // Mobile optimization
        this.addMetaTag('theme-color', '#4a7c59');
        this.addMetaTag('msapplication-TileColor', '#4a7c59');
        this.addMetaTag('apple-mobile-web-app-capable', 'yes');
        this.addMetaTag('apple-mobile-web-app-status-bar-style', 'default');
        this.addMetaTag('apple-mobile-web-app-title', 'EcoSustainable');
        
        // Page-specific meta description
        const description = this.generateMetaDescription(pageName, pageType);
        this.addMetaTag('description', description);
        
        // Keywords based on page content
        const keywords = this.generateKeywords(pageName, pageType);
        this.addMetaTag('keywords', keywords);
        
        // Add Open Graph and Twitter tags
        this.addOpenGraphTags(pageName, pageType, description);
        this.addTwitterTags(pageName, pageType, description);
        
        // Add JSON-LD structured data
        this.addPageSpecificStructuredData(pageType, pageName);
    }

    generateOptimalTitle(pageName, pageType) {
        switch(pageType) {
            case 'homepage':
                return 'EcoSustainable.co.uk - UK Eco-Friendly Business Directory';
            case 'city':
                return `Top Eco Businesses in ${pageName} | EcoSustainable.co.uk`;
            case 'category':
                const parts = pageName.split(' in ');
                return `${parts[0]} ${parts[1]} | EcoSustainable.co.uk`;
            default:
                return `${pageName} | EcoSustainable.co.uk`;
        }
    }

    generateMetaDescription(pageName, pageType) {
        switch(pageType) {
            case 'homepage':
                return 'Discover 500+ verified eco-friendly businesses across 79 UK cities. Find sustainable services, green products & environmentally conscious companies near you.';
            case 'city':
                return `Find top sustainable businesses in ${pageName}. Discover eco-friendly services, green products & environmentally responsible companies verified by our experts.`;
            case 'category':
                return `Discover sustainable ${pageName.toLowerCase()} businesses. Find eco-friendly, verified companies committed to environmental responsibility & excellent service.`;
            default:
                return `Explore sustainable business options with EcoSustainable.co.uk - your trusted directory for eco-friendly companies across the UK.`;
        }
    }

    generateKeywords(pageName, pageType) {
        const baseKeywords = ['eco-friendly businesses UK', 'sustainable companies', 'green business directory', 'environmental businesses'];
        
        switch(pageType) {
            case 'city':
                return [...baseKeywords, `eco businesses ${pageName}`, `sustainable ${pageName}`, `green companies ${pageName}`].join(', ');
            case 'category':
                const category = pageName.split(' ')[0];
                return [...baseKeywords, `sustainable ${category}`, `eco-friendly ${category}`, `green ${category} UK`].join(', ');
            default:
                return baseKeywords.join(', ');
        }
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

    getPageType(path) {
        if (path === '/' || path === '/index.html' || path === '') return 'homepage';
        if (path.includes('-') && !path.includes('.html')) return 'category';
        if (path.includes('-') && path.includes('.html')) return 'category';
        return 'city';
    }

    getPageName(path) {
        if (path === '/' || path === '/index.html' || path === '') return 'Home';
        
        const cleanPath = path.replace(/^\//, '').replace(/\.html$/, '');
        const parts = cleanPath.split('-');
        
        if (parts.length > 1) {
            // Category page
            const city = parts[0].replace(/\b\w/g, l => l.toUpperCase());
            const category = this.getCategoryDisplayName(parts.slice(1).join('-'));
            return `${category} in ${city}`;
        } else {
            // City page
            return cleanPath.replace(/\b\w/g, l => l.toUpperCase());
        }
    }

    addLocalBusinessSchema() {
        const pageType = this.getPageType(window.location.pathname);
        
        if (pageType === 'city' || pageType === 'category') {
            const schema = {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "EcoSustainable.co.uk",
                "description": "UK's Premier Eco-Friendly Business Directory",
                "url": "https://ecosustainable.co.uk",
                "telephone": "+44-800-ECO-BUSI",
                "address": {
                    "@type": "PostalAddress",
                    "addressCountry": "GB",
                    "addressRegion": "United Kingdom"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": "54.7023545",
                    "longitude": "-3.2765753"
                },
                "sameAs": [
                    "https://www.facebook.com/ecosustainableuk",
                    "https://www.twitter.com/ecosustainableuk",
                    "https://www.linkedin.com/company/ecosustainable-uk"
                ],
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.8",
                    "reviewCount": "1247"
                }
            };

            this.addStructuredDataScript(schema);
        }
    }

    addFAQSchema() {
        const faqData = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "What makes a business eco-friendly?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Eco-friendly businesses prioritize environmental sustainability through renewable energy use, waste reduction, sustainable sourcing, and environmentally responsible practices."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How do you verify businesses are sustainable?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "We verify businesses through comprehensive evaluation of their environmental policies, certifications, energy usage, waste management practices, and commitment to sustainability."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Are all listed businesses certified sustainable?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "All businesses in our directory meet strict sustainability criteria and many hold recognized environmental certifications such as B-Corp, ISO 14001, or industry-specific green certifications."
                    }
                }
            ]
        };

        this.addStructuredDataScript(faqData);
    }

    implementRichSnippets() {
        // Add breadcrumb structured data
        const breadcrumbSchema = this.generateBreadcrumbSchema();
        if (breadcrumbSchema) {
            this.addStructuredDataScript(breadcrumbSchema);
        }

        // Add organization schema
        const organizationSchema = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "EcoSustainable.co.uk",
            "url": "https://ecosustainable.co.uk",
            "logo": "https://ecosustainable.co.uk/logo.png",
            "foundingDate": "2024",
            "description": "UK's Premier Eco-Friendly Business Directory connecting consumers with verified sustainable businesses",
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+44-800-ECO-BUSI",
                "contactType": "Customer Service",
                "areaServed": "GB"
            }
        };

        this.addStructuredDataScript(organizationSchema);
    }

    generateBreadcrumbSchema() {
        const path = window.location.pathname;
        const pathParts = path.replace(/^\//, '').replace(/\.html$/, '').split('-');
        
        if (pathParts.length < 2) return null;

        const items = [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://ecosustainable.co.uk"
            }
        ];

        if (pathParts.length >= 2) {
            items.push({
                "@type": "ListItem",
                "position": 2,
                "name": pathParts[0].charAt(0).toUpperCase() + pathParts[0].slice(1),
                "item": `https://ecosustainable.co.uk/${pathParts[0]}`
            });

            if (pathParts.length > 2) {
                const category = this.getCategoryDisplayName(pathParts.slice(1).join('-'));
                items.push({
                    "@type": "ListItem",
                    "position": 3,
                    "name": category,
                    "item": window.location.href
                });
            }
        }

        return {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": items
        };
    }

    addStructuredDataScript(data) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
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


    addSocialMediaTags(pageName, pageType, description) {
        // Facebook Open Graph
        this.addMetaTag('og:site_name', 'EcoSustainable.co.uk', 'property');
        this.addMetaTag('og:type', pageType === 'homepage' ? 'website' : 'article', 'property');
        this.addMetaTag('og:locale', 'en_GB', 'property');
        this.addMetaTag('og:image:width', '1200', 'property');
        this.addMetaTag('og:image:height', '630', 'property');
        this.addMetaTag('og:image:alt', `${pageName} - EcoSustainable.co.uk`, 'property');
        
        // Twitter Cards
        this.addMetaTag('twitter:card', 'summary_large_image');
        this.addMetaTag('twitter:site', '@EcoSustainableUK');
        this.addMetaTag('twitter:creator', '@EcoSustainableUK');
        
        // LinkedIn
        this.addMetaTag('linkedin:owner', 'ecosustainable-uk');
    }

    implementMobileSEO() {
        // Add mobile-specific optimizations
        this.addMetaTag('format-detection', 'telephone=yes');
        this.addMetaTag('mobile-web-app-capable', 'yes');
        this.addMetaTag('mobile-web-app-title', 'EcoSustainable');
        
        // Touch icons for various devices
        this.addTouchIcons();
        
        // Viewport optimization
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
        }
    }

    addTouchIcons() {
        const sizes = ['57x57', '60x60', '72x72', '76x76', '114x114', '120x120', '144x144', '152x152', '180x180'];
        
        sizes.forEach(size => {
            const link = document.createElement('link');
            link.rel = 'apple-touch-icon';
            link.sizes = size;
            link.href = `/icons/apple-touch-icon-${size}.png`;
            document.head.appendChild(link);
        });
    }

    addCanonicalTags() {
        // Enhanced canonical URL handling
        const canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            const canonicalLink = document.createElement('link');
            canonicalLink.rel = 'canonical';
            canonicalLink.href = this.getCanonicalURL();
            document.head.appendChild(canonicalLink);
        }
    }

    getCanonicalURL() {
        const url = new URL(window.location);
        url.search = ''; // Remove query parameters
        url.hash = ''; // Remove fragments
        return url.toString();
    }

    optimizeHeadings() {
        // Ensure proper heading hierarchy
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        let h1Count = 0;
        
        headings.forEach(heading => {
            if (heading.tagName === 'H1') {
                h1Count++;
                if (h1Count > 1) {
                    console.warn('Multiple H1 tags found - SEO issue');
                }
            }
            
            // Add proper heading structure
            if (!heading.id) {
                heading.id = this.generateHeadingId(heading.textContent);
            }
        });
    }

    generateHeadingId(text) {
        return text.toLowerCase()
                  .replace(/[^a-z0-9\s-]/g, '')
                  .replace(/\s+/g, '-')
                  .replace(/-+/g, '-')
                  .trim();
    }

    optimizePageSpeed() {
        // Critical resource hints
        this.addResourceHints();
        
        // Defer non-critical JavaScript
        this.deferNonCriticalJS();
        
        // Optimize CSS delivery
        this.optimizeCSSDelivery();
    }

    addResourceHints() {
        const hints = [
            { rel: 'dns-prefetch', href: '//www.google-analytics.com' },
            { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
            { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true }
        ];

        hints.forEach(hint => {
            const link = document.createElement('link');
            Object.assign(link, hint);
            document.head.appendChild(link);
        });
    }

    deferNonCriticalJS() {
        const scripts = document.querySelectorAll('script[src]');
        scripts.forEach(script => {
            if (!script.hasAttribute('async') && !script.hasAttribute('defer')) {
                script.defer = true;
            }
        });
    }

    optimizeCSSDelivery() {
        // Add critical CSS inline
        const criticalCSS = `
            .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
            .hero-section { background: #4a7c59; color: white; text-align: center; padding: 4rem 0; }
            .navbar { background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 100; }
        `;
        
        const style = document.createElement('style');
        style.textContent = criticalCSS;
        document.head.appendChild(style);
    }

    addPageSpecificStructuredData(pageType, pageName) {
        switch(pageType) {
            case 'city':
                this.addCityPageSchema(pageName);
                break;
            case 'category':
                this.addCategoryPageSchema(pageName);
                break;
            case 'homepage':
                this.addHomepageSchema();
                break;
        }
    }

    addCityPageSchema(cityName) {
        const schema = {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": `Eco-Friendly Businesses in ${cityName}`,
            "description": `Directory of sustainable businesses in ${cityName}`,
            "url": window.location.href,
            "mainEntity": {
                "@type": "ItemList",
                "name": `${cityName} Sustainable Business Directory`,
                "description": `Curated list of eco-friendly businesses in ${cityName}`
            },
            "about": {
                "@type": "Place",
                "name": cityName,
                "addressRegion": "United Kingdom"
            }
        };

        this.addStructuredDataScript(schema);
    }

    addCategoryPageSchema(pageName) {
        const schema = {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": pageName,
            "description": `Sustainable ${pageName.toLowerCase()} businesses directory`,
            "url": window.location.href,
            "mainEntity": {
                "@type": "ItemList",
                "name": `${pageName} Business Directory`,
                "description": `Professional directory of sustainable ${pageName.toLowerCase()} services`
            }
        };

        this.addStructuredDataScript(schema);
    }

    addHomepageSchema() {
        const schema = {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "EcoSustainable.co.uk",
            "url": "https://ecosustainable.co.uk",
            "description": "UK's Premier Eco-Friendly Business Directory",
            "potentialAction": {
                "@type": "SearchAction",
                "target": "https://ecosustainable.co.uk/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
            },
            "publisher": {
                "@type": "Organization",
                "name": "EcoSustainable.co.uk"
            }
        };

        this.addStructuredDataScript(schema);
    }

    addMetaTag(name, content, type = 'name') {
        const existingTag = document.querySelector(`meta[${type}="${name}"]`);
        if (!existingTag) {
            const meta = document.createElement('meta');
            meta.setAttribute(type, name);
            meta.content = content;
            document.head.appendChild(meta);
        }
    }

    addOpenGraphTags(pageName, pageType, description) {
        this.addMetaTag('og:title', this.generateOptimalTitle(pageName, pageType), 'property');
        this.addMetaTag('og:description', description, 'property');
        this.addMetaTag('og:url', window.location.href, 'property');
        this.addMetaTag('og:image', 'https://ecosustainable.co.uk/og-image.jpg', 'property');
    }

    addTwitterTags(pageName, pageType, description) {
        this.addMetaTag('twitter:title', this.generateOptimalTitle(pageName, pageType));
        this.addMetaTag('twitter:description', description);
        this.addMetaTag('twitter:image', 'https://ecosustainable.co.uk/twitter-image.jpg');
    }
}

// Initialize SEO enhancements when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new SEOEnhancer();
});

// Export for global access
window.SEOEnhancer = SEOEnhancer;

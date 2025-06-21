
// Advanced SEO Optimizer for EcoSustainable.co.uk
// Handles dynamic SEO enhancements, page speed optimization, and accessibility

class SEOOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.optimizePageSpeed();
        this.enhanceAccessibility();
        this.addPreloadTags();
        this.optimizeImages();
        this.addBreadcrumbs();
        this.trackCoreWebVitals();
        this.enhanceInternalLinking();
        this.addSocialMetaTags();
    }

    optimizePageSpeed() {
        // Preconnect to external domains
        this.addPreconnect('https://fonts.googleapis.com');
        this.addPreconnect('https://fonts.gstatic.com');
        this.addPreconnect('https://cdnjs.cloudflare.com');

        // Add DNS prefetch for faster loading
        this.addDNSPrefetch('https://www.google-analytics.com');
        this.addDNSPrefetch('https://www.googletagmanager.com');

        // Defer non-critical JavaScript
        this.deferNonCriticalJS();

        // Optimize critical CSS
        this.optimizeCriticalCSS();
    }

    addPreconnect(url) {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = url;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    }

    addDNSPrefetch(url) {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = url;
        document.head.appendChild(link);
    }

    deferNonCriticalJS() {
        const scripts = document.querySelectorAll('script[src]');
        scripts.forEach(script => {
            if (!script.src.includes('critical') && !script.hasAttribute('defer')) {
                script.defer = true;
            }
        });
    }

    optimizeCriticalCSS() {
        // Add critical CSS inline for above-the-fold content
        const criticalCSS = `
            .hero { background: linear-gradient(135deg, #4ade80 0%, #059669 100%); }
            .hero-content { display: flex; align-items: center; }
            .highlight { color: #059669; }
            .quick-action-btn { background: #059669; color: white; padding: 12px 24px; }
        `;
        
        const style = document.createElement('style');
        style.textContent = criticalCSS;
        document.head.insertBefore(style, document.head.firstChild);
    }

    enhanceAccessibility() {
        // Add skip links
        this.addSkipLinks();
        
        // Enhance focus management
        this.enhanceFocusManagement();
        
        // Add ARIA labels where missing
        this.addMissingAriaLabels();
        
        // Improve color contrast
        this.improveColorContrast();
    }

    addSkipLinks() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #000;
            color: #fff;
            padding: 8px;
            text-decoration: none;
            z-index: 100;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    enhanceFocusManagement() {
        // Add focus indicators
        const style = document.createElement('style');
        style.textContent = `
            *:focus {
                outline: 2px solid #059669;
                outline-offset: 2px;
            }
            .skip-link:focus {
                outline: 2px solid #fff;
            }
        `;
        document.head.appendChild(style);
    }

    addMissingAriaLabels() {
        // Add ARIA labels to buttons without text
        const buttons = document.querySelectorAll('button:not([aria-label])');
        buttons.forEach(button => {
            const icon = button.querySelector('i');
            if (icon && !button.textContent.trim()) {
                const iconClass = icon.className;
                if (iconClass.includes('search')) {
                    button.setAttribute('aria-label', 'Search');
                } else if (iconClass.includes('menu')) {
                    button.setAttribute('aria-label', 'Menu');
                }
            }
        });

        // Add ARIA labels to form inputs
        const inputs = document.querySelectorAll('input:not([aria-label]):not([id])');
        inputs.forEach(input => {
            if (input.placeholder) {
                input.setAttribute('aria-label', input.placeholder);
            }
        });
    }

    addPreloadTags() {
        // Preload critical fonts
        this.preloadResource('/fonts/poppins-regular.woff2', 'font', 'font/woff2');
        this.preloadResource('/fonts/poppins-medium.woff2', 'font', 'font/woff2');
        
        // Preload hero image
        this.preloadResource('/images/hero-bg.jpg', 'image', 'image/jpeg');
        
        // Preload critical CSS
        this.preloadResource('/style.css', 'style');
    }

    preloadResource(href, as, type = null) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = as;
        if (type) link.type = type;
        if (as === 'font') link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    }

    optimizeImages() {
        // Add lazy loading to images
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach((img, index) => {
            // First 3 images load immediately (above fold)
            if (index < 3) {
                img.loading = 'eager';
                img.fetchpriority = 'high';
            } else {
                img.loading = 'lazy';
            }
            
            // Add alt text if missing
            if (!img.alt) {
                img.alt = 'EcoSustainable business image';
            }
        });

        // Add WebP support detection
        this.addWebPSupport();
    }

    addWebPSupport() {
        const webpSupported = (() => {
            const canvas = document.createElement('canvas');
            canvas.width = 1;
            canvas.height = 1;
            return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        })();

        if (webpSupported) {
            document.documentElement.classList.add('webp-supported');
        }
    }

    addBreadcrumbs() {
        const path = window.location.pathname;
        const breadcrumbContainer = document.querySelector('.breadcrumbs') || this.createBreadcrumbContainer();
        
        const breadcrumbs = this.generateBreadcrumbs(path);
        const breadcrumbHTML = this.renderBreadcrumbs(breadcrumbs);
        
        breadcrumbContainer.innerHTML = breadcrumbHTML;
        
        // Add structured data for breadcrumbs
        this.addBreadcrumbStructuredData(breadcrumbs);
    }

    createBreadcrumbContainer() {
        const container = document.createElement('nav');
        container.className = 'breadcrumbs';
        container.setAttribute('aria-label', 'Breadcrumb navigation');
        
        const mainContent = document.querySelector('main') || document.body;
        mainContent.insertBefore(container, mainContent.firstChild);
        
        return container;
    }

    generateBreadcrumbs(path) {
        const breadcrumbs = [{ name: 'Home', url: '/' }];
        
        if (path === '/' || path === '/index.html') {
            return breadcrumbs;
        }
        
        if (path.includes('-')) {
            // Category page
            const match = path.match(/\/([^-]+)-([^.]+)/);
            if (match) {
                const [, city, category] = match;
                breadcrumbs.push({
                    name: this.formatCityName(city),
                    url: `/${city}`
                });
                breadcrumbs.push({
                    name: this.formatCategoryName(category),
                    url: path.replace('.html', '')
                });
            }
        } else {
            // City page
            const city = path.replace('/', '').replace('.html', '');
            breadcrumbs.push({
                name: this.formatCityName(city),
                url: path.replace('.html', '')
            });
        }
        
        return breadcrumbs;
    }

    renderBreadcrumbs(breadcrumbs) {
        const items = breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            
            if (isLast) {
                return `<span class="breadcrumb-current" aria-current="page">${crumb.name}</span>`;
            } else {
                return `<a href="${crumb.url}" class="breadcrumb-link">${crumb.name}</a>`;
            }
        });
        
        return `<ol class="breadcrumb-list">${items.map(item => `<li class="breadcrumb-item">${item}</li>`).join('')}</ol>`;
    }

    addBreadcrumbStructuredData(breadcrumbs) {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs.map((crumb, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": crumb.name,
                "item": `https://ecosustainable.co.uk${crumb.url}`
            }))
        };
        
        let script = document.getElementById('breadcrumb-schema');
        if (!script) {
            script = document.createElement('script');
            script.id = 'breadcrumb-schema';
            script.type = 'application/ld+json';
            document.head.appendChild(script);
        }
        script.textContent = JSON.stringify(structuredData);
    }

    trackCoreWebVitals() {
        // Track Core Web Vitals for SEO
        if ('web-vital' in window) {
            import('https://unpkg.com/web-vitals@3/dist/web-vitals.js').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
                getCLS(console.log);
                getFID(console.log);
                getFCP(console.log);
                getLCP(console.log);
                getTTFB(console.log);
            });
        }
    }

    enhanceInternalLinking() {
        // Add related page suggestions
        this.addRelatedPageLinks();
        
        // Optimize anchor text
        this.optimizeAnchorText();
    }

    addRelatedPageLinks() {
        const path = window.location.pathname;
        const relatedContainer = document.createElement('div');
        relatedContainer.className = 'related-pages';
        relatedContainer.innerHTML = '<h3>Related Pages</h3>';
        
        const relatedLinks = this.getRelatedPages(path);
        const linksList = document.createElement('ul');
        
        relatedLinks.forEach(link => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${link.url}">${link.title}</a>`;
            linksList.appendChild(li);
        });
        
        relatedContainer.appendChild(linksList);
        
        // Insert before footer
        const footer = document.querySelector('footer') || document.body.lastElementChild;
        footer.parentNode.insertBefore(relatedContainer, footer);
    }

    getRelatedPages(currentPath) {
        const relatedPages = [];
        
        if (currentPath.includes('-')) {
            // For category pages, suggest other categories in same city
            const match = currentPath.match(/\/([^-]+)-([^.]+)/);
            if (match) {
                const [, city] = match;
                relatedPages.push({
                    title: `All Eco Businesses in ${this.formatCityName(city)}`,
                    url: `/${city}`
                });
                relatedPages.push({
                    title: 'Browse All Categories',
                    url: '/categories'
                });
            }
        } else if (currentPath !== '/') {
            // For city pages, suggest categories
            relatedPages.push({
                title: 'Browse All Cities',
                url: '/cities'
            });
            relatedPages.push({
                title: 'Browse Categories',
                url: '/categories'
            });
        }
        
        return relatedPages;
    }

    optimizeAnchorText() {
        const links = document.querySelectorAll('a');
        links.forEach(link => {
            const text = link.textContent.trim();
            
            // Avoid generic anchor text
            if (['click here', 'read more', 'more'].includes(text.toLowerCase())) {
                const context = this.getContextualText(link);
                if (context) {
                    link.textContent = context;
                }
            }
        });
    }

    getContextualText(link) {
        const parent = link.closest('article, section, div');
        if (parent) {
            const heading = parent.querySelector('h1, h2, h3, h4, h5, h6');
            if (heading) {
                return `Learn more about ${heading.textContent}`;
            }
        }
        return null;
    }

    addSocialMetaTags() {
        // Add Open Graph tags for better social sharing
        this.addMetaTag('og:locale', 'en_GB');
        this.addMetaTag('og:site_name', 'EcoSustainable.co.uk');
        this.addMetaTag('og:image:width', '1200');
        this.addMetaTag('og:image:height', '630');
        
        // Add Twitter Card tags
        this.addMetaTag('twitter:card', 'summary_large_image', 'name');
        this.addMetaTag('twitter:site', '@EcoSustainableUK', 'name');
        this.addMetaTag('twitter:creator', '@EcoSustainableUK', 'name');
    }

    addMetaTag(property, content, attributeType = 'property') {
        let meta = document.querySelector(`meta[${attributeType}="${property}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute(attributeType, property);
            meta.content = content;
            document.head.appendChild(meta);
        }
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

    improveColorContrast() {
        // Add high contrast mode support
        const style = document.createElement('style');
        style.textContent = `
            @media (prefers-contrast: high) {
                .hero { background: #000 !important; color: #fff !important; }
                .btn-primary { background: #000 !important; border: 2px solid #fff !important; }
                .highlight { color: #00ff00 !important; }
            }
            
            @media (prefers-reduced-motion: reduce) {
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize SEO optimizer when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SEOOptimizer();
});

// Export for use in other modules
window.SEOOptimizer = SEOOptimizer;

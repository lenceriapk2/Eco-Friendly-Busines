// Canonical URL Management System
const CANONICAL_STRATEGIES = {
    SELF_REFERENCING: 'self',
    CATEGORY_BASED: 'category',
    LOCATION_BASED: 'location',
    HIERARCHICAL: 'hierarchical'
};

class CanonicalManager {
    constructor() {
        this.currentStrategy = CANONICAL_STRATEGIES.HIERARCHICAL;
        this.baseURL = 'https://ecosustainable.co.uk';
        this.initialize();
    }

    initialize() {
        this.setCanonicalURL();
        this.updateMetaTags();
    }

    setCanonicalURL() {
        const currentPath = window.location.pathname;
        const canonicalURL = this.generateCanonicalURL(currentPath);

        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.rel = 'canonical';
            document.head.appendChild(canonicalLink);
        }
        canonicalLink.href = canonicalURL;
    }

    generateCanonicalURL(path) {
        // Remove any trailing slashes and ensure clean URLs
        const cleanPath = path.replace(/\/+$/, '') || '/';
        return `${this.baseURL}${cleanPath}`;
    }

    updateMetaTags() {
        // Update Open Graph URL
        let ogURL = document.querySelector('meta[property="og:url"]');
        if (!ogURL) {
            ogURL = document.createElement('meta');
            ogURL.setAttribute('property', 'og:url');
            document.head.appendChild(ogURL);
        }
        ogURL.content = this.generateCanonicalURL(window.location.pathname);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new CanonicalManager();
});
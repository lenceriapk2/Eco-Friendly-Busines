
// Clean URLs Updater - Updates all internal links to remove .html extensions
class CleanURLUpdater {
    constructor() {
        this.init();
    }

    init() {
        this.updateAllLinks();
        this.updateCanonicalUrls();
        this.updateFormActions();
        this.monitorDynamicContent();
    }

    updateAllLinks() {
        // Update all anchor tags with .html extensions
        const links = document.querySelectorAll('a[href$=".html"]');
        links.forEach(link => {
            let href = link.getAttribute('href');
            
            // Convert to clean URL
            if (href === 'index.html') {
                link.setAttribute('href', '/');
            } else {
                // Remove .html extension
                href = href.replace('.html', '');
                // Ensure proper leading slash for internal links
                if (!href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('/')) {
                    href = '/' + href;
                }
                link.setAttribute('href', href);
            }
        });
    }

    updateCanonicalUrls() {
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
            let href = canonical.getAttribute('href');
            if (href && href.endsWith('.html')) {
                if (href.endsWith('index.html')) {
                    href = href.replace('/index.html', '/').replace('index.html', '/');
                } else {
                    href = href.replace('.html', '');
                }
                canonical.setAttribute('href', href);
            }
        }
    }

    updateFormActions() {
        // Update any form actions that might have .html
        const forms = document.querySelectorAll('form[action$=".html"]');
        forms.forEach(form => {
            let action = form.getAttribute('action');
            if (action === 'index.html') {
                form.setAttribute('action', '/');
            } else {
                form.setAttribute('action', action.replace('.html', ''));
            }
        });
    }

    monitorDynamicContent() {
        // Monitor for dynamically added content and update links
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            this.updateLinksInElement(node);
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    updateLinksInElement(element) {
        const links = element.querySelectorAll('a[href$=".html"]');
        links.forEach(link => {
            let href = link.getAttribute('href');
            if (href === 'index.html') {
                link.setAttribute('href', '/');
            } else {
                href = href.replace('.html', '');
                if (!href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('/')) {
                    href = '/' + href;
                }
                link.setAttribute('href', href);
            }
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new CleanURLUpdater();
});

// Also run immediately if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new CleanURLUpdater());
} else {
    new CleanURLUpdater();
}

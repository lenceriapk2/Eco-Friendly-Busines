const headerHTML = `
        <header class="header">
            <div class="container">
                <div class="header-content">
                    <div class="logo">
                        <a href="index.html">
                            <h1>EcoSustainable<span>.co.uk</span></h1>
                        </a>
                    </div>

                    <nav class="nav-menu">
                        <div class="nav-dropdown">
                            <a href="index.html" class="nav-link">Home</a>
                        </div>

                        <div class="nav-dropdown">
                            <a href="#" class="nav-link dropdown-toggle">
                                Categories <i class="fas fa-chevron-down"></i>
                            </a>
                            <div class="dropdown-content mega-menu">
                                <div class="mega-menu-section">
                                    <h4>Health & Beauty</h4>
                                    <a href="health-beauty-category.html">All Health & Beauty</a>
                                    <a href="london.html">London</a>
                                    <a href="manchester.html">Manchester</a>
                                    <a href="birmingham.html">Birmingham</a>
                                </div>
                                <div class="mega-menu-section">
                                    <h4>Products & Retail</h4>
                                    <a href="products-retail-category.html">All Products & Retail</a>
                                    <a href="london.html">London</a>
                                    <a href="manchester.html">Manchester</a>
                                    <a href="birmingham.html">Birmingham</a>
                                </div>
                                <div class="mega-menu-section">
                                    <h4>Transport & Travel</h4>
                                    <a href="transport-travel-category.html">All Transport & Travel</a>
                                    <a href="london.html">London</a>
                                    <a href="manchester.html">Manchester</a>
                                    <a href="birmingham.html">Birmingham</a>
                                </div>
                                <div class="mega-menu-section">
                                    <h4>Energy & Utilities</h4>
                                    <a href="energy-utilities-category.html">All Energy & Utilities</a>
                                    <a href="london.html">London</a>
                                    <a href="manchester.html">Manchester</a>
                                    <a href="birmingham.html">Birmingham</a>
                                </div>
                            </div>
                        </div>

                        <a href="cities.html" class="nav-link">Cities</a>
                        <a href="contact-us.html" class="nav-link">Contact</a>
                    </nav>

                    <div class="header-actions">
                        <button class="mobile-menu-toggle" onclick="toggleMobileMenu()">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    `;
const footerHTML = `
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <div class="footer-logo">
                            <div class="logo-container">
                                <div class="logo-icon">
                                    <i class="fas fa-leaf"></i>
                                </div>
                                <div class="logo-text">
                                    <h3>Eco<span>Sustainable</span>.co.uk</h3>
                                </div>
                            </div>
                            <p>Connecting you with our sustainable businesses across the UK</p>
                        </div>
                        <div class="social-links">
                            <a href="#" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
                            <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                            <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                            <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                        </div>
                    </div>

                    <div class="footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li><a href="cities.html">Cities</a></li>
                            <li><a href="categories.html">Categories</a></li>
                            <li><a href="about-us.html">About Us</a></li>
                        </ul>
                    </div>

                    <div class="footer-section">
                        <h4>Categories</h4>
                        <ul>
                            <li><a href="health-beauty-category.html">Health & Beauty</a></li>
                            <li><a href="products-retail-category.html">Products & Retail</a></li>
                            <li><a href="transport-travel-category.html">Transport & Travel</a></li>
                            <li><a href="energy-utilities-category.html">Energy & Utilities</a></li>
                        </ul>
                    </div>

                    <div class="footer-section">
                        <h4>Legal</h4>
                        <ul>
                            <li><a href="privacy-policy.html">Privacy Policy</a></li>
                            <li><a href="terms-of-service.html">Terms of Service</a></li>
                            <li><a href="contact-us.html">Contact Us</a></li>
                        </ul>
                    </div>
                </div>

                <div class="footer-bottom">
                    <div class="footer-bottom-content">
                        <p>&copy; 2024 EcoSustainable.co.uk. All rights reserved.</p>
                        <p>Made with <i class="fas fa-heart" style="color: #4CAF50;"></i> for a sustainable future</p>
                    </div>
                </div>
            </div>
        </footer>
    `;
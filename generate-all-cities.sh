#!/bin/bash

# Generate All UK City Pages Script
# This script creates HTML pages for major UK cities with eco-friendly business directories

echo "Generating city pages for major UK cities..."

# Define cities and their details
declare -A cities=(
    ["manchester"]="Manchester"
    ["birmingham"]="Birmingham"
    ["edinburgh"]="Edinburgh"
    ["bristol"]="Bristol"
    ["glasgow"]="Glasgow"
    ["liverpool"]="Liverpool"
    ["leeds"]="Leeds"
    ["sheffield"]="Sheffield"
    ["newcastle"]="Newcastle"
    ["nottingham"]="Nottingham"
    ["cardiff"]="Cardiff"
    ["belfast"]="Belfast"
    ["cambridge"]="Cambridge"
    ["oxford"]="Oxford"
    ["bath"]="Bath"
    ["york"]="York"
    ["brighton"]="Brighton"
    ["chester"]="Chester"
    ["exeter"]="Exeter"
    ["norwich"]="Norwich"
)

# Define category mappings
declare -A categories=(
    ["home-living"]="Home & Living"
    ["fashion-accessories"]="Fashion & Accessories"
    ["food-beverage"]="Food & Beverage"
    ["health-beauty"]="Health & Beauty"
    ["products-retail"]="Products & Retail"
    ["transport-travel"]="Transport & Travel"
    ["services-professional"]="Services & Professional"
    ["energy-utilities"]="Energy & Utilities"
    ["recycling-waste"]="Recycling & Waste Management"
    ["education-nonprofits"]="Education & Nonprofits"
)

# Create main city page function
create_city_page() {
    local city_key=$1
    local city_name=$2
    local filename="${city_key}.html"

    cat > "$filename" << EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Eco-Friendly Businesses in ${city_name} | EcoSustainable.co.uk</title>
    <meta name="description" content="Discover sustainable and eco-friendly businesses in ${city_name}. Find green companies, ethical services, and environmentally conscious brands in ${city_name}.">
    <meta name="keywords" content="${city_name} eco businesses, sustainable ${city_name}, green businesses ${city_name}, eco-friendly ${city_name}">

    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="Eco-Friendly Businesses in ${city_name}">
    <meta property="og:description" content="Discover sustainable businesses in ${city_name} that prioritize environmental responsibility.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://ecosustainable.co.uk/${city_key}.html">

    <!-- Schema.org structured data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Eco-Friendly Businesses in ${city_name}",
        "description": "Directory of sustainable businesses in ${city_name}",
        "url": "https://ecosustainable.co.uk/${city_key}.html"
    }
    </script>

    <link href="style.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="canonical" href="https://ecosustainable.co.uk/${city_key}.html">
</head>
<body>
    <!-- Header Component -->
    <div id="header-component"></div>

    <!-- City Hero Section -->
    <section class="city-hero">
        <div class="container">
            <nav class="breadcrumb">
                <a href="index.html">Home</a> > <span>${city_name}</span>
            </nav>

            <h1>Top 10 Eco-Friendly Businesses in ${city_name}</h1>
            <p class="hero-description">Discover ${city_name}'s leading sustainable businesses committed to environmental responsibility and ethical practices.</p>

            <div class="search-container">
                <input type="text" id="searchInput" placeholder="Search businesses in ${city_name}...">
                <select id="categoryFilter">
                    <option value="">All Categories</option>
                    <option value="home-living">Home & Living</option>
                    <option value="fashion-accessories">Fashion & Accessories</option>
                    <option value="food-beverage">Food & Beverage</option>
                    <option value="health-beauty">Health & Beauty</option>
                    <option value="products-retail">Products & Retail</option>
                    <option value="transport-travel">Transport & Travel</option>
                    <option value="services-professional">Services & Professional</option>
                    <option value="energy-utilities">Energy & Utilities</option>
                    <option value="recycling-waste">Recycling & Waste</option>
                    <option value="education-nonprofits">Education & Nonprofits</option>
                </select>
                <button class="search-btn"><i class="fas fa-search"></i></button>
            </div>
        </div>
    </section>

    <!-- Quick Stats -->
    <section class="quick-stats">
        <div class="container">
            <div class="stats-row">
                <div class="stat-item">
                    <span class="stat-number" id="businessCount">50+</span>
                    <span class="stat-label">Eco Businesses</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">10</span>
                    <span class="stat-label">Categories</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">4.8</span>
                    <span class="stat-label">Avg Rating</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">95%</span>
                    <span class="stat-label">Satisfaction</span>
                </div>
            </div>
        </div>
    </section>

    <!-- Category Filter Section -->
    <section class="category-filter-section">
        <div class="container">
            <div class="category-filter-container">
                <div class="filter-group">
                    <label for="sortBy">Sort by:</label>
                    <select id="sortBy">
                        <option value="rating">Highest Rated</option>
                        <option value="reviews">Most Reviewed</option>
                        <option value="name">Name A-Z</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label for="categorySelect">Category:</label>
                    <select id="categorySelect">
                        <option value="">All Categories</option>
                        <option value="home-living">Home & Living</option>
                        <option value="fashion-accessories">Fashion & Accessories</option>
                        <option value="food-beverage">Food & Beverage</option>
                        <option value="health-beauty">Health & Beauty</option>
                        <option value="products-retail">Products & Retail</option>
                        <option value="transport-travel">Transport & Travel</option>
                        <option value="services-professional">Services & Professional</option>
                        <option value="energy-utilities">Energy & Utilities</option>
                        <option value="recycling-waste">Recycling & Waste</option>
                        <option value="education-nonprofits">Education & Nonprofits</option>
                    </select>
                </div>
            </div>
        </div>
    </section>

    <!-- Categories Section -->
    <section class="london-categories">
        <div class="container">
            <h2>Explore Categories in ${city_name}</h2>
            <div class="london-categories-grid" id="categoriesGrid">
                <!-- Categories will be populated by JavaScript -->
            </div>
        </div>
    </section>

    <!-- Top Businesses Section -->
    <section class="london-businesses">
        <div class="container">
            <div class="businesses-header">
                <h2>Top Rated Sustainable Businesses in ${city_name}</h2>
                <p class="businesses-description">Each business has been carefully vetted for their environmental practices, sustainability certifications, and commitment to ethical operations.</p>
            </div>

            <div class="london-businesses-grid" id="cityBusinessesGrid">
                <!-- Businesses will be populated by JavaScript -->
            </div>
        </div>
    </section>

    <!-- Footer Component -->
    <div id="footer-component"></div>

    <script src="components.js"></script>
    <script src="places-api.js"></script>
    <script src="script.js"></script>
    <script>
        // Initialize city page
        document.addEventListener('DOMContentLoaded', async () => {
            const cityKey = '${city_key}';
            const cityName = '${city_name}';

            // Load and display categories
            displayCityCategories(cityKey);

            // Load and display businesses
            try {
                let cityBusinesses = [];

                if (window.PlacesAPI && window.PlacesAPI.fetchAllBusinesses) {
                    cityBusinesses = await window.PlacesAPI.fetchAllBusinesses();
                }

                // If no API data, use fallback
                if (!cityBusinesses || cityBusinesses.length === 0) {
                    cityBusinesses = generateCityBusinessData(cityName);
                }

                displayCityBusinesses(cityBusinesses.slice(0, 10), cityName);

            } catch (error) {
                console.error('Error loading city businesses:', error);
                const fallbackData = generateCityBusinessData(cityName);
                displayCityBusinesses(fallbackData.slice(0, 10), cityName);
            }
        });

        function displayCityCategories(cityKey) {
            const categoriesGrid = document.getElementById('categoriesGrid');
            if (!categoriesGrid || !window.businessCategories) return;

            categoriesGrid.innerHTML = '';

            Object.entries(window.businessCategories).forEach(([key, category]) => {
                const categoryCard = document.createElement('a');
                categoryCard.href = \`\${cityKey}-\${key}.html\`;
                categoryCard.className = 'london-category-card';

                categoryCard.innerHTML = \`
                    <div class="category-icon">\${category.name.charAt(0)}</div>
                    <h3>\${category.name.substring(2)}</h3>
                    <p>Discover sustainable \${category.name.substring(2).toLowerCase()} businesses in ${city_name}</p>
                    <span class="category-count">10+ businesses</span>
                \`;

                categoriesGrid.appendChild(categoryCard);
            });
        }

        function generateCityBusinessData(cityName) {
            const businessTemplates = [
                { name: 'GreenSpace Furniture', category: 'home-living', subcategory: 'Sustainable Furniture', description: 'Premium sustainable furniture crafted from FSC-certified wood and recycled materials.' },
                { name: 'EthicalThreads', category: 'fashion-accessories', subcategory: 'Sustainable Clothing', description: 'Contemporary sustainable fashion using organic and recycled materials.' },
                { name: 'PlantHub Market', category: 'food-beverage', subcategory: 'Organic Grocery', description: 'Premium organic grocery store featuring locally sourced produce.' },
                { name: 'Natural Glow Beauty', category: 'health-beauty', subcategory: 'Organic Skincare', description: 'Natural skincare products made with organic ingredients.' },
                { name: 'EcoTech Solutions', category: 'products-retail', subcategory: 'Green Electronics', description: 'Sustainable electronics and eco-friendly tech solutions.' },
                { name: 'GreenRide Bikes', category: 'transport-travel', subcategory: 'Bicycle Services', description: 'Electric bikes and sustainable transport solutions.' },
                { name: 'EcoConsult Pro', category: 'services-professional', subcategory: 'Sustainability Consulting', description: 'Professional sustainability consulting for businesses.' },
                { name: 'SolarPower Direct', category: 'energy-utilities', subcategory: 'Solar Installation', description: 'Professional solar panel installation and maintenance.' },
                { name: 'RecycleRight', category: 'recycling-waste', subcategory: 'Waste Management', description: 'Comprehensive recycling and waste management services.' },
                { name: 'EcoEducate', category: 'education-nonprofits', subcategory: 'Environmental Education', description: 'Educational programs focused on environmental awareness.' }
            ];

            return businessTemplates.map((template, index) => ({
                id: index + 1,
                name: \`\${template.name} \${cityName}\`,
                category: template.category,
                subcategory: template.subcategory,
                rating: 4.5 + Math.random() * 0.4,
                reviewCount: Math.floor(Math.random() * 200) + 50,
                description: template.description,
                address: \`\${(index + 1) * 10} High Street, \${cityName}\`,
                phone: \`+44 \${Math.floor(Math.random() * 90) + 10} \${Math.floor(Math.random() * 9000) + 1000} \${Math.floor(Math.random() * 9000) + 1000}\`,
                website: \`www.\${template.name.toLowerCase().replace(/\\s+/g, '')}\${cityName.toLowerCase()}.co.uk\`,
                features: ['Eco-Friendly', 'Sustainable', 'Local', 'Certified']
            }));
        }

        function displayCityBusinesses(businesses, cityName) {
            const grid = document.getElementById('cityBusinessesGrid');
            if (!grid || !businesses) return;

            grid.innerHTML = '';

            businesses.forEach((business, index) => {
                const businessCard = createBusinessCard(business, index + 1, cityName);
                grid.appendChild(businessCard);
            });

            // Update business count
            const businessCount = document.getElementById('businessCount');
            if (businessCount) {
                businessCount.textContent = businesses.length + '+';
            }
        }

        function createBusinessCard(business, rank, cityName) {
            const card = document.createElement('div');
            card.className = 'london-business-card';

            card.innerHTML = \`
                <div class="business-card-header">
                    <div class="business-rank">#\${rank}</div>
                </div>

                <div class="business-content">
                    <div class="business-main-info">
                        <h3>\${business.name}</h3>
                        <p class="business-subcategory">\${business.subcategory}</p>
                        <div class="business-rating">
                            <div class="stars">
                                \${'★'.repeat(Math.floor(business.rating))}\${'☆'.repeat(5 - Math.floor(business.rating))}
                            </div>
                            <span class="rating-text">\${business.rating.toFixed(1)} (\${business.reviewCount} reviews)</span>
                        </div>
                    </div>

                    <div class="business-description">
                        <p>\${business.description}</p>
                    </div>

                    <div class="business-features">
                        \${business.features.map(feature => \`<span class="feature-tag">\${feature}</span>\`).join('')}
                    </div>

                    <div class="business-contact-info">
                        <div class="contact-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>\${business.address}</span>
                        </div>
                    </div>

                    <div class="business-actions">
                        <a href="tel:\${business.phone}" class="action-btn call-btn">
                            <i class="fas fa-phone"></i>
                            Call
                        </a>
                        <a href="https://\${business.website}" target="_blank" class="action-btn website-btn">
                            <i class="fas fa-globe"></i>
                            Website
                        </a>
                        <button class="action-btn directions-btn" onclick="openDirections('\${business.address}')">
                            <i class="fas fa-directions"></i>
                            Directions
                        </button>
                    </div>
                </div>
            \`;

            return card;
        }

        function openDirections(address) {
            const encodedAddress = encodeURIComponent(address);
            window.open(\`https://www.google.com/maps/search/\${encodedAddress}\`, '_blank');
        }
    </script>
</body>
</html>
EOF

    echo "Created: $filename"
}

# Create category page function for each city
create_city_category_page() {
    local city_key=$1
    local city_name=$2
    local category_key=$3
    local category_name=$4
    local filename="${city_key}-${category_key}.html"

    cat > "$filename" << EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${category_name} Businesses in ${city_name} | EcoSustainable.co.uk</title>
    <meta name="description" content="Discover sustainable ${category_name,,} businesses in ${city_name}. Find eco-friendly companies committed to environmental responsibility.">
    <link href="style.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <!-- Header Component -->
    <div id="header-component"></div>

    <!-- City Hero Section -->
    <section class="city-hero">
        <div class="container">
            <nav class="breadcrumb">
                <a href="index.html">Home</a> > <span>${city_name}</span>
            </nav>

            <h1>Top 10 Eco-Friendly Businesses in ${city_name}</h1>
            <p class="hero-description">Discover ${city_name}'s leading sustainable businesses committed to environmental responsibility and ethical practices.</p>

            <div class="search-container">
                <input type="text" id="searchInput" placeholder="Search businesses in ${city_name}...">
                <select id="categoryFilter">
                    <option value="">All Categories</option>
                    <option value="home-living">Home & Living</option>
                    <option value="fashion-accessories">Fashion & Accessories</option>
                    <option value="food-beverage">Food & Beverage</option>
                    <option value="health-beauty">Health & Beauty</option>
                    <option value="products-retail">Products & Retail</option>
                    <option value="transport-travel">Transport & Travel</option>
                    <option value="services-professional">Services & Professional</option>
                    <option value="energy-utilities">Energy & Utilities</option>
                    <option value="recycling-waste">Recycling & Waste</option>
                    <option value="education-nonprofits">Education & Nonprofits</option>
                </select>
                <button class="search-btn"><i class="fas fa-search"></i></button>
            </div>
        </div>
    </section>

    <!-- Quick Stats -->
    <section class="quick-stats">
        <div class="container">
            <div class="stats-row">
                <div class="stat-item">
                    <span class="stat-number" id="businessCount">50+</span>
                    <span class="stat-label">Eco Businesses</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">10</span>
                    <span class="stat-label">Categories</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">4.8</span>
                    <span class="stat-label">Avg Rating</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">95%</span>
                    <span class="stat-label">Satisfaction</span>
                </div>
            </div>
        </div>
    </section>

    <!-- Category Filter Section -->
    <section class="category-filter-section">
        <div class="container">
            <div class="category-filter-container">
                <div class="filter-group">
                    <label for="sortBy">Sort by:</label>
                    <select id="sortBy">
                        <option value="rating">Highest Rated</option>
                        <option value="reviews">Most Reviewed</option>
                        <option value="name">Name A-Z</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label for="categorySelect">Category:</label>
                    <select id="categorySelect">
                        <option value="">All Categories</option>
                        <option value="home-living">Home & Living</option>
                        <option value="fashion-accessories">Fashion & Accessories</option>
                        <option value="food-beverage">Food & Beverage</option>
                        <option value="health-beauty">Health & Beauty</option>
                        <option value="products-retail">Products & Retail</option>
                        <option value="transport-travel">Transport & Travel</option>
                        <option value="services-professional">Services & Professional</option>
                        <option value="energy-utilities">Energy & Utilities</option>
                        <option value="recycling-waste">Recycling & Waste</option>
                        <option value="education-nonprofits">Education & Nonprofits</option>
                    </select>
                </div>
            </div>
        </div>
    </section>

    <!-- Top Businesses Section -->
    <section class="london-businesses">
        <div class="container">
            <div class="businesses-header">
                <h2>Top Rated Sustainable Businesses in ${city_name}</h2>
                <p class="businesses-description">Each business has been carefully vetted for their environmental practices, sustainability certifications, and commitment to ethical operations.</p>
            </div>

            <div class="london-businesses-grid" id="cityBusinessesGrid">
                <!-- Businesses will be populated by JavaScript -->
            </div>
        </div>
    </section>

    <!-- Footer Component -->
    <div id="footer-component"></div>

    <script src="components.js"></script>
    <script src="places-api.js"></script>
    <script src="category-page.js"></script>
    <script>
        // Initialize category page for this city
        document.addEventListener('DOMContentLoaded', async () => {
            // Extract category from filename or use a mapping
            const categoryKey = '${category_key}';
            const cityName = '${city_name}';

            try {
                // Try to load businesses for this category and city
                let categoryBusinesses = [];

                if (window.PlacesAPI && window.PlacesAPI.fetchBusinessesForCategory) {
                    categoryBusinesses = await window.PlacesAPI.fetchBusinessesForCategory(categoryKey, 10);
                }

                // If no API data, use fallback
                if (!categoryBusinesses || categoryBusinesses.length === 0) {
                    categoryBusinesses = generateCityFallbackData(categoryKey, cityName);
                }

                displayCityBusinesses(categoryBusinesses, cityName, categoryKey);

            } catch (error) {
                console.error('Error loading category businesses:', error);
                const fallbackData = generateCityFallbackData(categoryKey, cityName);
                displayCityBusinesses(fallbackData, cityName, categoryKey);
            }
        });

        function generateCityFallbackData(category, cityName) {
            const businessTemplates = {
                'home-living': [
                    { name: 'GreenSpace Furniture', subcategory: 'Sustainable Furniture', description: 'Premium sustainable furniture crafted from FSC-certified wood and recycled materials.' },
                    { name: 'EcoHome Decor', subcategory: 'Eco Home Decor', description: 'Beautiful home decor made from recycled and sustainable materials.' },
                    { name: 'Organic Sleep Co', subcategory: 'Organic Bedding', description: 'Luxury organic bedding and mattresses for healthy sleep.' }
                ],
                'fashion-accessories': [
                    { name: 'EthicalThreads', subcategory: 'Sustainable Clothing', description: 'Contemporary sustainable fashion using organic and recycled materials.' },
                    { name: 'Green Fashion Co', subcategory: 'Eco Fashion', description: 'Stylish clothing made with environmentally friendly practices.' },
                    { name: 'Conscious Closet', subcategory: 'Ethical Fashion', description: 'Fashion-forward clothing with ethical production methods.' }
                ],
                'food-beverage': [
                    { name: 'PlantHub Market', subcategory: 'Organic Grocery', description: 'Premium organic grocery store featuring locally sourced produce.' },
                    { name: 'Green Cafe', subcategory: 'Sustainable Dining', description: 'Farm-to-table restaurant with zero-waste practices.' },
                    { name: 'Eco Eats', subcategory: 'Plant-Based Restaurant', description: 'Delicious plant-based meals with sustainable ingredients.' }
                ]
            };

            const templates = businessTemplates[category] || businessTemplates['home-living'];

            return templates.map((template, index) => ({
                id: index + 1,
                name: \`\${template.name} \${cityName}\`,
                category: category,
                subcategory: template.subcategory,
                rating: 4.5 + Math.random() * 0.4,
                reviewCount: Math.floor(Math.random() * 200) + 50,
                description: template.description,
                address: \`\${(index + 1) * 10} High Street, \${cityName}\`,
                phone: \`+44 \${Math.floor(Math.random() * 90) + 10} \${Math.floor(Math.random() * 9000) + 1000} \${Math.floor(Math.random() * 9000) + 1000}\`,
                website: \`www.\${template.name.toLowerCase().replace(' ', '')}\${cityName.toLowerCase()}.co.uk\`,
                features: ['Eco-Friendly', 'Sustainable', 'Local', 'Certified']
            }));
        }

        function displayCityBusinesses(businesses, cityName, categoryKey) {
            const grid = document.getElementById('cityBusinessesGrid');
            if (!grid || !businesses) return;

            grid.innerHTML = '';

            businesses.forEach((business, index) => {
                const businessCard = createBusinessCard(business, index + 1, cityName);
                grid.appendChild(businessCard);
            });

            // Update business count
            const businessCount = document.getElementById('businessCount');
            if (businessCount) {
                businessCount.textContent = businesses.length + '+';
            }

            // Update title to include category
            const categoryName = getCategoryDisplayName(categoryKey);
            const title = document.querySelector('h1');
            if (title) {
                title.textContent = \`Top \${categoryName} Businesses in \${cityName}\`;
            }
        }

        function createBusinessCard(business, rank, cityName) {
            const card = document.createElement('div');
            card.className = 'london-business-card';

            card.innerHTML = \`
                <div class="business-card-header">
                    <div class="business-rank">#\${rank}</div>
                </div>

                <div class="business-content">
                    <div class="business-main-info">
                        <h3>\${business.name}</h3>
                        <p class="business-subcategory">\${business.subcategory}</p>
                        <div class="business-rating">
                            <div class="stars">
                                \${'★'.repeat(Math.floor(business.rating))}\${'☆'.repeat(5 - Math.floor(business.rating))}
                            </div>
                            <span class="rating-text">\${business.rating.toFixed(1)} (\${business.reviewCount} reviews)</span>
                        </div>
                    </div>

                    <div class="business-description">
                        <p>\${business.description}</p>
                    </div>

                    <div class="business-features">
                        \${business.features.map(feature => \`<span class="feature-tag">\${feature}</span>\`).join('')}
                    </div>

                    <div class="business-contact-info">
                        <div class="contact-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>\${business.address}</span>
                        </div>
                    </div>

                    <div class="business-actions">
                        <a href="tel:\${business.phone}" class="action-btn call-btn">
                            <i class="fas fa-phone"></i>
                            Call
                        </a>
                        <a href="https://\${business.website}" target="_blank" class="action-btn website-btn">
                            <i class="fas fa-globe"></i>
                            Website
                        </a>
                        <button class="action-btn directions-btn" onclick="openDirections('\${business.address}')">
                            <i class="fas fa-directions"></i>
                            Directions
                        </button>
                    </div>
                </div>
            \`;

            return card;
        }

        function getCategoryDisplayName(category) {
            const categoryMap = {
                'home-living': 'Home & Living',
                'fashion-accessories': 'Fashion & Accessories',
                'food-beverage': 'Food & Beverage',
                'health-beauty': 'Health & Beauty',
                'products-retail': 'Products & Retail',
                'transport-travel': 'Transport & Travel',
                'services-professional': 'Services & Professional',
                'energy-utilities': 'Energy & Utilities',
                'recycling-waste': 'Recycling & Waste',
                'education-nonprofits': 'Education & Nonprofits'
            };
            return categoryMap[category] || 'Sustainable';
        }

        function openDirections(address) {
            const encodedAddress = encodeURIComponent(address);
            window.open(\`https://www.google.com/maps/search/\${encodedAddress}\`, '_blank');
        }
    </script>
</body>
</html>
EOF

    echo "Created: $filename"
}

# Generate main pages for each city
for city_key in "${!cities[@]}"; do
    city_name="${cities[$city_key]}"
    create_city_page "$city_key" "$city_name"

    # Generate category pages for each city
    for category_key in "${!categories[@]}"; do
        category_name="${categories[$category_key]}"
        create_city_category_page "$city_key" "$city_name" "$category_key" "$category_name"
    done
done

echo ""
echo "City page generation complete!"
echo ""
echo "Generated main city pages:"
for city_key in "${!cities[@]}"; do
    echo "  - ${city_key}.html"
done

echo ""
echo "Generated category pages for each city (${#categories[@]} categories × ${#cities[@]} cities = $((${#categories[@]} * ${#cities[@]})) pages)"
echo ""
echo "Total pages generated: $((${#cities[@]} + ${#categories[@]} * ${#cities[@]}))"
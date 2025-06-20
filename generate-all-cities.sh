
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
            
            <div class="city-hero-content">
                <h1>Eco-Friendly Businesses in ${city_name}</h1>
                <p class="hero-description">
                    Discover ${city_name}'s leading sustainable businesses committed to environmental responsibility. 
                    From organic cafes to green energy providers, find ethical companies that align with your values.
                </p>
                
                <div class="city-stats">
                    <div class="stat">
                        <span class="stat-number">50+</span>
                        <span class="stat-label">Eco Businesses</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">10</span>
                        <span class="stat-label">Categories</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">100%</span>
                        <span class="stat-label">Verified Green</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Categories Section -->
    <section class="london-categories">
        <div class="container">
            <h2>Business Categories in ${city_name}</h2>
            <p class="section-description">Explore sustainable businesses across different categories in ${city_name}</p>
            
            <div class="london-categories-grid">
                <a href="${city_key}-home-living.html" class="london-category-card">
                    <h3>Home & Living</h3>
                    <p>Sustainable furniture, eco-friendly home goods, green cleaning</p>
                    <span class="category-count">Coming Soon</span>
                </a>
                
                <a href="${city_key}-fashion-accessories.html" class="london-category-card">
                    <h3>Fashion & Accessories</h3>
                    <p>Ethical clothing, sustainable fashion, eco-friendly accessories</p>
                    <span class="category-count">Coming Soon</span>
                </a>
                
                <a href="${city_key}-food-beverage.html" class="london-category-card">
                    <h3>Food & Beverage</h3>
                    <p>Organic restaurants, zero-waste cafes, sustainable catering</p>
                    <span class="category-count">Coming Soon</span>
                </a>
                
                <a href="${city_key}-health-beauty.html" class="london-category-card">
                    <h3>Health & Beauty</h3>
                    <p>Organic skincare, natural haircare, cruelty-free products</p>
                    <span class="category-count">Coming Soon</span>
                </a>
                
                <a href="${city_key}-products-retail.html" class="london-category-card">
                    <h3>Products & Retail</h3>
                    <p>Eco packaging, reusable products, green electronics</p>
                    <span class="category-count">Coming Soon</span>
                </a>
                
                <a href="${city_key}-transport-travel.html" class="london-category-card">
                    <h3>Transport & Travel</h3>
                    <p>Electric vehicles, bike rentals, eco travel agencies</p>
                    <span class="category-count">Coming Soon</span>
                </a>
                
                <a href="${city_key}-services-professional.html" class="london-category-card">
                    <h3>Services & Professional</h3>
                    <p>Green web hosting, eco designers, sustainable events</p>
                    <span class="category-count">Coming Soon</span>
                </a>
                
                <a href="${city_key}-energy-utilities.html" class="london-category-card">
                    <h3>Energy & Utilities</h3>
                    <p>Renewable energy, green utilities, solar installations</p>
                    <span class="category-count">Coming Soon</span>
                </a>
                
                <a href="${city_key}-recycling-waste.html" class="london-category-card">
                    <h3>Recycling & Waste Management</h3>
                    <p>Zero waste solutions, recycling services, waste reduction</p>
                    <span class="category-count">Coming Soon</span>
                </a>
                
                <a href="${city_key}-education-nonprofits.html" class="london-category-card">
                    <h3>Education & Nonprofits</h3>
                    <p>Environmental education, green nonprofits, sustainability training</p>
                    <span class="category-count">Coming Soon</span>
                </a>
            </div>
        </div>
    </section>

    <!-- Coming Soon Notice -->
    <section class="coming-soon-notice">
        <div class="container">
            <div class="notice-content">
                <h2>Building ${city_name}'s Eco Directory</h2>
                <p>We're currently curating the best sustainable businesses in ${city_name}. Our team is working to verify each company's environmental credentials and commitment to sustainability.</p>
                <div class="notice-features">
                    <div class="feature">
                        <i class="fas fa-leaf"></i>
                        <span>Verified eco-friendly businesses</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-star"></i>
                        <span>Quality ratings and reviews</span>
                    </div>
                    <div class="feature">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>Local ${city_name} businesses</span>
                    </div>
                </div>
                <p class="launch-info">Expected launch: <strong>Spring 2024</strong></p>
            </div>
        </div>
    </section>

    <!-- Explore Other Cities -->
    <section class="explore-cities">
        <div class="container">
            <h2>Explore Eco Businesses in Other Cities</h2>
            <p>While we're building ${city_name}'s directory, explore our complete London directory:</p>
            <div class="city-links">
                <a href="london.html" class="featured-city-link">
                    <i class="fas fa-city"></i>
                    <span>London - Full Directory Available</span>
                </a>
                <a href="index.html" class="btn-secondary">View All Cities</a>
            </div>
        </div>
    </section>

    <!-- Footer Component -->
    <div id="footer-component"></div>

    <script src="components.js"></script>
    <script src="script.js"></script>
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

    <!-- Coming Soon Hero -->
    <section class="category-hero">
        <div class="container">
            <nav class="breadcrumb">
                <a href="index.html">Home</a> > 
                <a href="${city_key}.html">${city_name}</a> > 
                <span>${category_name}</span>
            </nav>
            
            <h1>${category_name} Businesses in ${city_name}</h1>
            <div class="coming-soon-banner">
                <h2>Coming Soon!</h2>
                <p>We're curating the best sustainable ${category_name,,} businesses in ${city_name}.</p>
                <p>Meanwhile, explore our complete London directory:</p>
                <a href="london-${category_key}.html" class="btn-primary">View ${category_name} in London</a>
            </div>
        </div>
    </section>

    <!-- Footer Component -->
    <div id="footer-component"></div>

    <script src="components.js"></script>
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

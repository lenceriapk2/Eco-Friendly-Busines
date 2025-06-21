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
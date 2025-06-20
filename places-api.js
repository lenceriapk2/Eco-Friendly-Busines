// Google Places API Service

const API_KEY = 'AIzaSyBI8EyLj0eptyl6WcdhgiFaHdnWes-6NKE';
const PLACES_API_BASE = 'https://places.googleapis.com/v1/places';

// Business category mappings to search queries
const categorySearchQueries = {
    'home-living': [
        'sustainable furniture London',
        'organic bedding London',
        'eco home decor London',
        'zero waste home goods London',
        'recycled homeware London',
        'eco friendly cleaning products London'
    ],
    'fashion-accessories': [
        'sustainable clothing London',
        'ethical footwear London',
        'organic cotton apparel London',
        'upcycled fashion London',
        'vegan bags accessories London',
        'slow fashion brands London'
    ],
    'food-beverage': [
        'organic grocery stores London',
        'vegan restaurants London',
        'zero waste cafes London',
        'sustainable farms London',
        'local food co-ops London',
        'eco packaging suppliers London'
    ],
    'health-beauty': [
        'organic skincare London',
        'natural haircare London',
        'zero waste beauty London',
        'refillable cosmetics London',
        'cruelty free perfumes London',
        'eco toothpaste London'
    ],
    'products-retail': [
        'eco packaging suppliers London',
        'reusable products London',
        'recycled stationery London',
        'green electronics London',
        'sustainable toys London'
    ],
    'transport-travel': [
        'electric vehicle services London',
        'bicycle shops London',
        'eco travel agencies London',
        'green hotels London',
        'sustainable outdoor gear London'
    ],
    'services-professional': [
        'green web hosting London',
        'eco interior designers London',
        'sustainable event planners London',
        'eco cleaning services London',
        'ethical marketing agencies London',
        'carbon offset providers London'
    ],
    'energy-utilities': [
        'solar panel installers London',
        'wind energy companies London',
        'home energy auditors London',
        'green utility providers London',
        'battery storage solutions London'
    ],
    'recycling-waste': [
        'e-waste recycling London',
        'textile recycling London',
        'composting services London',
        'thrift stores London',
        'circular economy platforms London'
    ],
    'education-nonprofits': [
        'environmental NGOs London',
        'sustainable living blogs London',
        'climate education London',
        'eco workshops London',
        'green certifications London'
    ]
};

// Text Search API function
async function searchPlaces(query, location = 'London, UK') {
    try {
        const searchQuery = `${query} in ${location}`;
        const response = await fetch(`${PLACES_API_BASE}:searchText`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': API_KEY,
                'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.websiteUri,places.nationalPhoneNumber,places.businessStatus,places.types,places.primaryType'
            },
            body: JSON.stringify({
                textQuery: searchQuery,
                maxResultCount: 20,
                locationBias: {
                    circle: {
                        center: {
                            latitude: 51.5074,
                            longitude: -0.1278
                        },
                        radius: 50000.0
                    }
                }
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.places || [];
    } catch (error) {
        console.error('Error searching places:', error);
        return [];
    }
}

// Get detailed place information
async function getPlaceDetails(placeId) {
    try {
        const response = await fetch(`${PLACES_API_BASE}/${placeId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': API_KEY,
                'X-Goog-FieldMask': 'id,displayName,formattedAddress,rating,userRatingCount,websiteUri,nationalPhoneNumber,businessStatus,types,primaryType,editorialSummary,photos'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error getting place details:', error);
        return null;
    }
}

// Transform API data to our business format
function transformPlaceToBusinessFormat(place, category, subcategory) {
    const categoryImages = {
        'home-living': [
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&h=300&fit=crop&crop=center'
        ],
        'fashion-accessories': [
            'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=300&fit=crop&crop=center'
        ],
        'food-beverage': [
            'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=300&fit=crop&crop=center'
        ],
        'health-beauty': [
            'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&h=300&fit=crop&crop=center'
        ],
        'products-retail': [
            'https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center'
        ],
        'transport-travel': [
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=300&fit=crop&crop=center'
        ],
        'services-professional': [
            'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1560472355-109703aa3edc?w=400&h=300&fit=crop&crop=center'
        ],
        'energy-utilities': [
            'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop&crop=center'
        ],
        'recycling-waste': [
            'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center'
        ],
        'education-nonprofits': [
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&crop=center'
        ]
    };

    const features = generateFeatures(place, category);
    const randomImageIndex = Math.floor(Math.random() * (categoryImages[category]?.length || 1));
    const defaultImage = 'https://images.unsplash.com/photo-1560472355-109703aa3edc?w=400&h=300&fit=crop&crop=center';

    return {
        id: place.id,
        name: place.displayName?.text || 'Business Name',
        category: category,
        subcategory: subcategory,
        rating: place.rating || 4.5,
        reviewCount: place.userRatingCount || 0,
        description: place.editorialSummary?.text || generateDescription(place, subcategory),
        address: place.formattedAddress || 'London, UK',
        phone: place.nationalPhoneNumber || '+44 20 7946 0000',
        website: cleanWebsiteUrl(place.websiteUri) || 'www.example.co.uk',
        image: categoryImages[category]?.[randomImageIndex] || defaultImage,
        features: features,
        businessStatus: place.businessStatus || 'OPERATIONAL'
    };
}

// Generate features based on category and business type
function generateFeatures(place, category) {
    const categoryFeatures = {
        'home-living': ['Sustainable Materials', 'Eco-Friendly', 'Local Sourcing', 'Zero Waste'],
        'fashion-accessories': ['Organic Materials', 'Fair Trade', 'Sustainable Fashion', 'Ethical Production'],
        'food-beverage': ['Organic Ingredients', 'Plant-Based Options', 'Local Sourcing', 'Zero Waste'],
        'health-beauty': ['Natural Ingredients', 'Cruelty-Free', 'Organic Certified', 'Sustainable Packaging'],
        'products-retail': ['Eco-Friendly', 'Recyclable', 'Sustainable', 'Green Technology'],
        'transport-travel': ['Electric Powered', 'Carbon Neutral', 'Sustainable Transport', 'Eco-Friendly'],
        'services-professional': ['Green Practices', 'Sustainable Solutions', 'Eco-Conscious', 'Carbon Offset'],
        'energy-utilities': ['Renewable Energy', 'Energy Efficient', 'Green Technology', 'Sustainable Power'],
        'recycling-waste': ['Waste Reduction', 'Recycling', 'Circular Economy', 'Environmental Impact'],
        'education-nonprofits': ['Environmental Education', 'Sustainability Training', 'Green Certification', 'Climate Action']
    };

    return categoryFeatures[category] || ['Eco-Friendly', 'Sustainable', 'Green', 'Environmental'];
}

// Generate description based on business type
function generateDescription(place, subcategory) {
    const descriptions = {
        'Sustainable Furniture': 'Eco-friendly furniture made from sustainable materials with a focus on environmental responsibility.',
        'Organic Bedding & Mattresses': 'Premium organic bedding and mattresses for healthy, sustainable sleep.',
        'Sustainable Clothing Brands': 'Ethical fashion brand committed to sustainable practices and fair trade.',
        'Plant-Based & Vegan Restaurants': 'Delicious plant-based cuisine promoting sustainable eating habits.',
        'Organic Skincare Brands': 'Natural, organic skincare products free from harmful chemicals.',
        'Electric Vehicle (EV) Services': 'Professional electric vehicle services promoting sustainable transportation.',
        'Eco Interior Designers': 'Sustainable interior design services using eco-friendly materials and practices.',
        'Solar Panel Installers': 'Professional solar panel installation services for renewable energy solutions.',
        'E-Waste Recycling': 'Responsible electronic waste recycling services for environmental protection.',
        'Environmental NGOs': 'Non-profit organization dedicated to environmental protection and sustainability education.'
    };

    return descriptions[subcategory] || 'Sustainable business committed to environmental responsibility and eco-friendly practices.';
}

// Clean website URL
function cleanWebsiteUrl(url) {
    if (!url) return null;
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

// Fetch businesses for a specific category
async function fetchBusinessesForCategory(category, limit = 10) {
    const queries = categorySearchQueries[category] || [];
    const businesses = [];
    const seenIds = new Set();

    for (const query of queries) {
        if (businesses.length >= limit) break;

        const places = await searchPlaces(query);

        for (const place of places) {
            if (businesses.length >= limit) break;
            if (seenIds.has(place.id)) continue;
            if (place.businessStatus !== 'OPERATIONAL') continue;

            seenIds.add(place.id);

            const subcategory = window.EcoComponents.businessCategories[category]?.subcategories?.[0] || 'General';
            const business = transformPlaceToBusinessFormat(place, category, subcategory);
            businesses.push(business);
        }

        // Add delay to respect API rate limits
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    return businesses;
}

// Fetch all businesses for all categories
async function fetchAllLondonBusinesses() {
    const allBusinesses = [];
    const categories = Object.keys(categorySearchQueries);

    for (const category of categories) {
        console.log(`Fetching businesses for ${category}...`);
        const businesses = await fetchBusinessesForCategory(category, 10);
        allBusinesses.push(...businesses);

        // Add delay between categories
        await new Promise(resolve => setTimeout(resolve, 200));
    }

    return allBusinesses;
}

// Export functions
window.PlacesAPI = {
    searchPlaces,
    getPlaceDetails,
    fetchBusinessesForCategory,
    fetchAllLondonBusinesses,
    transformPlaceToBusinessFormat
};
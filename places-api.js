
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
    const categoryIcons = {
        'home-living': '🏠',
        'fashion-accessories': '👗',
        'food-beverage': '🍽️',
        'health-beauty': '🌿',
        'products-retail': '🛠️',
        'transport-travel': '🚲',
        'services-professional': '🏢',
        'energy-utilities': '🔌',
        'recycling-waste': '♻️',
        'education-nonprofits': '🌍'
    };

    const features = generateFeatures(place, category);
    
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
        image: categoryIcons[category] || '🏢',
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

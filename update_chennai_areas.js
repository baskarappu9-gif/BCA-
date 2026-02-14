
const fs = require('fs');
const path = require('path');

const locationsFile = 'c:/Users/sl/OneDrive/Documents/bca/pricewatch/frontend/src/utils/locations.json';
const locations = JSON.parse(fs.readFileSync(locationsFile, 'utf8'));

// User provided areas for Chennai
const newAreas = [
    // North Chennai
    'Washermenpet', 'Royapuram', 'Perambur', 'Pulianthope', 'Vyasarpadi', 'Tondiarpet',
    'Basin Bridge', 'Broadway', 'Mannadi', 'Sembiam', 'MKB Nagar', 'Peravallur',
    'Madhavaram', 'Manali', 'Manali New Town', 'Athipattu', 'Ennore', 'Minjur',
    'Ponneri', 'Sholavaram', 'Red Hills', 'Puzhal', 'Mathur',

    // Central Chennai
    'Anna Nagar', 'Egmore', 'Nungambakkam', 'T. Nagar', 'Mylapore', 'Triplicane',
    'Chetpet', 'Gopalapuram', 'Royapettah', 'Choolaimedu', 'Kodambakkam', 'Aminjikarai',
    'Ayanavaram', 'Purasawalkam', 'Vadapalani', 'Saligramam', 'Virugambakkam',
    'MGR Nagar', 'Saidapet',

    // South Chennai
    'Adyar', 'Besant Nagar', 'Thiruvanmiyur', 'Kotturpuram', 'Velachery', 'Madipakkam',
    'Alandur', 'Guindy', 'Nanganallur', 'Pallavaram', 'Chromepet', 'Tambaram',
    'Selaiyur', 'Hastinapuram', 'Keelkattalai', 'Kovilambakkam', 'Medavakkam',
    'Perungudi', 'Thoraipakkam', 'Sholinganallur', 'Injambakkam', 'Neelankarai',
    'Palavakkam', 'Kottivakkam', 'Kanathur', 'Kelambakkam', 'Kovalam', 'Siruseri',

    // West Chennai
    'Ambattur', 'Avadi', 'Mogappair', 'Nolambur', 'Maduravoyal', 'Porur',
    'Poonamallee', 'Kundrathur', 'Mangadu', 'Alwarthirunagar', 'Valasaravakkam',
    'Ayappakkam', 'Korattur', 'Padi', 'Thirumangalam'
];

const stateKey = 'Tamil Nadu';
const districtKey = 'Chennai';

if (!locations[stateKey]) {
    locations[stateKey] = {};
}

if (!locations[stateKey][districtKey]) {
    locations[stateKey][districtKey] = [];
}

// Merge new areas, removing duplicates
const existingAreas = locations[stateKey][districtKey];
const allAreas = [...new Set([...existingAreas, ...newAreas])].sort();

locations[stateKey][districtKey] = allAreas;

fs.writeFileSync(locationsFile, JSON.stringify(locations, null, 2));
console.log(`Updated Chennai locations with ${newAreas.length} new areas. Total: ${allAreas.length}`);

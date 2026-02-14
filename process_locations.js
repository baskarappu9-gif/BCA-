
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Use the new dataset
const inputFile = 'c:/Users/sl/OneDrive/Documents/bca/India_Dataset_100_Percent_Real_Areas.csv';
const outputFile = 'c:/Users/sl/OneDrive/Documents/bca/pricewatch/frontend/src/utils/locations.json';

const locations = {};

fs.createReadStream(inputFile)
    .pipe(csv())
    .on('data', (row) => {
        // Map CSV columns to our hierarchy
        // State -> State
        // District Dropdown -> City Column (e.g. Kakinada, Bangalore)
        // Area Dropdown -> Area Column (e.g. Old Town, Whitefield)

        const state = row.State ? row.State.trim() : null;
        const city = row.City ? row.City.trim() : null; // Mapping City column to 'District' level
        const area = row.Area ? row.Area.trim() : null; // Mapping Area column to 'Area' level

        if (state && city && area) {
            if (!locations[state]) {
                locations[state] = {};
            }
            if (!locations[state][city]) {
                locations[state][city] = [];
            }
            // Avoid duplicates
            if (!locations[state][city].includes(area)) {
                locations[state][city].push(area);
            }
        }
    })
    .on('end', () => {
        // Sort keys alphabetically for better UX
        const sortedLocations = {};
        Object.keys(locations).sort().forEach(state => {
            sortedLocations[state] = {};
            Object.keys(locations[state]).sort().forEach(city => {
                sortedLocations[state][city] = locations[state][city].sort();
            });
        });

        fs.writeFileSync(outputFile, JSON.stringify(sortedLocations, null, 2));
        console.log(`Successfully generated ${outputFile}`);
        console.log(`Includes ${Object.keys(sortedLocations).length} states.`);
    });

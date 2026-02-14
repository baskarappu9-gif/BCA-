
const fs = require('fs');

try {
    const content = fs.readFileSync('c:/Users/sl/OneDrive/Documents/bca/India_Dataset_100_Percent_Real_Areas.csv', 'utf-8');
    const lines = content.split('\n');

    // Log headers
    const header = lines[0].split(',');
    console.log('--- Headers ---');
    header.forEach((h, i) => console.log(`${i}: ${h.trim()}`));

    // Log first few rows
    console.log('--- First 3 Rows ---');
    for (let i = 1; i <= 3; i++) {
        if (lines[i]) {
            // Handle simple CSV splitting (not robust for quoted commas, but good for quick check)
            const row = lines[i].split(',');
            console.log(`Row ${i}:`, row);
        }
    }
} catch (error) {
    console.error("Error reading file:", error);
}


const fs = require('fs');

const content = fs.readFileSync('c:/Users/sl/OneDrive/Documents/bca/India_Complete_Dataset.csv', 'utf-8');
const lines = content.split('\n');

const header = lines[0].split(',');
console.log('--- Headers ---');
header.forEach((h, i) => console.log(`${i}: ${h}`));

const row1 = lines[1].split(',');
console.log('--- Row 1 ---');
row1.forEach((val, i) => console.log(`${i}: ${val}`));

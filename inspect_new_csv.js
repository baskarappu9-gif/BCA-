
const fs = require('fs');
const csv = require('csv-parser');

const results = [];

fs.createReadStream('c:/Users/sl/OneDrive/Documents/bca/India_Dataset_100_Percent_Real_Areas.csv')
    .pipe(csv())
    .on('data', (data) => {
        if (results.length < 3) {
            results.push(data);
        }
    })
    .on('end', () => {
        console.log('Headers:', Object.keys(results[0]));
        console.log('First Row:', results[0]);
        console.log('Second Row:', results[1]);
    });

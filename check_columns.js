
const fs = require('fs');
const csv = require('csv-parser');

const results = [];

fs.createReadStream('c:/Users/sl/OneDrive/Documents/bca/India_Dataset_100_Percent_Real_Areas.csv')
    .pipe(csv())
    .on('data', (data) => {
        if (results.length < 5) {
            console.log({
                State: data.State,
                District: data.District,
                City: data.City,
                Area: data.Area
            });
            results.push(data);
        }
    });

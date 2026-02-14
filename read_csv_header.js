
const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
    const fileStream = fs.createReadStream('c:/Users/sl/OneDrive/Documents/bca/India_Complete_Dataset.csv');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let count = 0;
    for await (const line of rl) {
        const cols = line.split(','); // Assuming comma separated
        console.log(`Row ${count}:`, cols);
        count++;
        if (count >= 5) break;
    }
}

processLineByLine();

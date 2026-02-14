
const fs = require('fs');

const fd = fs.openSync('c:/Users/sl/OneDrive/Documents/bca/India_Complete_Dataset.csv', 'r');
const buffer = Buffer.alloc(1000);
fs.readSync(fd, buffer, 0, 1000, 0);
console.log(buffer.toString());
fs.closeSync(fd);

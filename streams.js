const fs = require('fs');

const readStream = fs.createReadStream('./docs/blog3.txt', { encoding: 'utf8' });
const writeStream = fs.createWriteStream('./docs/blog4.txt');


// this is just a complex way of doing a pipe's functionality

/* readStream.on('data', (chunk) => {
         console.log('----- NEW CHUNK -----');
     console.log(chunk);

     writeStream.write('\nNEW CHUNK\n');
     writeStream.write(chunk);
 })
*/


// easy way (piping)
readStream.pipe(writeStream);



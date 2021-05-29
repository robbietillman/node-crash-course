/* outdated file that showed node functionality (hard way)
    now we use express for backend
*/
const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
     
    // lodash
     const num = _.random(0,20);
     console.log(num);

     const greet = _.once(() => {
         console.log('hello');
     })

     greet();

    // Set header content type being sent back to the browser
    res.setHeader('Content-Type', 'text/html');

    let path = './views/';
    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
            case '/about-us':
            res.setHeader('Location', '/about');
            res.end();
            res.statusCode = 301;
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }
    
    // Writing whatever content you want to send back to the browser

    // send an html file
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            res.write(data);
            res.end();

            // If you only have one request, you can say res.end(data) instad of above
        }
    })

    // Ending the response, which then sends the response to the browser
    // res.end();
});

server.listen(3000, 'localhost', () =>{
    console.log('listening for requests on port 3000');
});





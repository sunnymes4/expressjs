const http = require('http');
const fs = require('fs');
const url = require('url');

// nodemon is important for auto refreshing the server for any new change

const myserver = http.createServer((req, res) => {


    console.log(url.parse(req.url)); // because of localhost not all the value would be populated

    // to send back some response for the request coming from 8001 server
    // res.end('The server is running successfully  nodemon test')

    const parsedUrl = url.parse(req.url, true) // true is for parse the url with query params into object
    const log = `${req.url} request received\n`;
    
    fs.appendFile('log.txt', log, (err, data) => {
        switch(parsedUrl.pathname) {
            case '/' : res.end('This is my homepage');
            break;
    
            case '/about' : res.end('This is my About page');
            break;

            case '/products' :
                const parsed = parsedUrl.query.shoe;
                res.end('This is my Products page ' + parsed);
                break;
    
            default : res.end('Page not found');
        }
    })
    
});

myserver.listen(8001, () => {
    console.log('My server is running at port 8001')
})
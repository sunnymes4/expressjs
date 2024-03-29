const http = require('http');


const myserver = http.createServer((req, res) => {
    // to send back some response for the request coming from 8001 server
    res.end('The server is running successfully')
});

myserver.listen(8001, () => {
    console.log('My server is running at port 8001')
})
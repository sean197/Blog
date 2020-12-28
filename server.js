const http = require("http");
const fs = require("fs");
const _ = require("lodash");

// Method used to create server
// req: eg. url that is being requested, the request type etc.
// res: response object we use to send response to user
const server = http.createServer((req, res) => {
    // console.log(req.url, req.method);

    // Set header content type
    // We're sending back plain text to browser
    // res.setHeader("Content-Type", "text/html");

    // // Sending the text to browser
    // res.write("<p>hello, ninjas</p>");
    // res.write("<p>hello again, ninjas</p>");

    // // Ending response and sends it to browser
    // res.end();

    // lodash
    const num = _.random(0,20);
    console.log(num);

    // Funtion only appears once
    const greet =  _.once(() => {
        console.log("hello");
    });

    greet();
    greet();

    let path = './views/';
    switch(req.url) {
        case "/":
            path += "index.html";
            res.statusCode = 200;
            break;
        case "/about":
            path += "about.html";
            res.statusCode = 200;
            break;
        case "/about-us":
            res.statusCode = 301;
            res.setHeader("Location", "/about");
            res.end();
            break;
        default:
            path += "404.html";
            res.statusCode = 404;
            break;
    }

    // Send a html file
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            // res.write(data);
            // res.end();
            res.end(data);
        }
    })
});

server.listen(3000, "localhost", () => {
    console.log("We are listening for requests on port 300"); 
}); 
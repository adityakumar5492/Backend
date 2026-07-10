const http = require('http'); // Import the built-in HTTP module to create an HTTP server.

const fs = require('fs'); // Import the built-in File System module to work with the file system.
const url = require('url'); // Import the built-in URL module to parse URLs.

const myServer = http.createServer((req,res)=>{ 
    if(req.url === "/favicon.ico") return res.end();
    const log  = `${Date.now()}: ${req.url} New request received\n`; // Create a log entry with the current timestamp and the requested URL.
    const myUrl = url.parse(req.url,true); // Parse the requested URL and store it in the myUrl variable.
    console.log(myUrl); // Log the parsed URL object to the console for debugging purposes. 

    fs.appendFile("log.txt", log,(err,data) => {
       switch(myUrl.pathname){
        case "/":
            res.end("HOME PAGE");
            break;
        case "/about":
            const username = myUrl.query.myname; // Extract the query parameters from the parsed URL object.
            res.end(`hi,${username}`); // Send a response with the username.
            break;
        default:
            res.end("404 PAGE NOT FOUND");
        }
    });
});


myServer.listen(8000, () => { 
    console.log("server started");
    console.log("Server is running on port 8000");
});
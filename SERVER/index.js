const http = require('http'); // Import the built-in HTTP module to create an HTTP server.

const fs = require('fs'); // Import the built-in File System module to work with the file system.


const myServer = http.createServer((req,res)=>{ // Create an HTTP server that listens for incoming requests and sends responses.
    // console.log("Request received from the client");
    // console.log(req); // it gives the details of the request made by the client, including headers, method, and URL.

    const log = `${Date.now()}:New req received\n`; // Create a log message with the current timestamp and a message indicating that a new request has been received.
    fs.appendFile('server.log', log, (err,data) => { // Append the log message to a file named 'server.log'. If the file doesn't exist, it will be created.
        res.end("Hello World!"); // Send a response back to the client with the message "Hello World!".

    });


    res.end("Hello World!"); // Send a response back to the client with the message "Hello World!".

})

//one port can be used by only one server at a time. If you try to run another server on the same port, it will throw an error.
myServer.listen(8000, () => { // Start the server and have it listen on port 8000 for incoming requests.
    console.log("server started");
    console.log("Server is running on port 8000");
});
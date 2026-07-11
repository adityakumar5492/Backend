// const http = require('http');
const express = require('express');

const app = express();

//route handler for the root URL ("/") that sends a response back to the client with the message "Hello from home page".
app.get('/', (req, res) => {
  res.send('Hello from home page');
});

app.get('/about', (req, res) => {
    res.send("Hello from about page hey there " + req.query.name);
});


//it is a handler function that will be called when the server receives a request. It takes two arguments: req (the request object) and res (the response object). 
//The req object contains information about the incoming request, such as the URL, headers, and query parameters. The res object is used to send a response back to the client.
// const myServer = http.createServer(app);

// myServer.listen(8000, () => {
//   console.log('Server is running on port 8000');
// });

// use listen method of express app to start the server and listen for incoming requests on port 8000 instead of using http.createServer. This is a more concise way to start the server and is the recommended way to do it in Express.
app.listen(8000, () => console.log('Server is running on port 8000'));
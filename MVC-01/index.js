const express = require("express");

const {connectMongoDb} = require('./connection')
require("dotenv").config();

const {logReqRes} = require("./middleware/midlog");

const UserRoutes = require("./routes/user");

const app = express();
const PORT = 8000;

// MongoDB Connection
connectMongoDb()
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("MongoDB Connection Error:", err));

//middleware - plugin
app.use(express.urlencoded({extended : false}));
app.use(logReqRes("log.txt"));

// API Routes
//user route ko call karta hai 
//route controller ko call karta hai or 
//controller model ko manipulate or change karta hai 
app.use("/users", UserRoutes);

// Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
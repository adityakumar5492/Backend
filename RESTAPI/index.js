const express = require('express');
const users = require('./MOCK_DATA.json');
const app = express();
const PORT = 8000;

//this is for mobile users client side rendring
// app.get('/users', (req, res) => { //give html data
//     const html = `
//     <ul>
//         ${users.map(user => `<li>${user.first_name} ${user.last_name} - ${user.email}</li>`).join('')}  
//     </ul>
//     `;
//     res.send(html);
// });

//Routes


//routes rest api
app.get("/api/users", (req, res) => { //give json data
    res.json(users);
});

//dynamic route
app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id); // string to number
    const user = users.find(user => user.id === id); 
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

app.post("/api/users", (req, res) => {
    //TODO: create new user
    return res.json({status:"pending"});
});

app.patch("/api/users/:id", (req, res) => {
    //TODO: update existing user
    return res.json({status:"pending"});
});

app.delete("/api/users/:id", (req, res) => {
    //TODO: delete existing user
    return res.json({status:"pending"});
});

//using route chaining if we want to handle multiple methods for the same route
/*app.route("/api/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find(user => user.id === id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    })
    .patch((req, res) => {
        //edit user with given id
        return res.json({ message: "PATCH request to update user" });
    })
    .delete((req, res) => {
        //delete user with given id
        return res.json({ message: "DELETE request to delete user" });
    });
*/

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
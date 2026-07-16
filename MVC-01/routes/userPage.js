const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.get("/", async (req, res) => {

    const allUsers = await User.find({});

    const html = `
    <html>
      <body>
        <h2>Users List</h2>

        <table border="1">
            <tr>
                <th>Name</th>
                <th>Email</th>
            </tr>

            ${allUsers.map(user => `
                <tr>
                    <td>${user.firstName}</td>
                    <td>${user.email}</td>
                </tr>
            `).join("")}

        </table>

      </body>
    </html>
    `;

    res.send(html);

});

module.exports = router;
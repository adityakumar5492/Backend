const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    jobTitle: {
      type: String,
    },

    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

// Model // one parameter is modelname and second one is schema
const User = mongoose.model("User", userSchema);


// ===================== CREATE =====================
app.post("/api/users", async (req, res) => {
  try {
    const body = req.body;

    if (
      !body.firstName ||
      !body.email ||
      !body.gender
    ) {
      return res.status(400).json({
        msg: "firstName, email and gender are required",
      });
    }

    const result = await User.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      gender: body.gender,
      jobTitle: body.jobTitle,
    });

    return res.status(201).json({
      msg: "User Created Successfully",
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
});

// to show all users in the browser as an html page (instead of json)
app.get("/users", async (req, res) => {
    const allUsers = await User.find({});

    const html = `
    <html>
        <head>
            <title>All Users</title>
        </head>
        <body>
            <h2>Users List</h2>
            <table border="1" cellpadding="10" cellspacing="0">
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Job Title</th>
                </tr>

                ${allUsers
                    .map(
                        (user) => `
                        <tr>
                            <td>${user.firstName}</td>
                            <td>${user.lastName}</td>
                            <td>${user.email}</td>
                            <td>${user.gender}</td>
                            <td>${user.jobTitle || "-"}</td>
                        </tr>
                    `
                    )
                    .join("")}
            </table>
        </body>
    </html>
    `;

    res.send(html);
});
// ===================== READ ALL =====================
app.get("/api/users", async (req, res) => {
  const users = await User.find({});

  return res.json(users);
});


// ===================== READ ONE =====================
app.get("/api/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  return res.json(user);
});


// ===================== UPDATE =====================
app.patch("/api/users/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);

  return res.json({
    status: "User Updated Successfully",
  });
});


// ===================== DELETE =====================
app.delete("/api/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  return res.json({
    status: "User Deleted Successfully",
  });
});


// Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
const express = require("express");
const bodyParser = require("body-parser");
const JWT = require("jsonwebtoken");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const salt = 11;
const secretekey = "SaniyaBagwan";

const cors = require("cors");
const { getStoredItems, storeItems } = require("./data/items");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/items", async (req, res) => {
  const storedItems = await getStoredItems();
  console.log("Fetched items:", storedItems);
  await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));
  res.json({ items: storedItems });
});

app.get("/items/:id", async (req, res) => {
  const storedItems = await getStoredItems();
  const item = storedItems.find((item) => item.id === req.params.id);
  res.json({ item });
});

app.post("/items", async (req, res) => {
  const existingItems = await getStoredItems();
  const itemData = req.body;
  const newItem = {
    ...itemData,
    id: Math.random().toString(),
  };
  const updatedItems = [newItem, ...existingItems];
  await storeItems(updatedItems);
  res.status(201).json({ message: "Stored new item.", item: newItem });
});

//authentication code

// Set up MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Replace with your MySQL username
  password: "MYSQLPASS123", // Replace with your MySQL password
  database: "auth_demo", // Your database name
});

// Connect to the database
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

// Register new user API
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  // Check if all fields are provided
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Check if the user already exists
  const checkUserQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkUserQuery, [email], (err, result) => {
    if (err) return res.status(500).json({ error: "Database query error" });
    if (result.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }
    const securepass = bcrypt.hashSync(password, salt);
    // Insert new user into the database
    const insertUserQuery =
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(insertUserQuery, [name, email, securepass], (err, result) => {
      if (err) return res.status(500).json({ error: "Database insert error" });

      res.status(201).json({ msg: "User registered successfully" });
    });
  });
});

// Login API
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  const getUserQuery = "SELECT * FROM users WHERE email = ? ";
  db.query(getUserQuery, [email], (err, result) => {
    if (err) return res.status(500).json({ error: "Database query error" });

    if (result.length === 0) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const user = result[0];
    const issecurepass = bcrypt.compareSync(user.password, password);
    if (!issecurepass) {
      res.json({
        err: "password is not valid..!",
      });
    }
    // Sign the JWT token with user data
    const token = JWT.sign({ id: user.id, email: user.email }, secretekey, {
      expiresIn: 300,
    });
    res.json({ token });
  });
});

// Profile route to verify token
app.post("/profile", verifybytoken, (req, res) => {
  JWT.verify(res.token, secretekey, (err, success) => {
    if (err) {
      return res.status(403).json({ error: "Token is not valid" });
    }
    res.json({ success, msg: "Token is valid" });
  });
});

// Middleware to verify token
function verifybytoken(req, res, next) {
  const header = req.headers["authorization"];
  if (typeof header !== "undefined") {
    res.token = header;

    next();
  } else {
    res.status(403).json({ error: "Token is required" });
  }
}

app.listen(8080);

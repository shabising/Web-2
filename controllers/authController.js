const db = require("../db");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const SECRET_KEY = "mySecretKey";

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql =
    "INSERT INTO users(username, email, password) VALUES (?, ?, ?)";

  db.query(
    sql,
    [username, email, hashedPassword],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Error registering user",
        });
      }

      res.json({
        message: "User registered successfully",
      });
    }
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email=?";

  db.query(sql, [email], async (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error logging in",
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      message: "Login successful",
      token,
    });
  });
};
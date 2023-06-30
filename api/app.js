require("dotenv").config();
const express = require("express");
const cors = require("cors");
const User = require("./model/User.js");
const bcrypt = require("bcryptjs");
const app = express();
const mongoose = require("mongoose");
const bcryptSalt = bcrypt.genSaltSync(12);
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const jwtSecret = process.env.JWT_SECRET;
mongoose.connect(process.env.MONGO_URL);
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));

app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password: bcrypt.hashSync(password, bcryptSalt),
  });
  res.json("OK");
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, name: userDoc.name, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res
            .status(200)
            .cookie("token", token)
            .json({ success: true, user: userDoc });
        }
      );
    } else {
      res.status(500).json({ error: "Incorrect Password" });
    }
  } else res.status(500).json({ error: "User Not Found" });
});

app.get("/api/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const userDoc = await User.findById(userData.id);

      res.status(200).json({ success: true, user: userDoc });
    });
  } else {
    res.json(null);
  }
});

app.post("/api/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.listen(PORT, () => {
  console.log(`server is listening at PORT ${PORT}`);
});

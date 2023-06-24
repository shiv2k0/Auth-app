require("dotenv").config();
const express = require("express");
const cors = require("cors");
const User = require("./model/User.js");
const bcrypt = require("bcryptjs");
const app = express();
const PORT = 8080;
const mongoose = require("mongoose");
const bcryptSalt = bcrypt.genSaltSync(12);

mongoose.connect(process.env.MONGO_URL);

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

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
  const userData = await User.findOne({ email });
  if (userData) {
    const passOk = bcrypt.compareSync(password, userData.password);
    if (passOk) {
      res.status(200).json({ success: true, msg: "Login Successful" });
    } else {
      res.status(500).json({ error: "Incorrect Password" });
    }
  } else res.status(500).json({ error: "User Not Found" });
});

app.listen(PORT, () => {
  console.log(`server is listening at PORT ${PORT}`);
});

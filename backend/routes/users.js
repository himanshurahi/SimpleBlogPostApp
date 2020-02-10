const express = require("express");

const router = express.Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')


router.get("/api/test", auth, (req, res) => {
    res.send('okk')
})


router.post("/api/users/signup", async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 8);

  const user = new User({
    email: req.body.email,
    password: hash
  });

  try {
    await user.save();
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/api/users/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const checkHash = await bcrypt.compare(req.body.password, user.password);
    if (checkHash) {  
      const token = await user.getAuthToken()
      res.status(200).send({user, token, expiresIn : 3600});
    } else {
      res.status(404).send({ message: "Wrong Email or Password" });
    }
  } else {
    res.status(404).send({ message: "No User Found" });
  }
});

module.exports = router;

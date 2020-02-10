const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decode = jwt.verify(token, "himanshurahi");
    console.log(decode)
    req.userData = {email : decode.email, userID : decode._id}
    next();
  } catch (error) {
      res.status(401).send('Please Auth')
  }
};

module.exports = auth;

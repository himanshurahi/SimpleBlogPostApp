var mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: [true, "Email Already Exist"]
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.methods.getAuthToken = async function() {
  const token = jwt.sign(
    { _id: this._id.toString(), email: this.email },
    "himanshurahi",
    { expiresIn: "1h" }
  );
  return token;
};

const Users = mongoose.model("Users", userSchema);

module.exports = Users;

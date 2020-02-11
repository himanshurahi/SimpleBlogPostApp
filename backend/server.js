const express = require("express");
require('dotenv').config()
const app = express();
const PORT = process.env.PORT
const mongoose = require("mongoose");
app.use(express.json());
var cors = require("cors");
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/users")
app.use(cors());

app.listen(PORT, () => {
    console.log(process.env.MONGODB_URL)
  console.log("Server Started On : " + PORT);
});

//connecting to DB
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("connected to DB");
  });

// app.use((req, res, next) => {
//     console.log('middle')
//     next()

// })

app.get("/", (req, res) => {
  res.send({ test: "Das" });
});

app.use(postRoutes);
app.use(userRoutes)



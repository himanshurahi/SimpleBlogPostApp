const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");
app.use(express.json());
var cors = require("cors");
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/users")
app.use(cors());

app.listen(PORT, () => {
  console.log("Server Started On : " + PORT);
});

//connecting to DB
mongoose
  .connect("mongodb://127.0.0.1:27017/mean-api", {
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



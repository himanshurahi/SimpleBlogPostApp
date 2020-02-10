const express = require("express");
const Post = require("../models/post.model");
const mongoose = require("mongoose");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/api/posts", async (req, res) => {
  const pagesize = parseInt(req.query.pagesize);
  const currentpage = parseInt(req.query.currentpage);
  let query = Post.find();
  let fetchedCount = await query
  if (pagesize && currentpage) {
    query.skip(pagesize * (currentpage - 1)).limit(pagesize);
  }

//   query.countDocuments().then(c => {
//     fetchedCount = c;
//   });
//    res.send({count : fetchedCount.length})

    query.then(doc => {
        res.send({posts : doc, count : fetchedCount.length})
       
    })

  //   const posts = [
  //     { id: 1, postTitle: "this is title", postBody: "this is body" }
  //   ];
});

router.get("/api/post/:id", (req, res) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValid) {
    return res.status(404).send({ message: "No Post Found..." });
  }
  const post = Post.findOne({ _id: req.params.id }).then(post => {
    res.status(200).send(post);
  });
});

router.post("/api/posts", auth, (req, res) => {
  console.log(req.userData);
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
    author: req.userData.userID
  });
  post.save();
  res.send(post);
  console.log(post);
});

router.delete("/api/posts/:id", auth, (req, res) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValid) {
    return res.send({ message: "No Post Found..." });
  }
  Post.findOne({ _id: req.params.id, author: req.userData.userID }).then(
    post => {
      if (post) {
        post.remove();
        res.status(200).send({ message: "Deleted", post });
      } else {
        res.status(404).send({ message: "No Post Found.." });
      }
    }
  );
});

router.patch("/api/post/:id", auth, (req, res) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValid) {
    return res.send({ message: "No Post Found..." });
  }
  Post.findOneAndUpdate(
    { _id: req.params.id, author: req.userData.userID },
    req.body,
    { new: true }
  ).then(data => {
    data
      ? res.status(200).send(data)
      : res.status(401).send("You Are Not Allowed To Do That");
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Post = require("../models/Posts");
const { check, validationResult } = require("express-validator");
// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find(this.all);
    res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/posts/:id
// @desc    Get single posts
// @access  Public

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api.posts
// @desc    add a post
// @access  Public
router.post("/", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, body, author, comment } = req.body;

  //   console.log(req);
  try {
    const newPost = new Post({
      title,
      body,
      author,
      comment,
    });
    const post = await newPost.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
});

// @route   PUT api.posts.id
// @desc    update a post
// @access  Public
router.put("/:id", async (req, res) => {
  const { title, body, author } = req.body;

  const postFields = {};
  if (title) postFields.title = title;
  if (body) postFields.body = body;
  if (author) postFields.author = author;

  try {
    let post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    post = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: postFields },
      { new: true }
    );

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

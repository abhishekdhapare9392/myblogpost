const express = require('express')
const router = express.Router()
const Post = require('../models/Posts')
const { check, validationResult } = require('express-validator')

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get('/', async (req, res) => {
    try {
        const posts  = await Post.find(this.all)
        res.json(posts)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})

// @route   POST api.posts
// @desc    add a post
// @access  Public
router.post('/', async (req, res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const {title, body, author} = req.body
    
    // console.log(req)
    try {
        const newPost = new Post({
            title, body, author
        })
        const post = await newPost.save()

        res.json(post)
    } catch (err) {
        console.error(err.message)
        res.status(500)
    }
})

module.exports = router
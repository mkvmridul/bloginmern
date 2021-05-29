const express = require('express');
const router = express.Router();
const User = require('../model/User');
const Comment = require('../model/Comment');
const Post = require('../model/Post');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator');

/**
 * @router GET api/posts
 * @description Get all posts
 * @access non-guest
 */
router.get('/', auth, async (req,res) => {
	try{
		// const posts = await Post.find({user: req.user.id}).sort({date: -1});
		const posts = await Post.find().sort({date: -1});
		res.json({posts});
	}catch(err){
		console.log(err);
		return res.status(500).json({msg: 'server error'});
	}
});


/**
 * @router GET api/posts/:id
 * @description Get a posts
 * @access non-guest
 */
router.get('/:id', auth ,async (req,res) => {
	try{
		const post = await Post.findById(req.params.id);
		const comment = await Comment.find({post: req.params.id}).sort({date: -1});
		res.json({post, comment});
	}catch(err){
		console.log(err);
		return res.status(500).json({msg: 'server error'});
	}
});

/**
 * @router POST api/post
 * @description store a post
 * @access non-guest
 */
router.post('/', [auth, [
	check('title', 'title is required').not().isEmpty(),
	check('body', 'body is required').not().isEmpty()
]] , async(req,res) => {
	const err = validationResult(req);
	if(!err.isEmpty()) return res.status(400).json({errors: err.array()});
	const {title,body} = req.body;
	try{
		const newPost = new Post({
			title,
			body,
			user: {
				id: req.user.id,
				name: req.user.name,
				email: req.user.email
			}
		});
		const post = await newPost.save();
		res.json(post);
	}catch(err){
		res.status(500).json({msg: 'server error'});
	}
});

module.exports = router;
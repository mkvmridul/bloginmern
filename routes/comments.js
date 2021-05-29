const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/User');
const Post = require('../model/Post');
const Comment = require('../model/Comment');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator');

/**
 * @router GET api/comments
 * @description Get all comments
 * @access non-guest
 */
router.get('/:id', (req,res) => {
	res.json({});
});


/**
 * @router GET api/comments/:id
 * @description Get a comments
 * @access non-guest
 */
router.get('/:post', auth ,async(req,res) => {

	try{
		const comments = await Comment.find({post:  req.params.post}).sort({date: -1});
		res,json({comments});
	}catch(err){
		res.status(500).json({msg: err.message});
	}
});


/**
 * @router POST api/post
 * @description store a post
 * @access non-guest
 */
router.post('/:id',  [auth, [
	check('body', 'body is required').not().isEmpty()
]] , async(req,res) => {
	const err = validationResult(req);
	if(!err.isEmpty()) return res.status(400).json({errors: err.array()});
	const {body} = req.body;
	try{
		const newComment = new Comment({
			body,
			user: req.user.id,
			post: req.params.id
		});
		const comment = await newComment.save();
		res.json(comment);
	}catch(err){
		res.status(500).json({msg: err.message});
	}
});

module.exports = router;
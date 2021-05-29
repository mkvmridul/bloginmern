const express = require('express');
const router = express.Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator');

/**
 * @router GET api/auth
 * @description Get Logged in user
 * @access non-guest
 */
router.get('/', auth ,async (req,res) => {
	try{
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	}catch(err){
		res.status(500).send('server error'	);
	}
});

/**
 * @router POST api/auth
 * @description authenticate user and send jwt token
 * @access non-guest
 */
router.post('/',[
	check('email', 'invalid email').isEmail(),
	check('password', 'password is required').exists()
] , async(req,res) => {
	const err = validationResult(req);
	if(!err.isEmpty()) return res.status(400).json({errors: err.array()});
	const {email, password} = req.body;
	try{
		let user = await User.findOne({email});
		if(!user) return res.status(400).send({msg: 'invalid credentials'});
		const isMatch = await bcrypt.compare(password, user.password);
		if(!isMatch) return res.status(400).json({msg: 'invalid credentials'});
		const payload = {
			user: {
				id: user.id,
				name: user.name,
				email: user.email
			}
		}
		jwt.sign(payload, config.get('jwtSecret'),{
			expiresIn: 100000
		}, (err, token) => {
			if(err) throw err;
			return res.json({token});
		})
	}catch(err){
		return res.status(500).send({msg: err.message});
	}
});

module.exports = router;
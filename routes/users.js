const express = require('express');
const router = express.Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
/**
 * @router POST api/users
 * @description User registration
 * @access guest
 */
router.post('/',[
	check('name','name is required').not().isEmpty(),
	check('email', 'email is required').isEmail(),
	check('password', 'Password length must be 1 chars').isLength({
		min: 1
	})
] , async (req,res) => {
	const err = validationResult(req);
	if(!err.isEmpty()) return res.status(400).json({errors: err.array()});
	const {name, email, password} = req.body;
	try{
		let user = await  User.findOne({email});
		if(user){
			return res.status(400).json({msg: "user with the given email already exists"})
		} 
		user =  new User({name,email,password});
		const salt = await bcrypt.genSalt(10); 
		user.password = await bcrypt.hash(password,salt);
		await user.save();
		const payload = {
			user: {
				id: user.id
			}
		}
		jwt.sign(payload, config.get('jwtSecret'),{
			expiresIn: 10000
		}, (err, token) => {
			if(err) throw err;
			res.json({token});
		})
	}catch(err){
		res.send(err.message);
	}
});

module.exports = router;
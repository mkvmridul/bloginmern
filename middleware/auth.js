const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req,res,next) => {

	const token = req.header('Authorization');
	if(!token) return res.status(401).json({msg: 'token missing'});

	try{
		const decoder = jwt.verify(token,config.get('jwtSecret'));
		 req.user = decoder.user;
	}
	catch(err) {
		res.status(401).json({msg: 'Invalid token'});
		return next(err);
	}

	next();
}
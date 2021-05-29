//connect to mongoose (odm)
	const mongoose = require('mongoose');
	const config = require('config');

	const mongoURL = config.get('mongoURL');

	const dbConnection = async () => {
		try{
				await mongoose.connect(mongoURL ,  {useNewUrlParser: true, useUnifiedTopology: true});
				console.log('db connected');
		}
		catch(err){
			console.error('unable to connect to db');
		}
		
	}

module.exports = dbConnection;
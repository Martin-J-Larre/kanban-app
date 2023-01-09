const jwt = require('jsonwebtoken');
const UserModel = require('../models/UnserModel');

const tokenDecode = (req) => { 
	const bearrerHeader = req.header['authorization'];
	if (bearrerHeader) {
		const bearer = bearrerHeader(' ')[1];
		try {
			const tokenDecoded = jwt.verify(
				bearer,
				process.env.TOKEN_SECRET_KEY
			)
			return tokenDecoded;
		} catch (err) {
			return false;
		}
	} else {
		return false;
	}
}

const verifyToken = async (req, res, next) => { 
	const tokenDecoded = tokenDecode(req);
	if (tokenDecoded) {
		const user = await UserModel.findById(tokenDecoded.id);
		if (!user) return res.status(401).json('Unathorized')
		req.user = user;
		next()
	} else {
		res.status(400).json('Unathorized')
	}
}

module.exports = {
	verifyToken
}
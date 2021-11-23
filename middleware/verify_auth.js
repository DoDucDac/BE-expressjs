const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
	const authHeader = req.header('Authorization');
	const token = authHeader && authHeader.split(' ')[1];
	if (!token)
		return res
			.status(401)
			.json({ success: false, message: 'Access token not found'});
	try {
		const decodedToken = jwt.verify(token, process.env.JWT_KEY);
		req.userRole = decodedToken;
		next();
	} catch (error) {
		console.log(error);
		return res.status(403).json({ success: false, message: 'Invalid token' });
	}
}

function checkAdmin(req,res,next){
    if(req.userRole.role === 1){
        next();
    }
    else{
        res.status(405).json("Not permission!!!")
    }
}
function checkUser(req,res,next){
    if(req.userRole.role === 0){
    	next();
    }
    else{
        res.status(405).json("Not permission!")
    }
}

//function checklogedin()

module.exports = {
    checkAuth: checkAuth,
    checkAdmin: checkAdmin,
	checkUser: checkUser,
}




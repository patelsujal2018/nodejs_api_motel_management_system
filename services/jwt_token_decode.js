var jwt = require('jsonwebtoken');
var jwtKey = process.env.JWT_SECRET;

module.exports = function(req){
    const authorizationHeader = req.headers.cookie;
    if(authorizationHeader){
        const token = req.headers.cookie.split('=')[1];

        return jwt.verify(token, jwtKey, function(err, decoded) {
            if (decoded) {
                return decoded;
            } else {
                return false;
            }
        });
    }
}
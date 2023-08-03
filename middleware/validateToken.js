const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
  
    // Check if the token is present in the request headers
    if(authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err) {
                res.status(401);
                throw new Error('Not authorized, token failed');
            } else {
                req.user = decoded.user;
                next();
            }
        } );
    
    }

    if (!token) {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  });
  

  module.exports = validateToken;
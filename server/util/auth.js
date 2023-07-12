const User = require('../models/User');

const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;
  
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
  
    if (!token) {
      console.log('No token found');
      return req;
    }
  
    try {
      const decodedToken = jwt.decode(token);
      console.log('Decoded token:', decodedToken);
  
      const user = jwt.verify(token, secret, { maxAge: expiration });
      req.user = user;
      console.log('Token data:', user);
    } catch (error) {
      console.log('Error verifying token:', error.message);
    }
  
    return req;
  },

  signToken: function ({ email, firstname, _id }) {
    const payload = { email, firstname, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },

  validateToken: function (token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
          return reject(err);
        }
        resolve(decodedToken);
      });
    });
  },
};
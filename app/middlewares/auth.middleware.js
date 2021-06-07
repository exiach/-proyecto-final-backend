'use strict'

const jwt = require('jsonwebtoken');
const config = require('../config');
const postgresSqlService = require('../Services').postgresSqlService;

const verifyToken = async (req, res, next) => {
  let token = req.headers['x-access-token'];

  if (!token) return res.status(403).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, config.SECRET);
    const user = await postgresSqlService.getUsebyUserName(decoded.id);
    
    if (user.length === 0 || user.error)
      return res.status(404).json({ message: 'Unauthorized' });

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized!' });
  }
};
module.exports = { verifyToken };

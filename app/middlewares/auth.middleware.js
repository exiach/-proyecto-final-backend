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
    const isExpired = new Date() > new Date(decoded.exp * 1000);
    if (isExpired || user.length === 0 || user.error)
      return res.status(401).json({ message: 'Token epxired'});

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError')
      return res.status(401).json({ message: 'Token epxired' });

    return res.status(401).json({ message: error });
  }
};
module.exports = { verifyToken };

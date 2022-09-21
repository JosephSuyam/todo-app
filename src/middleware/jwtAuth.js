import jwt from 'jsonwebtoken';
import Users from '../models/user.model.js';

export const jwtAuth = async (req, res, next) => {
  let token = req.headers['x-jwt-token'];

  if(!token)
    return res.status(403).send({ message: "No token provided." });

  verify(token, process.env.APP_SECRET, (err, decoded) => {
    if(err)
      return res.status(401).send({ message: "LMAO Unauthorized." });

    req.userId = decoded.id;
    req.permissions = decoded.permissions;

    next();
  });
}
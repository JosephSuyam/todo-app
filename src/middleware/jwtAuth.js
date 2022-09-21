import jwt from 'jsonwebtoken';
import Users from '../models/user.model.js';

export const jwtAuth = async (req, res, next) => {
  let token = req.headers['authorization'];

  if(!token)
    return res.status(403).json({ message: "No token provided." });

  token = token.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.APP_SECRET);

    const user = await Users.findByPk(decoded.id)
    if (!user) return res.status(404).json({ message: "User not found."});

    req.user_id = decoded.id;
    req.email = decoded.email;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized"});
  }
}
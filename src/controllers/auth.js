import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import Users from "../models/user.model.js";
import { UserStatus } from "../models/enums/users.enum.js"

export const login = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        email: req.body.email,
        status: UserStatus.ACTIVE
      }
    });

    if(!user) return res.status(404).json({ message: "Email not found."});
    if(!bcrypt.compareSync(req.body.password, user.password))
      return res.status(401).json({ message: "Invalid Password." });
  
    let token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.APP_SECRET,
      { expiresIn: process.env.JWT_LIFETIME }
    );
  
    return res.status(200).json({ message: "Login Successful.", data: { access_token: token } });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export const logout = (req, res) => {
  res.clearCookie('jwt');
  console.log('logged out');
  return res.status(200).json({ message: 'User is logged out.' });
}
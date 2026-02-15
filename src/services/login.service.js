import prisma from '../prisma/client.js';
import userService from './user.service.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default {
  login
};

export async function login(email, password) {
  try {
    const user = await userService.getUser('email', email);

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return { error: 'Invalid password' };
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return { token };
  } catch (error) {
    return { error: error.message };        
  }
};

import userService from './user.service.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default {
  login
};

export async function login(email, password) {
  try {
    const user = await userService.getUser('email', email);
    if (user.error) {
      return { error: 'Email ou senha inválidos' };
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return { error: 'Email ou senha inválidos' };
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

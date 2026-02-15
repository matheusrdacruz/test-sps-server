import loginService from '../services/login.service.js';

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export default {
  login
}

async function login(req, res) {

  const { email, password } = req.body;

  const user = await loginService.login(email, password);

  if (user.error) {
    return res.status(400).json({ error: user.error });
  }

  res.status(201).json(user);
};


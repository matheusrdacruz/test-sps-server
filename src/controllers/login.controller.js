import loginService from '../services/login.service.js';

export default {
  login
}

async function login(req, res) {

  const { email, password } = req.body;

  const token = await loginService.login(email, password);
  if (token.error) {
    return res.status(400).json({ error: token.error });
  }

  res.status(201).json(token);
};


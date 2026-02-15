import userService from '../services/user.service.js';


export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
}

async function createUser(req, res) {

  const { name, email, type, password } = req.body;

  const token = await userService.createUser({ name, email, type, password });

  if (token.error) {
    return res.status(400).json({ error: token.error });
  }

  res.status(201).json(token);
};

async function getUsers(req, res) {
  const users = await userService.getUsers();
  res.json(users);
};

async function getUser(req, res) {
  const { id } = req.params;

  const user = await userService.getUser('id', Number(id));

  if (user.error) {
    return res.status(404).json({ error: user.error });
  }

  res.json(user);
};

async function updateUser(req, res) {
  const { id } = req.params;
  const { name, email, type } = req.body;

  const user = await userService.updateUser(Number(id), { name, email, type });

  if (user.error) {
    return res.status(404).json({ error: user.error });
  }

  res.json(user);
};

async function deleteUser(req, res) {
  const { id } = req.params;

  const user = await userService.deleteUser(Number(id));

  if (user.error) {
    return res.status(404).json({ error: user.error });
  }

  res.json(user);
};

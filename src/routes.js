import { Router } from "express";
import userController from "./controllers/user.controller.js";
import loginController from "./controllers/login.controller.js";
import authMiddleware from "./middleware/middleware.js";

const routes = Router();

routes.get("/", authMiddleware, (req, res) => {
  res.send("Hello World!");
});

routes.post("/auth/login", (req, res) => loginController.login(req, res));

routes.post("/users", authMiddleware, (req, res) => userController.createUser(req, res));
routes.get("/users", authMiddleware, (req, res) => userController.getUsers(req, res));
routes.get("/users/:id", authMiddleware, (req, res) => userController.getUser(req, res));
routes.put("/users/:id", authMiddleware, (req, res) => userController.updateUser(req, res));
routes.delete("/users/:id", authMiddleware, (req, res) => userController.deleteUser(req, res));

export default routes;

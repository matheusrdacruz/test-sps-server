import { Router } from "express";
import loginController from "./controllers/login.controller.js";
import userController from "./controllers/user.controller.js";
import documentController from "./controllers/document.controller.js";
import authMiddleware from "./middleware/middleware.js";

import upload from "./config/multer.js";

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

routes.post("/users/:id/avatar", upload.single("avatar"), userController.uploadAvatar);
routes.post("/users/:id/documents", upload.single("document"), documentController.createDocument);


routes.get("/users/:id/documents", authMiddleware, (req, res) => documentController.getDocumentsByUser(req, res));
routes.delete("/users/:id/documents/:documentId", authMiddleware, (req, res) => documentController.deleteDocument(req, res));
  

export default routes;

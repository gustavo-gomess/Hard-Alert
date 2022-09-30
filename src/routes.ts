import { Router } from "express";
import { CreateUserController } from "./user/CreateuserController";

const routes = Router();

const createUserController = new CreateUserController();

routes.post("/user", createUserController.handle);

export { routes };

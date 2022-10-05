import { Router } from "express";
import { PermissionController } from "./Permissions/permisions/controller/PermissionController";
import { CreateUserController } from "./user/controller/CreateuserController";

const routes = Router();

const createUserController = new CreateUserController();
const permissionController = new PermissionController();

routes.post("/user", createUserController.handle);
routes.post("/permission", permissionController.handle);

export { routes };

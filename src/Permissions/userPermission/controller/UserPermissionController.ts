import { query, Request, Response } from "express";
import { UserPermissionUseCase } from "../service/UserPermissionUseCase";

export class UserPermissionController {
  async handle(request: Request, response: Response) {
    const { user_id };
    const { permissionId };

    const userPermissionUseCase = new UserPermissionUseCase();
    const userPermission = await userPermissionUseCase.execute(
      user_id,
      permissionId
    );

    return response.json(userPermission);
  }
}

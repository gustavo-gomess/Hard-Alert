import { Request, Response } from "express";
import { PermissionUseCase } from "../service/PermissionUseCase";

export class PermissionController {
  async handle(request: Request, response: Response) {
    const { name } = request.body;

    const permissionUseCase = new PermissionUseCase();

    const result = await permissionUseCase.execute({
      name,
    });

    return response.json(result);
  }
}

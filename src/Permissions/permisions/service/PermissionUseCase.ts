import { prisma } from "../../../database/prismaClient";
import { IPermission } from "../type";

export class PermissionUseCase {
  async execute({ name }: IPermission) {
    const namePermission = await prisma.permission.create({
      data: {
        name,
      },
    });
    return namePermission;
  }
}

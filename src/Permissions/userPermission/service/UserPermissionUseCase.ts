import { prisma } from "../../../database/prismaClient";
import { IUserPermission } from "../type";

export class UserPermissionUseCase {
  async execute({ userId, permissionId }: IUserPermission) {
    const userPermission = await prisma.userPermission.findMany({
      where: {
        userId: userId,
        permissionId: permissionId,
      },
    });
  }
}

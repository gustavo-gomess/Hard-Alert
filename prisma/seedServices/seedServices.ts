import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class SeedServices {
  async createPermission() {
    const permissions: { name: string }[] = [
      {
        name: "user",
      },
      {
        name: "admin",
      },
    ];

    for (const permission of permissions) {
      await prisma.permission.create({
        data: {
          name: permission.name,
        },
      });
      console.log(` Permição inserida ${permission.name}`);
    }
  }

  async createUser() {
    await prisma.user.upsert({
      where: { email: "gustavo@prisma.io" },
      update: {},
      create: {
        email: "gustavo@prisma.io",
        name: "gustavo",
        password: "maionese",
        isBlocked: true,
      },
    });
  }
}

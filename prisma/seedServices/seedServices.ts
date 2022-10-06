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
    const userAdmin = await prisma.user.upsert({
      where: { email: "gustavo@prisma.io" },
      update: {},
      create: {
        email: "gustavo@prisma.io",
        name: "gustavo",
        password: "maionese",
        isBlocked: false,
      },
    });
    console.log(`Usuario criado com sucessso`);

    const permissionAdmin = await prisma.permission.findFirst({
      where: {
        name: "admin",
      },
    });

    if (!permissionAdmin) {
      throw new Error("permissão não encontrada.");
    }

    await prisma.userPermission.create({
      data: {
        permissionId: permissionAdmin.id,
        userId: userAdmin.id,
      },
    });
    console.log("permissão no admin criada com sucesso.");
  }

  async createCompanie() {
    const companies = await prisma.companies.create({
      data: {
        name: "rincão",
        cnpj: "3545641541",
        cpf: "44448888",
        contact_number: "999999999",
        isBlocked: false,
      },
    });
    console.log("Companhia criada com sucesso.");

    const userAdmin = await prisma.user.findFirst({
      where: {
        email: "gustavo@prisma.io",
      },
    });

    await prisma.userCompanies.create({
      data: {
        company_id: companies.id,
        userId: userAdmin?.id,
      },
    });

    console.log("usario de companhia criada com sucessso ");
  }
}

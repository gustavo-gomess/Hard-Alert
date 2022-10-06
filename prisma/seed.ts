import { PrismaClient } from "@prisma/client";
import { SeedServices } from "./seedServices/seedServices";

const prisma = new PrismaClient();

const seedServices = new SeedServices();

async function main() {
  await seedServices.createPermission();
  await seedServices.createUser();
  await seedServices.createCompanie();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

import { hash } from "bcrypt";
import { prisma } from "../database/prismaClient";
import { ICreateUser } from "./type";

export class CreateUserUseCase {
  async execute({ email, name, password }: ICreateUser) {
    const nameExist = await prisma.user.create({
      where: {
        username: {
          equals: name,
          mode: "insensitive",
        },
      },
    });

    if (nameExist) {
      throw new Error("Usuario já existe");
    }

    const hashPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });

    return user;
  }
}

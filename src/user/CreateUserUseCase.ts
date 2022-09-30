import { hash } from "bcrypt";
import { prisma } from "../database/prismaClient";
import { ICreateUser } from "./type";

export class CreateUserUseCase {
  async execute({ email, name, password }: ICreateUser) {
    const emailExist = await prisma.email.create({
      where: {
        username: {
          equals: email,
          mode: "insensitive",
        },
      },
    });

    if (emailExist) {
      throw new Error("email já existe");
    }

    const hashPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashPassword,
      },
    });

    return user;
  }
}

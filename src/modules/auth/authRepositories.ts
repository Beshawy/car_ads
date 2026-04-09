import prisma from "../../shared/prisma";
import { Prisma } from "@prisma/client";

export class AuthRepository {
  static async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  static async findUserByResetCode(code: string) {
    return prisma.user.findFirst({
      where: {
        passwordResetCode: code,
        passwordResetExpires: {
          gt: new Date(), 
        },
      },
    });
  }

  static async createUser(data: Prisma.UserCreateInput) {
    return prisma.user.create({
      data,
    });
  }

  static async updateUser(id: number, data: Prisma.UserUpdateInput) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }
}

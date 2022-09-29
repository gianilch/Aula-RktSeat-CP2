import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../errors/AppError";
import { UsersRepository } from "../accounts/repositories/implementations/UsersRepository";

interface IPayLoad {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(
      token,
      "f6abd6d42c491a12d96e841a3517c5a5"
    ) as IPayLoad;
    console.log(sub);
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(sub);

    if (!user) {
      throw new AppError("User not found", 401);
    }
    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}

import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import { AppError } from "../../../../errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IReponse {
  user: {
    name: string,
    email: string
  };
  token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IReponse> {
    // Verifica se o usuário existe
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect!", 401);
    }

    // Verifica a senha do usuario
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!", 401);
    }

    const token = sign({}, "f6abd6d42c491a12d96e841a3517c5a5", {
      subject: user.user_id,
      expiresIn: "1d"
    });

    const tokenReturn: IReponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      }
    }

    return tokenReturn
  }
}

export { AuthenticateUserUseCase };

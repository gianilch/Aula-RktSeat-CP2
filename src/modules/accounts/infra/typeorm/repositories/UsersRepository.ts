import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { User } from "../entities/User";
import { IUsersRepository } from "../../../repositories/IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }
  async findById(user_id: string): Promise<User> {
    return await this.repository.findOne({ user_id });
  }
  async findByEmail(email: string): Promise<User> {
    return await this.repository.findOne({ email });
  }

  async create({
    name,
    email,
    driver_license,
    password,
    avatar,
    user_id,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      driver_license,
      password,
      avatar,
      user_id,
    });

    await this.repository.save(user);
  }
}

export { UsersRepository };

import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "@modules/cars/repositories/ISpecificationsRepository";
import { getRepository, Repository } from "typeorm";
import { Specification } from "../entities/Specification";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }
  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specifiation = this.repository.create({
      description,
      name,
    });

    await this.repository.save(specifiation);
  }

  async findByName(name: string): Promise<Specification> {
    const specifiation = this.repository.findOne({
      name,
    });
    return specifiation;
  }
}

export { SpecificationsRepository };

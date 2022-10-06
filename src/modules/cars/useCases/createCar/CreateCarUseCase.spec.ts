import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a car", async () => {
    await createCarUseCase.execute({
      name: "Test name car",
      description: "Teste description",
      daily_rate: 120,
      license_plate: "teste license_plate",
      fine_amount: 80,
      brand: "teste brand",
      category_id: "teste category_id",
    });
  });

  it("should be not able to create a car if already exists", async () => {
    expect( async () => {
      await createCarUseCase.execute({
        name: "Car1",
        description: "Description1",
        daily_rate: 120,
        license_plate: "license1",
        fine_amount: 80,
        brand: "brand1",
        category_id: "category1",
      });

      await createCarUseCase.execute({
        name: "Car2",
        description: "Description2",
        daily_rate: 120,
        license_plate: "license1",
        fine_amount: 80,
        brand: "brand2",
        category_id: "category2",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

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
    const car = await createCarUseCase.execute({
      name: "Test name car",
      description: "Teste description",
      daily_rate: 120,
      license_plate: "teste license_plate",
      fine_amount: 80,
      brand: "teste brand",
      category_id: "teste category_id",
    });

    expect(car).toHaveProperty("id")
  });

  it("should be not able to create a car if already exists", async () => {
    expect( async () => {
      await createCarUseCase.execute({
        name: "Car1",
        description: "Description1",
        daily_rate: 120,
        license_plate: "ABC-4513",
        fine_amount: 80,
        brand: "brand1",
        category_id: "category1",
      });

      await createCarUseCase.execute({
        name: "Car2",
        description: "Description2",
        daily_rate: 120,
        license_plate: "ABC-4513",
        fine_amount: 80,
        brand: "brand2",
        category_id: "category2",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("when registering a car it must be available by default", async () => {
      const car = await createCarUseCase.execute({
        name: "Car Avaible",
        description: "Description1",
        daily_rate: 120,
        license_plate: "ABCD-1234",
        fine_amount: 80,
        brand: "brand1",
        category_id: "category1",
      });

      expect(car.available).toBe(true);
  });
});

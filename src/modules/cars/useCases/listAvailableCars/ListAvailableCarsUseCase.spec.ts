import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all avaible cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "car_description",
      daily_rate: 110,
      license_plate: "DEF-1422",
      fine_amount: 50,
      brand: "car_brand",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "car_description",
      daily_rate: 110,
      license_plate: "DEF-1423",
      fine_amount: 50,
      brand: "car_brand_teste",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({
      brand: "car_brand_teste",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "car_description",
      daily_rate: 110,
      license_plate: "DEF-1424",
      fine_amount: 50,
      brand: "car_brand_teste",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({
      name: "Car3",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car4",
      description: "car_description",
      daily_rate: 110,
      license_plate: "DEF-1425",
      fine_amount: 50,
      brand: "car_brand_teste",
      category_id: "category_id2",
    });

    const cars = await listCarsUseCase.execute({
      category_id: "category_id2",
    });

    expect(cars).toEqual([car]);
  });
});

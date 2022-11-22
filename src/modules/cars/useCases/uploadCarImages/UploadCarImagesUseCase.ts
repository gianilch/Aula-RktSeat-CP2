import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { response, Response } from "express";
import { inject, injectable } from "tsyringe";

interface IRequest {
  car_id: string;
  images_name: string[];
}
@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.map(async (imagem) => {
      await this.carsImagesRepository.create(car_id, imagem);
      console.log(imagem);
    });
    return;
  }
}

export { UploadCarImagesUseCase };

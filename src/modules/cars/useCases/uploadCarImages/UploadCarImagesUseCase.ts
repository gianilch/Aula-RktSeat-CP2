import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { response, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IStorageProvider } from "../../../../shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
  car_id: string;
  images_name: string[];
}
@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.map(async (imagem) => {
      await this.carsImagesRepository.create(car_id, imagem);
      await this.storageProvider.save(imagem, "cars");
    });
    return;
  }
}

export { UploadCarImagesUseCase };

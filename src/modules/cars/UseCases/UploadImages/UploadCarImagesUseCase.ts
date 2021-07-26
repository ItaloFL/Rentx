import { ICarsImageRepository } from "@modules/cars/Repositories/ICarsImageRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { inject, injectable } from "tsyringe";


interface IRequest{
  car_id: string
  images_name: string[] 
}

@injectable()
class UploadCarImagesUseCase{

  constructor(
    @inject("CarsImageRepository")
    private carsImageRepository: ICarsImageRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ){}

  async execute({car_id, images_name}: IRequest){

    images_name.map(async (image) =>{
      await this.carsImageRepository.create(car_id, image)
      await this.storageProvider.save(image, "cars")
    })
  }

}

export { UploadCarImagesUseCase }
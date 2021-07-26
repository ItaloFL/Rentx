import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/Repositories/ICarsRepository";
import { ISpecificationRepository } from "@modules/cars/Repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest{
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase{

  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("SpecificationRepository")
    private specificationsRepository: ISpecificationRepository
  ){}

  async execute({ car_id, specifications_id }: IRequest): Promise<Car>{

    const carExist = await this.carsRepository.findById(car_id)

    if(!carExist){
      throw new AppError("Carro não existente")
    }

    const specifications = await this.specificationsRepository.findByIds(specifications_id)

    carExist.specifications = specifications

    await this.carsRepository.create(carExist)  

    return carExist
  }


}

export { CreateCarSpecificationUseCase }
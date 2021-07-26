import { ICarsRepository } from "@modules/cars/Repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental"
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository"
import { IDateProvider } from "@shared/container/providers/DayProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError"
import { inject, injectable } from "tsyringe";



interface IRequest{
  user_id: string;
  car_id: string
  expected_return_date: Date
}

@injectable()
class CreateRentalUseCase{

  constructor(
    @inject("RentalsRepository")
    private rentalRepository: IRentalsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ){}

  async execute({car_id, expected_return_date, user_id} : IRequest): Promise<Rental>{

    const Mininodetempo = 24;

    const carUnavailable = await this.rentalRepository.findOpenRentalByCar(car_id)

    if(carUnavailable){
      throw new AppError("Car is unavailable.")
    }

    const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUser(user_id)

    if(rentalOpenToUser){
      throw new AppError("There's a rental in progress for user!")
    }

    const Datenow = this.dateProvider.dateNow()

    const compare = this.dateProvider.compareInHours(Datenow, expected_return_date)


    if(compare < Mininodetempo){
      throw new AppError("Seu aluguel não tem tempo o sificiente para ser feito!")
    }

    const rental = await this.rentalRepository.create({
      car_id,
      user_id,
      expected_return_date,
    })

    await this.carsRepository.updateAvailable(car_id, false)

    return rental
  }

}

export { CreateRentalUseCase }
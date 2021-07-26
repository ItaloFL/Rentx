import { ICarsRepository } from "@modules/cars/Repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DayProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest{
  id: string
  user_id: string
}

@injectable()
class DevolutionRentalUseCase{

  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
  ){}

  async execute({ id, user_id }: IRequest): Promise<Rental>{
    const rental = await this.rentalsRepository.findById(id)
    const car = await this.carsRepository.findById(rental.car_id)
    const minimum_date = 1

    if(!rental){
      throw new AppError("Rental does not exist")
    }

    const dateNow = this.dateProvider.dateNow()

    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      this.dateProvider.dateNow()
    )

    if(daily <= 0){
      daily = minimum_date
    }

    const delay = this.dateProvider.compareInHours(dateNow, rental.expected_return_date)

    let total = 0

    if(delay > 0){
      const calculate_multa = delay * car.fine_amount
      total = calculate_multa
    }

    total += daily + car.daily_rate

    rental.end_date = this.dateProvider.dateNow()

    rental.total = total

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true)

    return rental

  }
}

export { DevolutionRentalUseCase }
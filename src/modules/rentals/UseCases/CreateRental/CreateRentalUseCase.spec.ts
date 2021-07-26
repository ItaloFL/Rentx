import { CarsRepositoryInMemory } from "@modules/cars/Repositories/in-memory/CarsRepositoryInMemory"
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory"
import { DayjsDateProvider } from "@shared/container/providers/DayProvider/implementations/DayjsDateProvider"
import { AppError } from "@shared/errors/AppError"
import dayjs from "dayjs"
import { CreateRentalUseCase } from "./CreateRentalUseCase"



let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let dayjsDateProvider: DayjsDateProvider
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("Create a Rental", () => {
  const dayAdd24hours = dayjs().add(1, "day").toDate()

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    dayjsDateProvider = new DayjsDateProvider()
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
      )
  })

  it("should be able to create a new rental", async () => {

    const car = await carsRepositoryInMemory.create({
      name: "test",
      description: "car test",
      daily_rate: 200,
      license_plate: "test-123",
      fine_amount: 50,
      category_id: "1223",
      brand: "brand"
    })

    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdd24hours
    })

    expect(rental).toHaveProperty("id")
    expect(rental).toHaveProperty("start_date")
  })

  it("should not be able to create a rental if there is another open to the same user", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "11112",
      expected_return_date: dayAdd24hours, 
      user_id: "12345"
    })

    await expect(createRentalUseCase.execute({
        user_id: "12345",
        car_id: "141314",
        expected_return_date: dayAdd24hours
      })
    ).rejects.toEqual(new AppError("There's a rental in progress for user!"))
  })


  it("should not be able to create a rental if there is another open to the same cars", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "141314",
      expected_return_date: dayAdd24hours, 
      user_id: "12345"
    })

    await expect(createRentalUseCase.execute({
        user_id: "654321",
        car_id: "141314",
        expected_return_date: dayAdd24hours
      })
    ).rejects.toEqual(new AppError("Car is unavailable."))
  })

  it("should not be able to create a rental if the time has insufficient", async () => {

    await expect(createRentalUseCase.execute({
        user_id: "xxx123",
        car_id: "123xxx",
        expected_return_date: dayjs().toDate()
      })
    ).rejects.toEqual(new AppError("Seu aluguel não tem tempo o sificiente para ser feito!"))
  })
})
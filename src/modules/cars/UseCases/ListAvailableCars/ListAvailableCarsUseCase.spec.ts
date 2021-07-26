import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository"
import { CarsRepositoryInMemory } from "@modules/cars/Repositories/in-memory/CarsRepositoryInMemory"
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase'


let listAvailableCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("List Cars", () =>{

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
  })

  it("should be able to list all cars", async () => {

    const car = await carsRepositoryInMemory.create({
      name: "car_name",
      brand: "car_brand",
      category_id: "category_id",
      daily_rate: 150.00,
      description: "car description",
      fine_amount: 600,
      license_plate: "APN-3452"
    })

    const cars = await listAvailableCarsUseCase.execute({
    
    })


    expect(cars).toEqual([car])
  })

  it("should be able to list all cars by brand", async () =>{
    const car = await carsRepositoryInMemory.create({
      name: "car_name2",
      brand: "car_brandtest",
      category_id: "category_id",
      daily_rate: 150.00,
      description: "car description",
      fine_amount: 600,
      license_plate: "APN-3452"
    })

    const cars = await listAvailableCarsUseCase.execute({
      brand: "car brand"
    })


    expect(cars).toEqual([car])
  })

  it("should be able to list all cars by name", async () =>{
    const car = await carsRepositoryInMemory.create({
      name: "car_name3",
      brand: "car_brandtest",
      category_id: "category_id",
      daily_rate: 150.00,
      description: "car description",
      fine_amount: 600,
      license_plate: "APN-3452"
    })

    const cars = await listAvailableCarsUseCase.execute({
      name: "car_name3"
    })


    expect(cars).toEqual([car])
  })

  it("should be able to list all cars by category", async () =>{
    const car = await carsRepositoryInMemory.create({
      name: "car_name3",
      brand: "car_brandtest",
      category_id: "12345",
      daily_rate: 150.00,
      description: "car description",
      fine_amount: 600,
      license_plate: "APN-3452"
    })

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "12345"
    })


    expect(cars).toEqual([car])
  })
})
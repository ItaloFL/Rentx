import { CarsRepositoryInMemory } from "@modules/cars/Repositories/in-memory/CarsRepositoryInMemory"
import { SpecificationRepositoryInMemory } from "@modules/cars/Repositories/in-memory/SpecificationRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory

describe("Create carSpecification", () => {

  beforeEach(() =>{
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    specificationsRepositoryInMemory = new SpecificationRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory)
  })

  it("should not be able to create a car specification when a non exitent car", async () => {
    const car_id = "1234"
    const specifications_id = ["54321"] 

    await expect(async () => {
  
      await createCarSpecificationUseCase.execute({car_id, specifications_id})
    }).rejects.toEqual(new AppError("Carro não existente"))
  }) 

  it("should be able to create a car specification", async () => {

    const car = await carsRepositoryInMemory.create({
      brand: "brand",
      category_id: "123",
      daily_rate: 110,
      description: "description",
      fine_amount: 1000,
      license_plate: "123455",
      name: "name"
    })

    const specifications = await specificationsRepositoryInMemory.create({
      name: "specificationTest",
      description: "descriptionTest"
    })
    
    const specifications_id = [specifications.id]

    const spec = await createCarSpecificationUseCase.execute({car_id: car.id, specifications_id})

    expect(spec).toHaveProperty("specifications")
    expect(spec.specifications.length).toBe(1)
  })
})
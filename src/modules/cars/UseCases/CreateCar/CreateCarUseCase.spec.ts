import { CarsRepositoryInMemory } from "@modules/cars/Repositories/in-memory/CarsRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateCarUseCase } from "./CreateCarUseCase"



let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("Create a new car", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
    })

    it("should be able to create new car", async () => {
        const car = await createCarUseCase.execute({
            brand: "brand",
            category_id: "123",
            daily_rate: 110,
            description: "description",
            fine_amount: 1000,
            license_plate: "123455",
            name: "name"
        })

        expect(car).toHaveProperty("id")
    })

    it("should not be able to create a car if he exists", async () => {
        
        await createCarUseCase.execute({
            brand: "brand1",
            category_id: "123",
            daily_rate: 110,
            description: "description",
            fine_amount: 1000,
            license_plate: "123455",
            name: "name"
        })

        await expect(createCarUseCase.execute({
            brand: "brand2",
            category_id: "123",
            daily_rate: 110,
            description: "description",
            fine_amount: 1000,
            license_plate: "123455",
            name: "name"
        })  
       ).rejects.toEqual(new AppError("Car already exist"))
    })

    it("should be able create a car with available true by defaulr", async () => {
        const car = await createCarUseCase.execute({
            brand: "brand3",
            category_id: "123",
            daily_rate: 110,
            description: "description",
            fine_amount: 1000,
            license_plate: "FDS-2233",
            name: "name"
        })

        expect(car.available).toBe(true)
    })
})
import { AppError } from '@shared/errors/AppError'
import { CategoryRepositoryInMemory } from '@modules/cars/Repositories/in-memory/CategoryRepositoryInMemory'

import CategoryServiceUseCase  from './CategoryServiceUseCase'

let createCategoryUseCase: CategoryServiceUseCase
let categoryRepositoryInMemory: CategoryRepositoryInMemory


describe("Criar Categoria", () => {

    beforeEach(() => {
        categoryRepositoryInMemory = new CategoryRepositoryInMemory()
        createCategoryUseCase = new CategoryServiceUseCase(categoryRepositoryInMemory)
    })


    it("should be able to create a new category", async () => {
        const category = {
            name: "Category Test",
            description: "Category Description test"
        }

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description
        })

        const categoryCreated =  await categoryRepositoryInMemory.findbyName(category.name)

        expect(categoryCreated).toHaveProperty("id");
        
    })

    it("should not be able to create a new category if she already exist", async () => {
        const category = {
            name: "Category Test",
            description: "Category Description test"
        }

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description
        })

        await expect(createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            })
        ).rejects.toEqual(new AppError("Categoria Ja existente!"))

        
        
    })
})
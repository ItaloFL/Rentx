import { inject, injectable } from 'tsyringe'


import "reflect-metadata";

import { ICategoryRepository } from "@modules/cars/Repositories/ICategoryRepository";
import { AppError } from '@shared/errors/AppError';

interface IRequest{
    name: string,
    description: string
}

@injectable()
class CategoryServiceUseCase {
    constructor(
    @inject("CategorieRepository")
    private categorieRepository: ICategoryRepository
    ) {}

    async execute({name, description} :IRequest): Promise<void> { 
        const categoryExists = await this.categorieRepository.findbyName(name);

        if(categoryExists){
            throw new AppError("Categoria Ja existente!");
        }

        await this.categorieRepository.create({name, description})

        
    }
}


export default CategoryServiceUseCase